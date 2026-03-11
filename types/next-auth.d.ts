import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN_PRIME" | "admin" | "user";
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "ADMIN_PRIME" | "admin" | "user";
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN_PRIME" | "admin" | "user";
    provider?: string;
  }
}
