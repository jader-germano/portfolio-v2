"use client";

import Hero from "@/components/Hero";
import WhatIBuild from "@/components/WhatIBuild";
import CodeSnippets from "@/components/CodeSnippets";
import ProjectsGrid from "@/components/ProjectsGrid";
import ExperienceFlow from "@/components/ExperienceFlow";
import SkillsCloud from "@/components/SkillsCloud";
import ResumeUpload from "@/components/ResumeUpload";
import KnowledgeVault from "@/components/KnowledgeVault";
import CTASection from "@/components/CTASection";
import Nav from "@/components/Nav";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { dictionary } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.06),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.06),transparent_50%)] pointer-events-none" />
      <Nav />
      <main>
        <Hero />
        <WhatIBuild />
        <CodeSnippets />
        <ProjectsGrid />
        <ExperienceFlow />
        <SkillsCloud />
        <ResumeUpload />
        <KnowledgeVault />
        <CTASection />
      </main>
      <footer className="py-16 text-center text-gray-800 font-mono text-[9px] uppercase tracking-[1em] border-t border-white/5">
        {dictionary.footer}
      </footer>
    </div>
  );
}
