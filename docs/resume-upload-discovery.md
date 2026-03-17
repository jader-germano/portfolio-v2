# Resume Upload — Discovery Document
> Epic: `resume-upload-discovery` | Owner: Agent Intake | Status: IN PROGRESS
> Author: Pi (AI agent) | Date: 2026-03-12

---

## 1. Purpose

This document closes the requirements phase for the resume intake flow before
any parser implementation is finalised or persistence tables are created.
No schema migrations or storage tables should be committed until this document
is approved and the open decisions below are resolved.

---

## 2. Flow Map

```
User
 │
 ├── [A] Pastes raw text   ──► POST /api/resume/parse  (current)
 │         text: string
 │
 ├── [B] Uploads PDF/DOCX  ──► POST /api/resume/upload (NOT YET BUILT)
 │         file: multipart/form-data
 │         → extract text on server
 │         → forward to parse pipeline
 │
 └── [C] LinkedIn URL      ──► (future — requires OAuth or scrape)

Parse Pipeline (shared by A + B)
 │
 ├── Text normalisation (strip PDF artefacts, encoding fix)
 ├── Ollama LLM parse → raw JSON (parseResumeWithOllama)
 ├── Zod schema validation (PortfolioSchema)
 └── Response: { portfolio: PortfolioSchema }
```

---

## 3. Inputs & Outputs

### 3.1 Input Contract (text path — current)
| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| `text` | `string` | min 50 chars | Raw resume text |

### 3.2 Input Contract (file path — to be built)
| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| `file` | `File` | max 5MB, PDF/DOCX/TXT | Multipart upload |
| `consent` | `boolean` | must be `true` | Explicit LGPD consent |

### 3.3 Output Contract
| Field | Type | Notes |
|-------|------|-------|
| `portfolio` | `PortfolioSchema` | Validated by Zod |
| `meta.parsedAt` | `ISO8601` | Server timestamp |
| `meta.modelUsed` | `string` | Ollama model name |
| `meta.confidence` | `0-1` | Optional LLM confidence |

---

## 4. Failure States

| Scenario | HTTP | Response |
|----------|------|----------|
| Text too short | 400 | `{ error: "Resume text is required (min 50 chars)" }` |
| File too large | 413 | `{ error: "File exceeds 5MB limit" }` |
| Unsupported file type | 415 | `{ error: "Only PDF, DOCX and TXT are accepted" }` |
| Ollama offline | 503 | `{ error: "Parser unavailable — try again shortly" }` |
| Schema validation fail | 422 | `{ error: "...", fields: ZodError.flatten() }` |
| No consent provided | 400 | `{ error: "Consent is required under LGPD Art. 7" }` |

---

## 5. Privacy, Consent & Retention (LGPD)

| Rule | Decision |
|------|---------|
| Legal basis | Art. 7 I — explicit consent |
| Consent capture | Checkbox at upload UI: *"I consent to my resume being processed to generate a portfolio preview."* |
| Data minimisation | Only structured output stored — raw file/text discarded after parsing |
| Retention | Parsed result: until user deletes account. Raw file: never persisted. |
| Right to erasure | DELETE /api/resume → wipes parsed result from Supabase |
| Third-party sharing | None — Ollama runs locally/on VPS |
| Logging | Log parse events (timestamp, model, duration) but NOT the resume text |

---

## 6. Open Decisions (must close before implementation)

| # | Decision | Options | Recommendation |
|---|---------|---------|---------------|
| D1 | Store parsed result in Supabase? | Yes (user profile) / No (session only) | **Yes** — needed for portfolio pre-fill |
| D2 | Support file upload (PDF/DOCX) now or text-only first? | File now / Text first | **Text first** — reduces scope, validates LLM quality |
| D3 | Supabase table schema for parsed result | Flat JSON column / Normalised tables | **Flat JSONB column** — flexible during early iterations |
| D4 | Retry on Ollama failure? | Client retry / Server queue | **Client retry** — keep server stateless |
| D5 | Confidence score — expose to UI? | Yes / No | **Yes** — lets user see if parse needs manual correction |

---

## 7. Supabase Boundary

Table to create (after D1 is confirmed):

```sql
-- jpglabs_portfolio_backend
create table resume_parsed (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  portfolio   jsonb not null,
  model_used  text not null,
  parsed_at   timestamptz default now(),
  confidence  numeric(4,3)
);

-- RLS: user can only read/delete their own row
alter table resume_parsed enable row level security;
create policy "owner only" on resume_parsed
  using (auth.uid() = user_id);
```

> **Do not run this migration until D1 is confirmed.**

---

## 8. Implementation Sequence (after discovery closes)

1. Confirm D1–D5 above with Jader
2. Create Supabase migration (`resume_parsed` table + RLS)
3. Add `/api/resume/upload` route (text-only first per D2)
4. Add consent field to request contract
5. Wire parsed result to Supabase (insert on success)
6. Add DELETE `/api/resume` for erasure right
7. Build UI upload component with consent checkbox
8. Add confidence indicator to portfolio preview

---

## 9. What NOT to build yet

- PDF/DOCX extraction (wait for D2)
- LinkedIn scraping (separate epic, OAuth complexity)
- Background job queue (D4 resolved to client retry)
- Real-time parse progress (premature optimisation)

---

_Discovery document — not a spec. Implementation begins only after open decisions are closed._
