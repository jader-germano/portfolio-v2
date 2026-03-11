"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import SessionTimeoutManager from "@/components/SessionTimeoutManager";

type SessionProvidersProps = {
  children: ReactNode;
};

export default function SessionProviders({ children }: SessionProvidersProps) {
  return (
    <SessionProvider refetchOnWindowFocus>
      <SessionTimeoutManager />
      {children}
    </SessionProvider>
  );
}
