"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Activity,
  Box,
  ChevronDown,
  ExternalLink,
  Route,
  Server,
  ShieldAlert,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { DASHBOARD_ROUTE_INVENTORY } from "@/lib/dashboard-routes";
import type { PiDashboardSnapshot } from "@/lib/pi-runtime";

const STATUS_STYLES = {
  online: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  offline: "bg-red-500/10 text-red-300 border-red-500/20",
  unknown: "bg-white/5 text-gray-400 border-white/10",
  declared: "bg-blue-500/10 text-blue-300 border-blue-500/20",
} as const;

export default function InstancesDashboard() {
  const { dictionary, locale } = useLanguage();
  const { data: session } = useSession();
  const [snapshot, setSnapshot] = useState<PiDashboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canViewRouteDetails = session?.user?.role === "PRIME_OWNER";

  const copy =
    locale === "pt"
      ? {
          source: "Origem",
          hostMode: "Modo do host",
          liveServices: "Serviços online",
          warnings: "Alertas",
          runtimeTitle: "Topologia operacional do Pi",
          runtimeDescription:
            "Camada viva do runtime, com o carregamento em background, a cadeia Codex -> Claude -> Gemini e a lane agentic na VPS.",
          inventoryTitle: "Inventário de rotas",
          inventoryDescription:
            "Todos os nomes de rota ficam visíveis para navegação. O detalhamento técnico permanece restrito ao perfil PRIME_OWNER.",
          detailsLocked: "Detalhes restritos a PRIME_OWNER",
          detailsVisible: "Detalhes visíveis",
          routeDescription: "Descrição",
          routeFile: "Arquivo",
          routePath: "Caminho fonte",
          routeNote: "Observação",
          open: "Abrir",
          refreshedAt: "Atualizado em",
          runtimeUnavailable: "Não foi possível carregar o snapshot do Pi runtime.",
        }
      : {
          source: "Source",
          hostMode: "Host mode",
          liveServices: "Online services",
          warnings: "Alerts",
          runtimeTitle: "Pi operational topology",
          runtimeDescription:
            "Live runtime layer showing background terminal loading, the Codex -> Claude -> Gemini fallback chain, and the VPS agentic lane.",
          inventoryTitle: "Route inventory",
          inventoryDescription:
            "Every route name stays visible for navigation. Technical route detail is reserved for PRIME_OWNER.",
          detailsLocked: "Details restricted to PRIME_OWNER",
          detailsVisible: "Details visible",
          routeDescription: "Description",
          routeFile: "File",
          routePath: "Source path",
          routeNote: "Note",
          open: "Open",
          refreshedAt: "Refreshed at",
          runtimeUnavailable: "Unable to load the Pi runtime snapshot.",
        };

  useEffect(() => {
    let isDisposed = false;

    const loadSnapshot = async () => {
      try {
        const response = await fetch("/api/dashboard/runtime", { cache: "no-store" });
        const payload = (await response.json()) as PiDashboardSnapshot | { detail?: string };

        if (!response.ok) {
          throw new Error("detail" in payload && payload.detail ? payload.detail : "runtime request failed");
        }

        if (!isDisposed) {
          setSnapshot(payload as PiDashboardSnapshot);
          setError("");
        }
      } catch (runtimeError) {
        if (!isDisposed) {
          setError(runtimeError instanceof Error ? runtimeError.message : copy.runtimeUnavailable);
        }
      } finally {
        if (!isDisposed) {
          setLoading(false);
        }
      }
    };

    void loadSnapshot();
    const interval = window.setInterval(loadSnapshot, 15000);

    return () => {
      isDisposed = true;
      window.clearInterval(interval);
    };
  }, [copy.runtimeUnavailable]);

  const updatedAt = snapshot
    ? new Date(snapshot.fetchedAt).toLocaleString(locale === "pt" ? "pt-BR" : "en-US")
    : null;

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-white">
      <header className="mb-12 flex flex-col gap-6 border-b border-white/5 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tighter">
            <Box className="text-blue-500" />
            {dictionary.instances.title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">{dictionary.instances.subtitle}</p>
        </div>

        <Link
          href="/dashboard/guardian"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-blue-500"
        >
          <ShieldAlert size={16} />
          {dictionary.instances.guardianCta}
        </Link>
      </header>

      {error ? (
        <div className="mb-8 rounded-[28px] border border-red-500/20 bg-red-500/5 px-6 py-5 text-sm text-red-200">
          <p className="font-semibold">{copy.runtimeUnavailable}</p>
          <p className="mt-2 font-mono text-xs text-red-100/80">{error}</p>
        </div>
      ) : null}

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.liveServices}</p>
          <div className="mt-4 text-4xl font-black">{snapshot?.overview.summary.online ?? "—"}</div>
          <p className="mt-2 text-xs text-gray-500">{snapshot?.overview.summary.total ?? 0} mapped services</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.warnings}</p>
          <div className="mt-4 text-4xl font-black">{snapshot?.overview.summary.alerts ?? 0}</div>
          <p className="mt-2 text-xs text-gray-500">{snapshot?.overview.summary.warning ?? 0} warning states</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.source}</p>
          <div className="mt-4 text-2xl font-black uppercase">{snapshot?.source ?? "—"}</div>
          <p className="mt-2 text-xs text-gray-500 break-all">{snapshot?.baseUrl ?? "—"}</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.hostMode}</p>
          <div className="mt-4 text-2xl font-black">{snapshot?.overview.host.mode ?? "—"}</div>
          <p className="mt-2 text-xs text-gray-500">{snapshot?.overview.host.hostname ?? "—"}</p>
        </article>
      </section>

      <section className="mb-12 rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
              <TerminalSquare className="text-blue-500" size={18} />
              {copy.runtimeTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">{copy.runtimeDescription}</p>
          </div>
          {updatedAt ? (
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">
              {copy.refreshedAt}: {updatedAt}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {snapshot?.runtimeLanes.map((lane) => (
            <article key={lane.id} className="rounded-[28px] border border-white/5 bg-black/30 p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-black tracking-tight">{lane.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{lane.summary}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${STATUS_STYLES[lane.status]}`}>
                  {lane.status}
                </span>
              </div>

              <p className="text-sm leading-7 text-gray-300">{lane.detail}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {lane.meta.map((item) => (
                  <div key={`${lane.id}-${item.label}`} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{item.label}</p>
                    <p className="mt-2 text-sm font-mono text-gray-200">{item.value}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-8 flex items-center gap-3">
          <Server className="text-blue-500" size={18} />
          <h2 className="text-sm font-black uppercase tracking-[0.24em] text-white">{dictionary.instances.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {snapshot?.overview.instances.map((service) => (
            <article
              key={service.id}
              className="rounded-[32px] border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-blue-500/20"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Server size={20} />
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${STATUS_STYLES[service.status]}`}>
                  {service.status}
                </span>
              </div>

              <h3 className="truncate font-bold text-gray-100" title={service.name}>
                {service.name}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gray-600">{service.category}</p>
              <p className="mt-4 text-sm leading-7 text-gray-400">{service.summary}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-black/30 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">Latency</p>
                  <p className="mt-2 text-sm font-mono text-blue-300">{service.latencyMs}ms</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-black/30 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">Visibility</p>
                  <p className="mt-2 text-sm font-mono text-gray-200">{service.visibility}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {Object.entries(service.links ?? {}).map(([label, href]) => (
                  <a
                    key={`${service.id}-${label}`}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 transition-all hover:border-blue-500/40 hover:text-white"
                  >
                    {label}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </article>
          ))}

          {!loading && snapshot?.overview.instances.length === 0 ? (
            <div className="col-span-full rounded-[32px] border-2 border-dashed border-white/5 p-20 text-center">
              <p className="font-mono italic text-gray-600">{dictionary.instances.empty}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
              <Route className="text-blue-500" size={18} />
              {copy.inventoryTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">{copy.inventoryDescription}</p>
          </div>

          <span
            className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
              canViewRouteDetails ? "border-blue-500/30 bg-blue-500/10 text-blue-200" : "border-white/10 bg-white/[0.03] text-gray-500"
            }`}
          >
            {canViewRouteDetails ? copy.detailsVisible : copy.detailsLocked}
          </span>
        </div>

        <div className="space-y-4">
          {DASHBOARD_ROUTE_INVENTORY.map((route) => (
            <details key={`${route.label}-${route.path}`} className="group rounded-[28px] border border-white/5 bg-black/30 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-white">{route.label}</p>
                  <p className="mt-2 text-[11px] font-mono text-gray-400">{route.path}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{route.access}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={route.path}
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 transition-all hover:border-blue-500/40 hover:text-white"
                  >
                    {copy.open}
                    <ExternalLink size={12} />
                  </Link>
                  <ChevronDown className="text-gray-600 transition-transform group-open:rotate-180" size={16} />
                </div>
              </summary>

              <div className="mt-5 border-t border-white/5 pt-5">
                {canViewRouteDetails ? (
                  <div className="grid gap-4 text-sm text-gray-300 md:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routeDescription}</p>
                      <p className="mt-2 leading-7 text-gray-400">{route.description}</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routeFile}</p>
                        <p className="mt-2 font-mono text-sm text-gray-200">{route.sourceFile}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routePath}</p>
                        <p className="mt-2 break-all font-mono text-sm text-gray-400">{route.sourcePath}</p>
                      </div>
                      {route.note ? (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routeNote}</p>
                          <p className="mt-2 text-sm leading-7 text-gray-400">{route.note}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-gray-400">
                    {copy.detailsLocked}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-gray-500">
          <Activity size={12} className="animate-pulse text-green-500" />
          <Sparkles size={12} className="text-blue-400" />
          {dictionary.instances.live}
        </div>
      </div>
    </div>
  );
}
