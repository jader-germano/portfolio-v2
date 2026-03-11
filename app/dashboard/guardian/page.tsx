"use client";

import { Shield, Activity, RefreshCw, Cpu, Server, Lock } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function GuardianConsole() {
  const { dictionary } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <header className="mb-12 flex justify-between items-center border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <Shield className="text-blue-500" />
            {dictionary.guardian.title}
          </h1>
          <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest">
            {dictionary.guardian.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-bold flex items-center gap-2">
            <Activity size={14} />
            {dictionary.guardian.healthy}
          </div>
          <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 text-xs font-bold flex items-center gap-2">
            <Lock size={14} />
            {dictionary.guardian.admin}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Status Panel */}
        <div className="lg:col-span-2 space-y-8">
          <section className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <RefreshCw size={120} />
            </div>
            
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Server size={20} className="text-gray-400" />
              {dictionary.guardian.replicaTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Replica A */}
              <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/30 relative">
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <h3 className="text-lg font-bold text-blue-400 mb-1">Guardian-A</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">{dictionary.guardian.replicaAStatus}</p>
                
                <div className="space-y-2 text-sm font-mono text-gray-300">
                  <div className="flex justify-between">
                    <span>{dictionary.guardian.uptime}:</span>
                    <span>14d 2h 12m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{dictionary.guardian.load}:</span>
                    <span>12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{dictionary.guardian.version}:</span>
                    <span>v2.4.1</span>
                  </div>
                </div>
              </div>

              {/* Replica B */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 opacity-60">
                <h3 className="text-lg font-bold text-gray-400 mb-1">Guardian-B</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">{dictionary.guardian.replicaBStatus}</p>
                
                <div className="space-y-2 text-sm font-mono text-gray-500">
                  <div className="flex justify-between">
                    <span>{dictionary.guardian.status}:</span>
                    <span>{dictionary.guardian.syncing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{dictionary.guardian.version}:</span>
                    <span>v2.4.2 (Pending)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Log */}
          <section className="p-8 rounded-[32px] bg-black border border-white/10 font-mono text-xs h-64 overflow-y-auto">
            <h3 className="text-gray-500 mb-4 uppercase tracking-widest sticky top-0 bg-black py-2 border-b border-white/10">
              {dictionary.guardian.logs}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex gap-4">
                <span className="text-blue-500">[14:02:11]</span>
                <span>{dictionary.guardian.logLines[0]}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-500">[14:00:00]</span>
                <span>{dictionary.guardian.logLines[1]}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-yellow-500">[13:45:22]</span>
                <span>{dictionary.guardian.logLines[2]}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-500">[13:45:25]</span>
                <span>{dictionary.guardian.logLines[3]}</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Neural Metrics */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
              <Cpu size={16} />
              {dictionary.guardian.neuralLoad}
            </h3>
            <div className="text-4xl font-black mb-2">24%</div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[24%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-bold text-gray-400 mb-4">{dictionary.guardian.contextWindow}</h3>
            <div className="text-4xl font-black mb-2">128k</div>
            <div className="text-xs text-gray-500">{dictionary.guardian.tokensActive}</div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5">
            <h3 className="text-sm font-bold text-white mb-4">{dictionary.guardian.nextUpdate}</h3>
            <div className="text-2xl font-black mb-1">{dictionary.guardian.sunday}</div>
            <div className="text-sm text-blue-400">03:00 AM UTC</div>
          </div>
        </div>
      </div>
    </div>
  );
}
