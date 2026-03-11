"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Check, AlertCircle, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Portfolio } from "@/lib/portfolio-schema";
import { useLanguage } from "@/components/LanguageProvider";

export default function ResumeUpload() {
  const { dictionary } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [result, setResult] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setStatus("idle");
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const handleParse = async () => {
    if (!file) return;

    setStatus("uploading");
    setError(null);

    try {
      // For now, we simulate text extraction if it's a file
      // In a real app, we'd use a PDF parser library or send the file to an API
      const text = file.type === "text/plain" ? await file.text() : "PDF Content Extraction Simulation...";
      
      const formData = new FormData();
      formData.append("text", text);

      const response = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(dictionary.resumeUpload.parseError);

      setResult(data.portfolio);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : dictionary.resumeUpload.genericError);
      setStatus("error");
    }
  };

  return (
    <section className="py-32 px-8 md:px-20 max-w-5xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
            {dictionary.resumeUpload.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-3 mb-6">
            {dictionary.resumeUpload.titleLineOne} <br />
            <span className="text-gray-700 italic">{dictionary.resumeUpload.titleLineTwo}</span>
          </h2>
          <p className="text-gray-500 font-light leading-relaxed mb-8">
            {dictionary.resumeUpload.description}
          </p>

          <AnimatePresence>
            {status === "success" && result && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 space-y-4"
              >
                <div className="flex items-center gap-3 text-green-400 font-bold">
                  <Check size={20} />
                  <span>{dictionary.resumeUpload.success}</span>
                </div>
                <div className="text-sm text-gray-400">
                  <p><strong>{dictionary.resumeUpload.labels.name}:</strong> {result.name}</p>
                  <p><strong>{dictionary.resumeUpload.labels.title}:</strong> {result.title}</p>
                  <p><strong>{dictionary.resumeUpload.labels.skills}:</strong> {result.skills.join(", ")}</p>
                </div>
                <button className="w-full py-3 rounded-xl bg-green-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-green-500 transition-all">
                  {dictionary.resumeUpload.generateLink}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`relative group cursor-pointer rounded-[32px] border-2 border-dashed transition-all p-12 text-center ${
              isDragActive
                ? "border-blue-500 bg-blue-500/5"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
            }`}
          >
            <input {...getInputProps()} />
            
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                {file ? (
                  <FileText className="text-blue-500" />
                ) : (
                  <Upload className="text-gray-600" />
                )}
              </div>
              
              <div>
                <p className="text-sm font-bold text-white">
                  {file ? file.name : dictionary.resumeUpload.dropzoneIdle}
                </p>
                <p className="text-xs text-gray-600 mt-1 font-mono uppercase tracking-widest">
                  {dictionary.resumeUpload.dropzoneFileTypes}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleParse}
            disabled={!file || status === "uploading"}
            className="w-full py-5 rounded-[24px] bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {status === "uploading" ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                {dictionary.resumeUpload.parsing}
              </>
            ) : (
              dictionary.resumeUpload.action
            )}
          </button>

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-500 text-xs mt-2 justify-center">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
