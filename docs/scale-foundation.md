# Backend Scale Foundation
> Epic: `next-backend-scale-foundation` | Owner: Agent Atlas
> Author: Pi (AI agent) | Date: 2026-03-12

---

## 1. Current State

- **Stack:** Next.js 14 (App Router) + Supabase + NextAuth
- **Deployment target:** Single VPS container (Docker Compose) → k3s later
- **Expected scale:** hundreds → low thousands of business users

---

## 2. Stateless Contract (non-negotiable)

Every API route MUST be stateless. All state lives in:

| Concern | Storage |
|---------|---------|
| Session | NextAuth JWT (no DB session) |
| User data | Supabase (Postgres + RLS) |
| File uploads | Supabase Storage |
| Cache | Supabase Redis (future) or edge cache headers |
| Audit log | Supabase table `audit_events` |

**Anti-pattern to avoid:** in-memory state, module-level singletons, `global.*` abuse.

---

## 3. Async Boundaries

```
Client (browser / iOS app)
  │
  ▼
Next.js API Route (thin — validate, auth-check, delegate)
  │
  ├── Synchronous (< 2s): direct Supabase query → respond
  │
  └── Async (> 2s): return 202 Accepted + jobId
        │
        └── Background worker (n8n webhook or Supabase Edge Function)
              → update Supabase job_status table
              ← Client polls GET /api/jobs/:id or subscribes via Supabase Realtime
```

**Applies to:** resume parsing, email triggers, PDF generation, AI completions.

---

## 4. Rate Limiting

Implemented at the **API route level** using sliding window in Supabase:

```typescript
// lib/rateLimit.ts
export async function rateLimit(userId: string, key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now()
  const windowStart = now - windowMs
  const { count } = await supabase
    .from('rate_limit_events')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('key', key)
    .gte('created_at', new Date(windowStart).toISOString())
  if ((count ?? 0) >= limit) throw new RateLimitError()
  await supabase.from('rate_limit_events').insert({ user_id: userId, key })
}
```

Table: `rate_limit_events (id, user_id, key, created_at)` — auto-purge via pg_cron.

---

## 5. Observability

Every API route wraps with:

```typescript
// lib/observe.ts
export function withObservability(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    const start = Date.now()
    const route = req.nextUrl.pathname
    try {
      const res = await handler(req, ctx)
      await logEvent({ route, status: res.status, ms: Date.now() - start })
      return res
    } catch (err) {
      await logEvent({ route, status: 500, ms: Date.now() - start, error: String(err) })
      throw err
    }
  }
}
```

Logs to: Supabase `api_events` table → surfaced in portfolio Dashboard.

---

## 6. Horizontal Replica Assumptions

| Assumption | Justification |
|------------|---------------|
| No sticky sessions | JWT is stateless |
| No local file writes | Supabase Storage for all blobs |
| No in-memory queues | n8n or Supabase Edge Functions |
| DB connection pooling | Supabase PgBouncer handles this |
| Env vars only for config | No hardcoded endpoints |

At > 500 concurrent users: add Cloudflare Workers as edge cache layer in front of Next.js.

---

## 7. Java/WebFlux Replica — When & How

This is **not in scope** until:
1. Next.js BFF reaches 1000+ active users or specific latency SLA is missed
2. Supabase contracts are documented (epic `supabase-contract-and-quarkus-docs`)
3. VPS is stable and has sufficient headroom

When it is in scope:
- Same API contracts (OpenAPI spec as source of truth)
- Same Supabase schema (Java reads from same DB)
- Load balancer splits traffic: 50% Next.js / 50% WebFlux
- Contract parity tests run on both before any shift

---

## 8. Implementation Order

1. ✅ Repo split (done — `jpglabs-portfolio-backend`)
2. ⏳ Add `rate_limit_events` + `api_events` Supabase migrations
3. ⏳ Wrap all API routes with `withObservability`
4. ⏳ Move resume parse to async pattern (202 + jobId)
5. ⏳ Document OpenAPI spec for Java parity baseline
6. 🔒 Java/WebFlux replica — after VPS is stable

---

_Architecture document. Review with Jader before beginning migrations._
