type RuntimeSource = "local" | "public";
type RuntimeStatus = "online" | "warning" | "offline" | "unknown";
type LaneStatus = RuntimeStatus | "declared";

export type PiHealthResponse = {
  status: string;
  env: string;
  bind: string;
  models: {
    default: string;
    fast: string;
    large: string;
  };
  ollama: {
    base: string;
    reachable: boolean;
  };
  profile: {
    id: string;
    displayName: string;
    description?: string;
  };
  context?: {
    documents: number;
    truncated: boolean;
  };
  index?: {
    documentCount: number;
  };
  service?: {
    name: string;
    assistantName: string;
    summary: string;
    environment: string;
  };
};

export type PiGuardianCheck = {
  id: string;
  name: string;
  status: RuntimeStatus;
  detail: string;
  source: string;
};

export type PiInstance = {
  id: string;
  name: string;
  category: string;
  visibility: string;
  summary: string;
  status: RuntimeStatus;
  detail: string;
  latencyMs: number;
  links?: Record<string, string>;
  metrics?: Record<string, string>;
};

export type PiArchitectureSection = {
  title: string;
  summary: string;
};

export type PiOverviewResponse = {
  profileId: string;
  profile: {
    id: string;
    displayName: string;
  };
  generatedAt: string;
  host: {
    platform: string;
    hostname: string;
    release: string;
    mode: string;
  };
  summary: {
    total: number;
    online: number;
    warning: number;
    offline: number;
    unknown: number;
    alerts: number;
  };
  architecture: {
    path?: string;
    available: boolean;
    title: string;
    summary: string;
    sections: PiArchitectureSection[];
    updatedAt?: string;
  };
  instances: PiInstance[];
  guardian: {
    alerts: Array<{ title?: string; detail?: string } | string>;
    checks: PiGuardianCheck[];
  };
};

export type PiGuardianResponse = {
  profileId: string;
  profile: {
    id: string;
    displayName: string;
  };
  generatedAt: string;
  host: {
    platform: string;
    hostname: string;
    release: string;
    mode: string;
  };
  guardian: {
    alerts: Array<{ title?: string; detail?: string } | string>;
    checks: PiGuardianCheck[];
  };
};

export type RuntimeLane = {
  id: string;
  name: string;
  status: LaneStatus;
  summary: string;
  detail: string;
  meta: Array<{ label: string; value: string }>;
};

export type PiDashboardSnapshot = {
  source: RuntimeSource;
  baseUrl: string;
  fetchedAt: string;
  health: PiHealthResponse;
  overview: PiOverviewResponse;
  guardian: PiGuardianResponse;
  runtimeLanes: RuntimeLane[];
};

const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, "");

const PI_LOCAL_BASE_URL = normalizeBaseUrl(process.env.PI_RUNTIME_LOCAL_URL || "http://127.0.0.1:3131");
const PI_PUBLIC_BASE_URL = normalizeBaseUrl(process.env.PI_RUNTIME_PUBLIC_URL || "https://jpglabs.com.br/pi");
const PI_PUBLIC_TOKEN =
  process.env.PI_API_KEY ||
  process.env.PI_SERVICE_BEARER_TOKEN ||
  process.env.PI_PUBLIC_BEARER_TOKEN ||
  "";

const isTruthyToken = (value?: string | null): value is string => Boolean(value && value.trim());

const getRuntimeFetchHeaders = (token?: string): HeadersInit =>
  isTruthyToken(token) ? { Authorization: `Bearer ${token}` } : {};

const fetchPiJson = async <T>(baseUrl: string, pathname: string, token?: string): Promise<T> => {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: getRuntimeFetchHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`${pathname} failed with ${response.status}`);
  }

  return (await response.json()) as T;
};

const guardianFromOverview = (overview: PiOverviewResponse): PiGuardianResponse => ({
  profileId: overview.profileId,
  profile: overview.profile,
  generatedAt: overview.generatedAt,
  host: overview.host,
  guardian: overview.guardian,
});

export const buildRuntimeLanes = (
  health: Pick<PiHealthResponse, "status" | "env" | "bind" | "models" | "ollama" | "profile">,
  overview: Pick<PiOverviewResponse, "host" | "summary">,
  source: RuntimeSource,
): RuntimeLane[] => {
  const backgroundStatus: LaneStatus = health.status === "ok" ? "online" : "warning";
  const runtimeEnvironment = health.env === "vps" ? "systemd-managed VPS runtime" : "LaunchAgent-backed local runtime";
  const backgroundDetail =
    source === "local"
      ? `Pi is currently loading from the local background runtime on ${health.bind}.`
      : `Pi is currently being proxied through the public runtime while preserving the same background-terminal contract.`;

  return [
    {
      id: "background-terminal",
      name: "Terminal Background Load",
      status: backgroundStatus,
      summary: "Pi stays alive as an operator runtime instead of a tab-bound UI session.",
      detail: `${runtimeEnvironment}; ${backgroundDetail}`,
      meta: [
        { label: "Source", value: source },
        { label: "Host mode", value: overview.host.mode },
        { label: "Profile", value: health.profile.displayName },
      ],
    },
    {
      id: "fallback-chain",
      name: "Fallback Architecture",
      status: "declared",
      summary: "Owner-requested orchestration chain for coding assistance and escalation paths.",
      detail:
        "This lane is modeled as Codex -> Claude -> Gemini for assisted coding and review workflows. It is a declared operator architecture, not a host-level health probe.",
      meta: [
        { label: "Primary", value: "Codex" },
        { label: "Fallback 1", value: "Claude" },
        { label: "Fallback 2", value: "Gemini" },
      ],
    },
    {
      id: "agentic-vps",
      name: "Agentic Code Lane",
      status: health.ollama.reachable ? "online" : "warning",
      summary: "Pi-backed autonomous execution lane using the VPS/local model runtime as the grounding engine.",
      detail:
        "The agentic lane runs through Pi plus Ollama-hosted models. It is the runtime that keeps coding, summaries and control-surface actions available when external providers are not the active lane.",
      meta: [
        { label: "Default", value: health.models.default },
        { label: "Fast", value: health.models.fast },
        { label: "Large", value: health.models.large },
      ],
    },
  ];
};

const loadSnapshotFromBase = async (baseUrl: string, source: RuntimeSource, token?: string): Promise<PiDashboardSnapshot> => {
  const health = await fetchPiJson<PiHealthResponse>(baseUrl, "/health", token);
  const overview = await fetchPiJson<PiOverviewResponse>(baseUrl, "/system/overview", token);

  let guardian: PiGuardianResponse;
  try {
    guardian = await fetchPiJson<PiGuardianResponse>(baseUrl, "/system/guardian", token);
  } catch {
    guardian = guardianFromOverview(overview);
  }

  return {
    source,
    baseUrl,
    fetchedAt: new Date().toISOString(),
    health,
    overview,
    guardian,
    runtimeLanes: buildRuntimeLanes(health, overview, source),
  };
};

export async function loadPiDashboardSnapshot(): Promise<PiDashboardSnapshot> {
  try {
    return await loadSnapshotFromBase(PI_LOCAL_BASE_URL, "local");
  } catch (localError) {
    try {
      return await loadSnapshotFromBase(PI_PUBLIC_BASE_URL, "public", PI_PUBLIC_TOKEN);
    } catch (publicError) {
      const detail =
        publicError instanceof Error
          ? publicError.message
          : localError instanceof Error
            ? localError.message
            : "unknown runtime error";
      throw new Error(`Unable to reach Pi runtime from both local and public lanes: ${detail}`);
    }
  }
}
