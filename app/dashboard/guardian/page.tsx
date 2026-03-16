"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Activity,
  Bot,
  Lock,
  Network,
  Shield,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { PiDashboardSnapshot } from "@/lib/pi-runtime";

const STATUS_STYLES = {
  online: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  offline: "bg-red-500/10 text-red-300 border-red-500/20",
  unknown: "bg-white/5 text-gray-400 border-white/10",
  declared: "bg-blue-500/10 text-blue-300 border-blue-500/20",
} as const;

export default function GuardianConsole() {
  const { dictionary, locale } = useLanguage();
  const { data: session } = useSession();
  const [snapshot, setSnapshot] = useState<PiDashboardSnapshot | null>(null);
  const [error, setError] = useState("");

  const copy =
    locale === "pt"
      ? {
          checksTitle: "Checks ativos",
          checksDescription: "Guardian agora lê o estado real do Pi e da VPS em vez de cards simulados.",
          architectureTitle: "Canon de arquitetura",
          architectureDescription: "Notas canônicas entregues pelo Pi service para manter o dashboard alinhado ao runtime atual.",
          modelsTitle: "Alias de modelos",
          modelsDescription: "Modelos locais disponíveis para a lane agentic do Pi.",
          unavailable: "Não foi possível carregar o snapshot do Guardian.",
          role: "Papel",
          updatedAt: "Atualizado em",
          source: "Origem",
        }
      : {
          checksTitle: "Active checks",
          checksDescription: "Guardian now reads the real Pi and VPS state instead of simulated replica cards.",
          architectureTitle: "Architecture canon",
          architectureDescription: "Canonical notes delivered by the Pi service so the dashboard stays aligned with the live runtime.",
          modelsTitle: "Model aliases",
          modelsDescription: "Local models currently available for Pi's agentic lane.",
          unavailable: "Unable to load the Guardian snapshot.",
          role: "Role",
          updatedAt: "Refreshed at",
          source: "Source",
        };

  useEffect(() => {
    let isDisposed = false;

    const loadSnapshot = async () => {
      try {
        const response = await fetch("/api/dashboard/runtime", { cache: "no-store" });
        const payload = (await response.json()) as PiDashboardSnapshot | { detail?: string };

        if (!response.ok) {
          throw new Error("detail" in payload && payload.detail ? payload.detail : "guardian request failed");
        }

        if (!isDisposed) {
          setSnapshot(payload as PiDashboardSnapshot);
          setError("");
        }
      } catch (runtimeError) {
        if (!isDisposed) {
          setError(runtimeError instanceof Error ? runtimeError.message : copy.unavailable);
        }
      }
    };

    void loadSnapshot();
    const interval = window.setInterval(loadSnapshot, 15000);

    return () => {
      isDisposed = true;
      window.clearInterval(interval);
    };
  }, [copy.unavailable]);

  const updatedAt = snapshot
    ? new Date(snapshot.fetchedAt).toLocaleString(locale === "pt" ? "pt-BR" : "en-US")
    : null;

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-white">
      <header className="mb-12 flex flex-col gap-6 border-b border-white/5 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tighter">
            <Shield className="text-blue-500" />
            {dictionary.guardian.title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">{dictionary.guardian.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-bold text-green-400">
            <Activity size={14} />
            {dictionary.guardian.healthy}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-300">
            <Lock size={14} />
            {copy.role}: {session?.user?.role ?? "user"}
          </div>
        </div>
      </header>

      {error ? (
        <div className="mb-8 rounded-[28px] border border-red-500/20 bg-red-500/5 px-6 py-5 text-sm text-red-200">
          <p className="font-semibold">{copy.unavailable}</p>
          <p className="mt-2 font-mono text-xs text-red-100/80">{error}</p>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
                <Shield className="text-blue-500" size={18} />
                {copy.checksTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{copy.checksDescription}</p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.source}</p>
              <p className="mt-2 text-sm font-mono text-gray-300">{snapshot?.source ?? "—"}</p>
              {updatedAt ? <p className="mt-2 text-[10px] text-gray-500">{copy.updatedAt}: {updatedAt}</p> : null}
            </div>
          </div>

          <div className="space-y-4">
            {snapshot?.guardian.guardian.checks.map((check) => (
              <article
                key={check.id}
                className="grid gap-4 rounded-[28px] border border-white/5 bg-black/30 p-5 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)_auto]"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-white">{check.name}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{check.id}</p>
                </div>

                <div>
                  <p className="text-sm leading-7 text-gray-400">{check.detail}</p>
                  <p className="mt-2 break-all font-mono text-[11px] text-gray-500">{check.source}</p>
                </div>

                <div className="flex items-start justify-end">
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${STATUS_STYLES[check.status]}`}>
                    {check.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/5 bg-white/[0.02] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-gray-300">
              <Bot size={16} />
              {copy.modelsTitle}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">{copy.modelsDescription}</p>

            <div className="space-y-3">
              {snapshot
                ? [
                    { label: "Default", value: snapshot.health.models.default },
                    { label: "Fast", value: snapshot.health.models.fast },
                    { label: "Large", value: snapshot.health.models.large },
                  ].map((model) => (
                    <div key={model.label} className="rounded-2xl border border-white/5 bg-black/30 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{model.label}</p>
                      <p className="mt-2 font-mono text-sm text-gray-200">{model.value}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/5 bg-gradient-to-br from-blue-900/20 to-slate-900/20 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-white">
              <Sparkles size={16} />
              {dictionary.guardian.neuralLoad}
            </h3>
            <p className="text-4xl font-black">{snapshot?.overview.summary.online ?? 0}</p>
            <p className="mt-2 text-sm text-blue-200/80">
              {snapshot?.health.ollama.reachable ? "Ollama reachable" : "Ollama requires attention"}
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-8 rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="mb-8">
          <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
            <Network className="text-blue-500" size={18} />
            {copy.architectureTitle}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">{copy.architectureDescription}</p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {snapshot?.overview.architecture.sections.map((section) => (
            <article key={section.title} className="rounded-[28px] border border-white/5 bg-black/30 p-6">
              <p className="text-lg font-black tracking-tight text-white">{section.title}</p>
              <p className="mt-4 text-sm leading-7 text-gray-400">{section.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="mb-8 flex items-center gap-3">
          <TriangleAlert className="text-blue-500" size={18} />
          <h2 className="text-sm font-black uppercase tracking-[0.24em] text-white">Runtime lanes</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {snapshot?.runtimeLanes.map((lane) => (
            <article key={lane.id} className="rounded-[28px] border border-white/5 bg-black/30 p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <p className="text-lg font-black tracking-tight text-white">{lane.name}</p>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${STATUS_STYLES[lane.status]}`}>
                  {lane.status}
                </span>
              </div>
              <p className="text-sm leading-7 text-gray-400">{lane.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
