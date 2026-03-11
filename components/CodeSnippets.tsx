"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Code2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const baseSnippets = [
  {
    id: 1,
    lang: "pattern",
    file: "patterns/privacy/session-audit-deduplication.txt",
    code: `Pattern goal
- avoid duplicate privacy/audit events during stateless API access

Operational approach
- derive a stable access key from the authenticated request context
- keep a short-lived in-memory registry per active access window
- record the subject only on first observation inside that window
- refresh the last-seen timestamp on each new interaction
- evict stale windows on a scheduled cleanup cycle

Why it matters
- reduces noisy audit trails
- preserves compliance intent without relying on HttpSession
- fits horizontally scalable REST APIs when combined with externalized state later`,
  },
  {
    id: 2,
    lang: "mapping",
    file: "patterns/persistence/boolean-database-normalization.txt",
    code: `Pattern goal
- normalize legacy numeric persistence values into domain-safe booleans

Operational approach
- translate database 0/1 values into explicit true/false semantics
- centralize the conversion rule at the persistence boundary
- avoid leaking database quirks into service and controller layers
- keep reads and writes symmetric to prevent drift

Why it matters
- protects domain clarity
- simplifies Oracle / legacy schema integration
- keeps business rules independent from storage representation`,
  },
  {
    id: 3,
    lang: "service",
    file: "patterns/domain/transactional-booking-guard.txt",
    code: `Pattern goal
- prevent duplicate bookings in the same availability slot

Operational approach
- normalize the requested slot before validation
- query the scheduling boundary for an existing reservation
- fail fast when a conflicting reservation already exists
- persist only after domain rules pass

Why it matters
- keeps business rules explicit inside the service layer
- supports cleaner testability
- avoids accidental double-booking under normal traffic`,
  },
  {
    id: 4,
    lang: "repository",
    file: "patterns/data/repository-boundary.txt",
    code: `Pattern goal
- isolate persistence details behind a narrow repository contract

Operational approach
- expose intention-driven methods instead of leaking ORM usage
- keep entity creation and lookup logic inside the repository layer
- return domain-friendly results to the service layer
- preserve room for future database or ORM replacement

Why it matters
- reduces coupling to infrastructure choices
- improves maintainability
- supports clearer evolution of the scheduling module`,
  },
  {
    id: 5,
    lang: "state",
    file: "patterns/frontend/auth-session-lifecycle.txt",
    code: `Pattern goal
- keep frontend authentication state resilient across refreshes

Operational approach
- hydrate auth state lazily from browser storage on first load
- inject the access token into the HTTP client boundary only when present
- update local state and storage together after sign-in
- clear storage and client headers together during sign-out

Why it matters
- reduces repeated login friction
- keeps auth behavior predictable in SPA flows
- avoids partial logout states in the client`,
  },
] as const;

function CopyButton({ code, copyLabel, copiedLabel }: { code: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-mono text-gray-500 transition-all hover:bg-white/10 hover:text-white"
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}

export default function CodeSnippets() {
  const { dictionary } = useLanguage();
  const snippets = baseSnippets.map((snippet, index) => ({
    ...snippet,
    ...dictionary.codeSnippets.items[index],
  }));
  const [active, setActive] = useState(0);
  const snippet = snippets[active];

  return (
    <section className="mx-auto max-w-7xl px-8 py-32 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
          {dictionary.codeSnippets.eyebrow}
        </span>
        <h2 className="mt-3 text-5xl font-black tracking-tighter md:text-6xl">{dictionary.codeSnippets.title}</h2>
        <p className="mt-3 max-w-lg text-gray-500">{dictionary.codeSnippets.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {snippets.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                active === i
                  ? "border-blue-600/40 bg-blue-600/10 text-white"
                  : "border-white/5 bg-white/[0.02] text-gray-500 hover:border-white/10 hover:text-gray-300"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <Code2 size={12} className={active === i ? "text-blue-400" : "text-gray-600"} />
                <span className="text-[9px] font-black uppercase tracking-widest">{s.lang}</span>
              </div>
              <p className="text-xs font-bold">{s.title}</p>
              <p className="mt-0.5 text-[10px] font-light text-gray-600">{s.subtitle}</p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="overflow-hidden rounded-[28px] border border-white/5 bg-[#0a0a0a]"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div>
                <p className="text-xs font-mono text-gray-500">{snippet.file}</p>
                <p className="mt-0.5 text-[9px] font-black uppercase tracking-widest text-blue-500">{snippet.context}</p>
              </div>
              <CopyButton code={snippet.code} copyLabel={dictionary.codeSnippets.copy} copiedLabel={dictionary.codeSnippets.copied} />
            </div>

            <div className="max-h-[500px] overflow-auto p-6">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-300">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
