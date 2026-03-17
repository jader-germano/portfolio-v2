"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function TermsPageClient() {
  const { dictionary, locale } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.08),transparent_45%)] pointer-events-none" />

      <main className="relative mx-auto max-w-4xl px-6 py-20">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-gray-400 transition-all hover:border-blue-500/30 hover:text-white"
        >
          <ChevronLeft size={14} />
          {dictionary.terms.back}
        </Link>

        <div className="mt-10 rounded-[36px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-12">
          <div className="mb-10 flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-blue-400">{dictionary.terms.eyebrow}</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">{dictionary.terms.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">{dictionary.terms.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            {dictionary.terms.sections.map((section) => (
              <section key={section.title} className="rounded-3xl border border-white/10 bg-[#0a0d13] p-6">
                <h2 className="text-lg font-black tracking-tight text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-400">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-6 text-sm leading-7 text-gray-300">
            <p className="font-black uppercase tracking-[0.24em] text-blue-300">
              {locale === "pt" ? "Vigência e titularidade" : "Effective date and ownership"}
            </p>
            <p className="mt-3">
              {locale === "pt"
                ? "Vigente em 15 de março de 2026. © 2026 JPG Labs / Jader Philipe Germano. Todos os direitos reservados."
                : "Effective March 15, 2026. © 2026 JPG Labs / Jader Philipe Germano. All rights reserved."}
            </p>
            <p className="mt-3">
              {locale === "pt"
                ? "Contato oficial: jader@jpglabs.com.br"
                : "Official contact: jader@jpglabs.com.br"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
