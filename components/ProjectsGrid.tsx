"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const baseProjects = [
  {
    title: "GoBarber",
    tags: ["Node.js", "TypeScript", "TypeORM", "Express", "React", "React Native", "Expo", "PostgreSQL"],
    github: "https://github.com/jader-germano/backend-goBarber",
    color: "from-blue-600/10",
  },
  {
    title: "Docentes TSE",
    tags: ["Java 21", "Spring Boot 3", "MyBatis", "Oracle", "Keycloak", "Angular 20"],
    github: null,
    color: "from-indigo-600/10",
  },
  {
    title: "JPG Labs Platform",
    tags: ["n8n", "MCP", "Docker", "k3s", "Traefik", "Node.js", "WhatsApp API"],
    github: null,
    color: "from-emerald-600/10",
  },
] as const;

export default function ProjectsGrid() {
  const { dictionary } = useLanguage();
  const projects = baseProjects.map((project, index) => ({
    ...project,
    ...dictionary.projects.items[index],
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
          {dictionary.projects.eyebrow}
        </span>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-3">
          {dictionary.projects.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-[32px] border border-white/5 bg-white/[0.02] p-8 overflow-hidden hover:border-white/10 transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">
                {p.category}
              </span>
              <h3 className="text-2xl font-black tracking-tight mt-2 mb-4">{p.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">{p.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-black text-gray-600 uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  <Github size={14} />
                  {dictionary.projects.viewGithub}
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-700">
                  {dictionary.projects.confidential}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
