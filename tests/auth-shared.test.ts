import test from "node:test";
import assert from "node:assert/strict";
import {
  LOGIN_ROUTE,
  SESSION_TIMEOUT_MS,
  SESSION_WARNING_MS,
  buildLoginRedirectUrl,
  getOwnerRoleOverride,
  getSessionTimeoutState,
  isProtectedRoute,
  normalizeAppRole,
  resolveAppRole,
} from "../lib/auth-shared";

test("isProtectedRoute matches dashboard paths only", () => {
  assert.equal(isProtectedRoute("/dashboard"), true);
  assert.equal(isProtectedRoute("/dashboard/instances"), true);
  assert.equal(isProtectedRoute("/"), false);
  assert.equal(isProtectedRoute("/login"), false);
});

test("buildLoginRedirectUrl preserves callback path and reason", () => {
  assert.equal(
    buildLoginRedirectUrl("/dashboard/guardian", "expired"),
    `${LOGIN_ROUTE}?reason=expired&callbackUrl=%2Fdashboard%2Fguardian`,
  );
  assert.equal(buildLoginRedirectUrl("/login"), LOGIN_ROUTE);
});

test("getSessionTimeoutState warns during final ten seconds", () => {
  const now = 1_000_000;
  const lastActivityAt = now - (SESSION_TIMEOUT_MS - SESSION_WARNING_MS + 1_000);

  const state = getSessionTimeoutState(lastActivityAt, now);

  assert.equal(state.shouldWarn, true);
  assert.equal(state.isExpired, false);
  assert.equal(state.countdownSeconds, 9);
});

test("getSessionTimeoutState expires after inactivity limit", () => {
  const now = 1_000_000;
  const lastActivityAt = now - SESSION_TIMEOUT_MS - 5_000;

  const state = getSessionTimeoutState(lastActivityAt, now);

  assert.equal(state.shouldWarn, false);
  assert.equal(state.isExpired, true);
  assert.equal(state.countdownSeconds, 0);
});

test("normalizeAppRole migrates legacy master_admin to PRIME_OWNER", () => {
  assert.equal(normalizeAppRole("master_admin"), "PRIME_OWNER");
  assert.equal(normalizeAppRole("PRIME_OWNER"), "PRIME_OWNER");
  assert.equal(normalizeAppRole("PI_AGENT_OS"), "PI_AGENT_OS");
  assert.equal(normalizeAppRole("system_operator"), "PI_AGENT_OS");
  assert.equal(normalizeAppRole("sub_owner"), "sub_owner");
  assert.equal(normalizeAppRole("subOwner"), "sub_owner");
  assert.equal(normalizeAppRole("admin"), "admin");
  assert.equal(normalizeAppRole("user"), "user");
  assert.equal(normalizeAppRole("unknown"), null);
});

test("owner email aliases are upgraded to PRIME_OWNER", () => {
  assert.equal(getOwnerRoleOverride("jader@jpglabs.com.br"), "PRIME_OWNER");
  assert.equal(getOwnerRoleOverride("JADER@JPGLABS"), "PRIME_OWNER");
  assert.equal(getOwnerRoleOverride("pi-service@jpglabs.com.br"), "PI_AGENT_OS");
  assert.equal(getOwnerRoleOverride("yarayokoakagi@gmail.com"), "sub_owner");
  assert.equal(resolveAppRole(null, "jader@jpglabs.com.br"), "PRIME_OWNER");
  assert.equal(resolveAppRole("user", "jader@jpglabs.com.br"), "user");
});
