"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Globe } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function CTASection() {
  const { dictionary } = useLanguage();

  return (
    <section className="py-40 px-8 md:px-20 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-10"
      >
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">
          {dictionary.cta.titleLineOne}<br />
          <span className="text-gray-700">{dictionary.cta.titleLineTwo}</span>
        </h2>
        <p className="text-lg text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
          {dictionary.cta.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/jader-phelipe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 uppercase text-xs tracking-widest"
          >
            <Linkedin size={18} />
            {dictionary.cta.linkedin}
          </a>
          <a
            href="mailto:jader@jpglabs.com.br"
            className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
          >
            <Mail size={18} />
            jader@jpglabs.com.br
          </a>
          <a
            href="https://jpglabs.com.br"
            className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
          >
            <Globe size={18} />
            jpglabs.com.br
          </a>
        </div>
      </motion.div>
    </section>
  );
}
