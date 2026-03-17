import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";
import type { AppRole } from "@/lib/auth-shared";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: AppRole;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: AppRole;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: AppRole;
    provider?: string;
  }
}
