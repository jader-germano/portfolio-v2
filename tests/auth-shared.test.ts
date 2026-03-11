import test from "node:test";
import assert from "node:assert/strict";
import {
  LOGIN_ROUTE,
  SESSION_TIMEOUT_MS,
  SESSION_WARNING_MS,
  buildLoginRedirectUrl,
  getSessionTimeoutState,
  isProtectedRoute,
  normalizeAppRole,
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

test("normalizeAppRole migrates legacy master_admin to ADMIN_PRIME", () => {
  assert.equal(normalizeAppRole("master_admin"), "ADMIN_PRIME");
  assert.equal(normalizeAppRole("ADMIN_PRIME"), "ADMIN_PRIME");
  assert.equal(normalizeAppRole("admin"), "admin");
  assert.equal(normalizeAppRole("user"), "user");
  assert.equal(normalizeAppRole("unknown"), null);
});
