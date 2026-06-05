import type { NextAuthConfig } from "next-auth";

// Konfigurasi yang aman untuk Edge Runtime (tidak ada Node.js modules)
// Authorize TIDAK dilakukan di sini - hanya routing/pages config
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPath = nextUrl.pathname.startsWith("/admin");

      if (isAdminPath) {
        if (isLoggedIn) return true;
        return false; // redirect ke /login
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  providers: [], // provider diisi di auth.ts (Node.js runtime)
  session: { strategy: "jwt" },
};
