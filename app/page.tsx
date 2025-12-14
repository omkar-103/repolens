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
      await new Promise((r) => setTimeout(r, 500));
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

      await new Promise((r) => setTimeout(r, 800));
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Dashboard result={result} onBack={handleBack} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen"
          >
            {/* Full width container */}
            <div className="w-full">
              {/* Hero Section */}
              <section className="pt-8">
                <Hero />
              </section>

              {/* Input Section - Centered with breathing room */}
              <section className="py-16">
                <UrlInput
                  onAnalyze={handleAnalyze}
                  loading={status !== "idle" && status !== "error"}
                />
              </section>

              {/* Error display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="flex justify-center px-4"
                  >
                    <div className="px-8 py-5 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl max-w-lg">
                      <p className="text-red-400 text-center font-medium">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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