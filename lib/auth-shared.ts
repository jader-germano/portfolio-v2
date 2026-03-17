export type AppRole = "PRIME_OWNER" | "PI_AGENT_OS" | "sub_owner" | "admin" | "user";

export const LOGIN_ROUTE = "/login";
export const TERMS_ROUTE = "/terms";
export const PRIVACY_ROUTE = "/privacy";
export const DEFAULT_AUTHENTICATED_ROUTE = "/dashboard/instances";
export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

export const SESSION_TIMEOUT_SECONDS = 5 * 60;
export const SESSION_WARNING_SECONDS = 10;
export const SESSION_TIMEOUT_MS = SESSION_TIMEOUT_SECONDS * 1000;
export const SESSION_WARNING_MS = SESSION_WARNING_SECONDS * 1000;

export const OWNER_EMAIL_ALIASES = ["jader@jpglabs.com.br", "jader@jpglabs"] as const;
export const PI_AGENT_EMAIL_ALIAS = "pi-service@jpglabs.com.br";

export const SUB_OWNER_EMAIL_ALIASES = [
  "alicenatsumitakagi@gmail.com",
  "yarayokoakagi@gmail.com",
  "rafaelaayumi1@gmail.com",
  "takagigermano@gmail.com",
  "yarayokotakagi@gmail.com",
] as const;

export const isProtectedRoute = (pathname: string): boolean =>
  PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

export const normalizeAppRole = (value: unknown): AppRole | null => {
  if (value === "PRIME_OWNER" || value === "master_admin") {
    return "PRIME_OWNER";
  }

  if (value === "PI_AGENT_OS" || value === "system_operator") {
    return "PI_AGENT_OS";
  }

  if (value === "sub_owner" || value === "subOwner") {
    return "sub_owner";
  }

  if (value === "admin" || value === "user") {
    return value;
  }

  return null;
};

export const isAppRole = (value: unknown): value is AppRole => normalizeAppRole(value) !== null;

export const normalizeEmail = (value?: string | null): string => value?.trim().toLowerCase() ?? "";

export const getOwnerRoleOverride = (email?: string | null): AppRole | null => {
  const normalized = normalizeEmail(email);
  if (OWNER_EMAIL_ALIASES.includes(normalized as (typeof OWNER_EMAIL_ALIASES)[number])) {
    return "PRIME_OWNER";
  }
  if (normalized === PI_AGENT_EMAIL_ALIAS) {
    return "PI_AGENT_OS";
  }
  if (SUB_OWNER_EMAIL_ALIASES.includes(normalized as (typeof SUB_OWNER_EMAIL_ALIASES)[number])) {
    return "sub_owner";
  }
  return null;
};

export const resolveAppRole = (value: unknown, email?: string | null): AppRole =>
  normalizeAppRole(value) ?? getOwnerRoleOverride(email) ?? "user";

export const buildLoginRedirectUrl = (pathname?: string | null, reason?: string): string => {
  const params = new URLSearchParams();

  if (reason) {
    params.set("reason", reason);
  }

  if (pathname && pathname !== LOGIN_ROUTE) {
    params.set("callbackUrl", pathname);
  }

  const query = params.toString();
  return query ? `${LOGIN_ROUTE}?${query}` : LOGIN_ROUTE;
};

export const getSessionTimeoutState = (lastActivityAt: number, now: number) => {
  const remainingMs = lastActivityAt + SESSION_TIMEOUT_MS - now;

  return {
    remainingMs,
    isExpired: remainingMs <= 0,
    shouldWarn: remainingMs > 0 && remainingMs <= SESSION_WARNING_MS,
    countdownSeconds: Math.max(0, Math.ceil(remainingMs / 1000)),
  };
};
