import { Suspense } from "react";
import LoginPageClient from "@/components/LoginPageClient";

function LoginPageFallback() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-8 relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)] pointer-events-none" />
      <div className="relative z-10 w-full max-w-md rounded-[40px] border border-white/10 bg-white/[0.02] p-12 backdrop-blur-xl">
        <div className="mx-auto mb-8 h-16 w-16 rounded-2xl bg-blue-500/10" />
        <div className="mx-auto h-10 w-48 rounded-xl bg-white/5" />
        <div className="mx-auto mt-3 h-3 w-40 rounded-full bg-white/5" />
        <div className="mt-12 space-y-4">
          <div className="h-14 rounded-2xl bg-white/10" />
          <div className="h-14 rounded-2xl bg-white/5" />
          <div className="h-14 rounded-2xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginPageClient />
    </Suspense>
  );
}
