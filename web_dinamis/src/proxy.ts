import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Next.js 16: middleware.ts diganti proxy.ts
export const { auth: proxy } = NextAuth(authConfig);

export const config = { matcher: ["/admin", "/admin/:path*"] };
