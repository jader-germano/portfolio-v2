"use client";

import { motion } from "framer-motion";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const categoryIcons = ["🌐", "🤖", "💻"] as const;

export default function KnowledgeVault() {
  const { dictionary } = useLanguage();
  const categories = dictionary.knowledgeVault.categories.map((category, index) => ({
    ...category,
    icon: categoryIcons[index],
  }));

  return (
    <section className="py-32 px-8 md:px-20 max-w-7xl mx-auto border-t border-white/5 bg-[#080808]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
            {dictionary.knowledgeVault.eyebrow}
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-3">
            {dictionary.knowledgeVault.title}
          </h2>
          <p className="text-gray-500 font-light max-w-xl mt-6 leading-relaxed">
            {dictionary.knowledgeVault.description}
          </p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            placeholder={dictionary.knowledgeVault.searchPlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-blue-500/50 outline-none transition-all font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-6">{cat.icon}</div>
            <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
            <p className="text-sm text-gray-600 font-mono">{cat.countLabel}</p>
            <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {dictionary.knowledgeVault.explore} <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 p-8 rounded-[32px] bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
            <BookOpen size={24} />
          </div>
          <div>
            <h4 className="font-bold">{dictionary.knowledgeVault.latestTitle}</h4>
            <p className="text-sm text-gray-500">{dictionary.knowledgeVault.latestDescription}</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all whitespace-nowrap">
          {dictionary.knowledgeVault.rawRepository}
        </button>
      </div>
    </section>
  );
}
