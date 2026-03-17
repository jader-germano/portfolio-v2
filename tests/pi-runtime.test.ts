import test from "node:test";
import assert from "node:assert/strict";
import { buildRuntimeLanes, type PiHealthResponse, type PiOverviewResponse } from "../lib/pi-runtime";

const HEALTH_FIXTURE: PiHealthResponse = {
  status: "ok",
  env: "vps",
  bind: "127.0.0.1:3131",
  models: {
    default: "qwen2.5-coder:7b",
    fast: "llama3.2:3b",
    large: "deepseek-r1:7b",
  },
  ollama: {
    base: "http://127.0.0.1:11434",
    reachable: true,
  },
  profile: {
    id: "jader",
    displayName: "Jader Philipe",
  },
};

const OVERVIEW_FIXTURE: PiOverviewResponse = {
  profileId: "jader",
  profile: {
    id: "jader",
    displayName: "Jader Philipe",
  },
  generatedAt: "2026-03-15T17:07:39.469Z",
  host: {
    platform: "linux",
    hostname: "srv1443703",
    release: "6.8.0-90-generic",
    mode: "systemd-capable",
  },
  summary: {
    total: 6,
    online: 6,
    warning: 0,
    offline: 0,
    unknown: 0,
    alerts: 0,
  },
  architecture: {
    available: true,
    title: "Pi Service Architecture",
    summary: "Canonical runtime map",
    sections: [],
  },
  instances: [],
  guardian: {
    alerts: [],
    checks: [],
  },
};

test("buildRuntimeLanes reflects the requested fallback architecture", () => {
  const lanes = buildRuntimeLanes(HEALTH_FIXTURE, OVERVIEW_FIXTURE, "public");

  assert.equal(lanes.length, 3);
  assert.equal(lanes[0].name, "Terminal Background Load");
  assert.equal(lanes[0].status, "online");
  assert.equal(lanes[1].name, "Fallback Architecture");
  assert.deepEqual(
    lanes[1].meta.map((item) => item.value),
    ["Codex", "Claude", "Gemini"],
  );
  assert.equal(lanes[2].name, "Agentic Code Lane");
  assert.equal(lanes[2].meta[0].value, "qwen2.5-coder:7b");
});
