export type AppRole = "ADMIN_PRIME" | "admin" | "user";

export const LOGIN_ROUTE = "/login";
export const TERMS_ROUTE = "/terms";
export const PRIVACY_ROUTE = "/privacy";
export const DEFAULT_AUTHENTICATED_ROUTE = "/dashboard/instances";
export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

export const SESSION_TIMEOUT_SECONDS = 5 * 60;
export const SESSION_WARNING_SECONDS = 10;
export const SESSION_TIMEOUT_MS = SESSION_TIMEOUT_SECONDS * 1000;
export const SESSION_WARNING_MS = SESSION_WARNING_SECONDS * 1000;

export const isProtectedRoute = (pathname: string): boolean =>
  PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

export const normalizeAppRole = (value: unknown): AppRole | null => {
  if (value === "ADMIN_PRIME" || value === "master_admin") {
    return "ADMIN_PRIME";
  }

  if (value === "admin" || value === "user") {
    return value;
  }

  return null;
};

export const isAppRole = (value: unknown): value is AppRole => normalizeAppRole(value) !== null;

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
