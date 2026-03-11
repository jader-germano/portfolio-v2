"use client";

import { useEffect, useState } from "react";
import { Server, Activity, Box, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

interface Instance {
  name: string;
  namespace: string;
  status: "Running" | "Pending" | "Error" | "Terminating";
  cpu: string;
  ram: string;
}

export default function InstancesDashboard() {
  const { dictionary } = useLanguage();
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulation of live metrics - In prod, this calls a K8s API proxy
  useEffect(() => {
    const fetchMetrics = () => {
      const mockData: Instance[] = [
        { name: "portfolio-replica-1", namespace: "jpglabs", status: "Running", cpu: "12m", ram: "156Mi" },
        { name: "portfolio-replica-2", namespace: "jpglabs", status: "Running", cpu: "8m", ram: "142Mi" },
        { name: "n8n-main-0", namespace: "jpglabs", status: "Running", cpu: "45m", ram: "512Mi" },
        { name: "ollama-core", namespace: "ai-services", status: "Running", cpu: "1200m", ram: "4.2Gi" },
        { name: "open-webui", namespace: "ai-services", status: "Running", cpu: "22m", ram: "256Mi" },
      ];
      setInstances(mockData);
      setLoading(false);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <header className="mb-12 flex justify-between items-center border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <Box className="text-blue-500" />
            {dictionary.instances.title}
          </h1>
          <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest">
            {dictionary.instances.subtitle}
          </p>
        </div>
        <Link 
          href="/dashboard/guardian"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
        >
          <ShieldAlert size={16} />
          {dictionary.instances.guardianCta}
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instances.length === 0 && !loading && (
          <div className="col-span-full p-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
            <p className="text-gray-600 font-mono italic">{dictionary.instances.empty}</p>
          </div>
        )}

        {instances.map((pod) => (
          <div 
            key={pod.name}
            className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Server size={20} />
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                pod.status === "Running" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              }`}>
                {dictionary.instances.statuses[pod.status]}
              </div>
            </div>

            <h3 className="font-bold text-gray-200 truncate" title={pod.name}>{pod.name}</h3>
            <p className="text-xs text-gray-600 font-mono mb-6">ns: {pod.namespace}</p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black mb-1">{dictionary.instances.cpu}</p>
                <p className="text-sm font-mono text-blue-400">{pod.cpu}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black mb-1">{dictionary.instances.memory}</p>
                <p className="text-sm font-mono text-purple-400">{pod.ram}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
          <Activity size={12} className="text-green-500 animate-pulse" />
          {dictionary.instances.live}
        </div>
      </div>
    </div>
  );
}
