"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { dictionary } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 pt-40 pb-16 md:px-20 md:pt-44 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-blue-500 font-mono tracking-[0.3em] text-xs uppercase font-black">
            {dictionary.hero.eyebrow}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[9px] font-black uppercase tracking-widest">
            {dictionary.hero.status}
          </span>
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
          JADER{" "}
          <span className="text-gray-700 italic">
            GERMANO
          </span>
        </h1>

        <div className="h-1 w-20 bg-blue-600" />

        <p className="text-lg text-gray-400 max-w-xl font-light leading-relaxed">
          {dictionary.hero.summary}{" "}
          <span className="text-white font-medium">{dictionary.hero.emphasis}</span>.
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          {["Java 21", "Spring Boot 3", "Angular 20", "TypeScript", "n8n · MCP"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-gray-500 uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-8 md:left-20 text-gray-700 text-[9px] font-mono uppercase tracking-[0.8em]"
      >
        {dictionary.hero.scroll}
      </motion.div>
    </section>
  );
}
