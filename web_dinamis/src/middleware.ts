import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Middleware pakai authConfig yang edge-safe (tanpa mysql2/bcryptjs)
export const { auth: middleware } = NextAuth(authConfig);

export const config = { matcher: ["/admin", "/admin/:path*"] };
