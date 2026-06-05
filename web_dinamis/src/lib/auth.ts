import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { query } from "./db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const rows = await query<any>(
            "SELECT id, username, password, role FROM users WHERE username = ?",
            [credentials.username as string]
          );

          const user = rows[0];

          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (isPasswordValid) {
              return {
                id: user.id.toString(),
                name: user.username,
                role: user.role,
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
