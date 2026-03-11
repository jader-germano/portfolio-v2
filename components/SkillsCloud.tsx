"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const skillGroups = [
  {
    categoryKey: "backend",
    color: "border-blue-600/30 text-blue-400",
    skills: ["Java 21", "Spring Boot 3", "Spring Security", "MyBatis", "Hibernate/JPA", "Oracle", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    categoryKey: "frontend",
    color: "border-indigo-500/30 text-indigo-400",
    skills: ["Angular 20", "TypeScript", "React", "RxJS", "Next.js 14", "Tailwind CSS", "Framer Motion"],
  },
  {
    categoryKey: "devops",
    color: "border-emerald-500/30 text-emerald-400",
    skills: ["Docker", "k3s / Kubernetes", "Traefik", "GitHub Actions", "Cloudflare", "Let's Encrypt", "Linux (Ubuntu)"],
  },
  {
    categoryKey: "aiAutomation",
    color: "border-violet-500/30 text-violet-400",
    skills: ["n8n", "MCP Protocol", "Ollama", "LangChain", "Open-webui", "Deepseek", "Llama 3.2", "WhatsApp API"],
  },
] as const;

export default function SkillsCloud() {
  const { dictionary } = useLanguage();

  return (
    <section className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
          {dictionary.skills.eyebrow}
        </span>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-3">
          {dictionary.skills.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.categoryKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 mb-4">
              {dictionary.skills.categories[group.categoryKey]}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.05 + si * 0.03 }}
                  className={`px-3 py-1 rounded-full border text-xs font-medium ${group.color} bg-white/[0.02]`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
