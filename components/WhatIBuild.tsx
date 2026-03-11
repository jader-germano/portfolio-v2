"use client";

import { motion } from "framer-motion";
import { Cpu, Rocket, Layers } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function WhatIBuild() {
  const { dictionary } = useLanguage();
  const pillars = [
    { icon: Cpu, color: "text-blue-500", ...dictionary.whatIBuild.pillars[0] },
    { icon: Rocket, color: "text-indigo-400", ...dictionary.whatIBuild.pillars[1] },
    { icon: Layers, color: "text-emerald-400", ...dictionary.whatIBuild.pillars[2] },
  ];

  return (
    <section className="py-20 px-8 md:px-20 max-w-7xl mx-auto border-y border-white/5 bg-white/[0.01]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {pillars.map((p) => (
          <div key={p.title} className="space-y-4">
            <p.icon className={p.color} size={28} />
            <h4 className="text-sm font-black uppercase tracking-widest">{p.title}</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
