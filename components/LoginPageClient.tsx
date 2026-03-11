"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getProviders, signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Github, Globe, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  DEFAULT_AUTHENTICATED_ROUTE,
  PRIVACY_ROUTE,
  TERMS_ROUTE,
} from "@/lib/auth-shared";

type ProvidersMap = Awaited<ReturnType<typeof getProviders>>;

export default function LoginPageClient() {
  const { dictionary, locale } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [providers, setProviders] = useState<ProvidersMap>(null);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingProvider, setPendingProvider] = useState<string | null>(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_AUTHENTICATED_ROUTE;
  const isExpiredSession = searchParams.get("reason") === "expired";
  const authError = searchParams.get("error");

  useEffect(() => {
    const loadProviders = async () => {
      const nextAuthProviders = await getProviders();
      setProviders(nextAuthProviders);
    };

    void loadProviders();
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [callbackUrl, router, status]);

  const providerList = useMemo(() => Object.values(providers ?? {}), [providers]);
  const oauthProviders = providerList.filter((provider) => provider.id === "github" || provider.id === "google");
  const canUseEmailLogin = providerList.some((provider) => provider.id === "credentials");

  const handleOAuthSignIn = async (providerId: string) => {
    setError("");
    setPendingProvider(providerId);
    await signIn(providerId, { callbackUrl });
    setPendingProvider(null);
  };

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmittingEmail(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

      if (!response || response.error) {
      setError(dictionary.login.emailError);
      setIsSubmittingEmail(false);
      return;
    }

    router.replace(response.url ?? callbackUrl);
  };

  const statusMessage = (() => {
    if (isExpiredSession) {
      return dictionary.login.expired;
    }

    if (authError === "CredentialsSignin") {
      return dictionary.login.credentialsError;
    }

    if (authError === "AccessDenied") {
      return dictionary.login.accessDenied;
    }

    return "";
  })();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-8 relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-12 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-xl relative z-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-8">
          <ShieldCheck className="text-blue-500" size={32} />
        </div>

        <h1 className="text-3xl font-black tracking-tighter mb-2">{dictionary.login.title}</h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-12">
          {dictionary.login.subtitle}
        </p>

        {statusMessage ? (
          <div className="mb-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-left text-xs leading-relaxed text-blue-100">
            {statusMessage}
          </div>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-left text-xs leading-relaxed text-red-200">
            {error}
          </div>
        ) : null}

        <div className="space-y-4">
          {oauthProviders.map((provider) => {
            const isGithub = provider.id === "github";
            const isPending = pendingProvider === provider.id;
            const Icon = isGithub ? Github : Globe;

            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => void handleOAuthSignIn(provider.id)}
                disabled={isPending}
                className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all ${
                  isGithub
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {isPending ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
                {isGithub ? dictionary.login.github : dictionary.login.google}
              </button>
            );
          })}

          {canUseEmailLogin ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setIsEmailOpen((current) => !current);
              }}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              <Mail size={18} />
              {dictionary.login.emailToggle}
            </button>
          ) : null}
        </div>

        {isEmailOpen ? (
          <form onSubmit={handleEmailSignIn} className="mt-5 space-y-3 text-left">
            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{dictionary.login.emailLabel}</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-[#0a0d13] px-4 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{dictionary.login.passwordLabel}</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-[#0a0d13] px-4 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/40"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmittingEmail}
              className="w-full rounded-2xl bg-blue-600 px-4 py-4 text-xs font-black uppercase tracking-[0.28em] text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmittingEmail ? dictionary.login.emailSubmitting : dictionary.login.emailSubmit}
            </button>
          </form>
        ) : null}

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-blue-500/30 hover:bg-white/[0.05]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-base font-black italic text-white shadow-[0_0_20px_rgba(37,99,235,0.25)]">
            J
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-gray-500">{dictionary.login.brandTitle}</p>
            <p className="mt-1 text-xs text-gray-400">{dictionary.login.brandSubtitle}</p>
          </div>
        </Link>

        <p className="mt-8 text-[10px] text-gray-600 font-mono leading-relaxed">
          {dictionary.login.legalPrefix} <br />
          <Link href={TERMS_ROUTE} className="text-gray-400 underline underline-offset-4 transition-colors hover:text-white">
            {dictionary.login.terms}
          </Link>{" "}
          {locale === "pt" ? "e" : "and"}{" "}
          <Link href={PRIVACY_ROUTE} className="text-gray-400 underline underline-offset-4 transition-colors hover:text-white">
            {dictionary.login.privacy}
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
