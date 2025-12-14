"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { Hero } from "@/components/landing/Hero";
import { UrlInput } from "@/components/landing/UrlInput";
import { LoadingOverlay } from "@/components/analysis/LoadingOverlay";
import { Dashboard } from "@/components/results/Dashboard";
import { AnalysisResult, AnalysisStatus } from "@/types";

export default function Home() {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<
    (AnalysisResult & { repoName: string; repoDescription: string }) | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setStatus("fetching");
    setError(null);

    try {
      // Small delay for UX
      await new Promise((r) => setTimeout(r, 300));
      setStatus("analyzing");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: url }),
      });

      setStatus("generating");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setStatus("complete");

      // Small delay before showing results
      await new Promise((r) => setTimeout(r, 600));
      setResult(data);
      setStatus("idle");
    } catch (err) {
      console.error("Analysis error:", err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard result={result} onBack={handleBack} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16"
          >
            <Hero />
            <UrlInput
              onAnalyze={handleAnalyze}
              loading={status !== "idle" && status !== "error"}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <LoadingOverlay
        isVisible={status !== "idle" && status !== "error" && !result}
        status={status}
      />
    </main>
  );
}