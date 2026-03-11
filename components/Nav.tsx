"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Linkedin, Github, LogOut } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { LOGIN_ROUTE } from "@/lib/auth-shared";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "login", href: LOGIN_ROUTE, guestOnly: true },
  { key: "instances", href: "/dashboard/instances" },
  { key: "guardian", href: "/dashboard/guardian" },
];

export default function Nav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { locale, setLocale, dictionary } = useLanguage();
  const isAuthenticated = status === "authenticated";
  const visibleItems = NAV_ITEMS.filter((item) => !item.guestOnly || !isAuthenticated);
  const accessName = session?.user?.name || session?.user?.email || dictionary.nav.authenticatedUser;

  return (
    <nav className="fixed top-0 w-full z-50 px-4 pt-4 md:px-6 md:pt-6 pointer-events-none">
      <div className="pointer-events-auto max-w-7xl mx-auto rounded-[28px] border border-white/10 bg-black/35 px-4 py-4 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all">
              <span className="font-black italic text-white text-lg">J</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-blue-500 transition-colors">
              JPG Labs
            </span>
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-2 flex-1 px-6">
            {visibleItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] transition-all ${
                    isActive
                      ? "border-blue-500/40 bg-blue-500/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-gray-500 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {dictionary.nav.items[item.key as keyof typeof dictionary.nav.items]}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            {isAuthenticated ? (
              <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 md:flex">
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-500">{accessName}</span>
                <button
                  type="button"
                  onClick={() => void signOut({ callbackUrl: LOGIN_ROUTE })}
                  className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 transition-all hover:border-red-500/40 hover:text-red-400"
                >
                  <LogOut size={12} />
                  {dictionary.nav.logout}
                </button>
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/jader-phelipe/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/jader-germano"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Github size={16} />
              </a>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[8px] font-black uppercase tracking-[0.28em] text-gray-600">
                {dictionary.nav.language}
              </span>

              <div className="flex items-center gap-2">
              {(["en", "pt"] as const).map((option) => {
                const isActive = locale === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLocale(option)}
                    aria-pressed={isActive}
                    aria-label={dictionary.nav.localeOptions[option]}
                    className={`rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                      isActive
                        ? "border-blue-500/40 bg-blue-500/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-500 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {dictionary.nav.localeOptions[option]}
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto lg:hidden">
          <div className="flex min-w-max gap-2 pr-1">
            {visibleItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={`${item.href}-mobile`}
                  href={item.href}
                  className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] transition-all whitespace-nowrap ${
                    isActive
                      ? "border-blue-500/40 bg-blue-500/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-gray-500 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {dictionary.nav.items[item.key as keyof typeof dictionary.nav.items]}
                </Link>
              );
            })}
          </div>
        </div>

        {isAuthenticated ? (
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 md:hidden">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-500">{accessName}</span>
            <button
              type="button"
              onClick={() => void signOut({ callbackUrl: LOGIN_ROUTE })}
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 transition-all hover:border-red-500/40 hover:text-red-400"
            >
              <LogOut size={12} />
              {dictionary.nav.logout}
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
