"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const baseExperiences = [
  {
    tags: ["n8n", "MCP", "Ollama", "k3s", "TypeScript"],
    color: "bg-blue-600",
  },
  {
    tags: ["Java 21", "Spring Boot 3", "MyBatis", "Oracle", "Keycloak", "Angular 20"],
    color: "bg-indigo-500",
  },
  {
    tags: ["Node.js", "TypeScript", "TypeORM", "React", "React Native", "Expo"],
    color: "bg-violet-500",
  },
  {
    tags: ["Java", "Spring", "DDD", "Kafka", "PostgreSQL", "Docker"],
    color: "bg-gray-600",
  },
] as const;

export default function ExperienceFlow() {
  const { dictionary } = useLanguage();
  const experiences = baseExperiences.map((experience, index) => ({
    ...experience,
    ...dictionary.experience.items[index],
  }));

  return (
    <section className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
          {dictionary.experience.eyebrow}
        </span>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-3">
          {dictionary.experience.title}
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12"
            >
              {/* Dot */}
              <div className={`absolute left-0 top-1 w-8 h-8 rounded-full ${exp.color} flex items-center justify-center z-10`}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {exp.company}
                    </p>
                    <h3 className="text-xl font-black tracking-tight">{exp.role}</h3>
                  </div>
                  <span className="text-[9px] font-mono text-gray-600 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-gray-600 bg-white/5 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
