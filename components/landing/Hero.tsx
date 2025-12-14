"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { 
  Sparkles, Zap, Target, ArrowDown, Github, Code2,
  AlertCircle, ArrowRight, Search, Heart, Linkedin
} from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { LoadingOverlay } from "@/components/analysis/LoadingOverlay";
import { Dashboard } from "@/components/results/Dashboard";
import { AnalysisResult, AnalysisStatus } from "@/types";
import { parseGitHubUrl } from "@/lib/utils";

// ==================== MAIN PAGE COMPONENT ====================
export default function Home() {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<
    (AnalysisResult & { repoName: string; repoDescription: string }) | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const glowOpacity = useMotionValue(0);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 30 });

  useEffect(() => {
    glowOpacity.set(isFocused ? 0.6 : 0);
  }, [isFocused, glowOpacity]);

  const handleAnalyze = async (repoUrl: string) => {
    setStatus("fetching");
    setError(null);

    try {
      await new Promise((r) => setTimeout(r, 500));
      setStatus("analyzing");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
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

  const handleSubmit = () => {
    if (!url.trim()) {
      setInputError("Please enter a GitHub URL");
      return;
    }

    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setInputError("Please enter a valid GitHub repository URL");
      return;
    }

    setInputError("");
    handleAnalyze(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && status === "idle") {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
  };

  const isLoading = status !== "idle" && status !== "error";

  const suggestions = ["facebook/react", "vercel/next.js", "microsoft/vscode"];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Comprehensive insights in under 30 seconds.",
      color: "#f59e0b"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Gemini AI analyzes your code intelligently.",
      color: "#a855f7"
    },
    {
      icon: Target,
      title: "Actionable Roadmap",
      description: "Clear steps to improve your repository.",
      color: "#06b6d4"
    },
  ];

  // Show dashboard if we have results
  if (result) {
    return (
      <main className="min-h-screen relative overflow-hidden bg-[#030014]">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Dashboard result={result} onBack={handleBack} />
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#030014]">
      <ParticleBackground />
      
      {/* Single centered column layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* ===== HERO SECTION ===== */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
          
          {/* Background glow - centered */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
          </div>

          {/* Content wrapper - strict max-width */}
          <div className="relative w-full max-w-2xl mx-auto text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-sm">AI-Powered Analysis</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Your GitHub,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Analyzed
              </span>
              {" "}in{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Seconds
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/40 text-lg mb-12 max-w-lg mx-auto"
            >
              Paste any public repository URL and get instant quality scores and improvement suggestions.
            </motion.p>

            {/* ===== INPUT SECTION ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 blur-xl opacity-0"
                style={{ opacity: glowOpacitySpring }}
              />

              {/* Input container */}
              <div className={`
                relative rounded-2xl p-1 transition-all duration-300
                ${isFocused 
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500" 
                  : "bg-white/10"
                }
              `}>
                <div className="flex items-center gap-3 bg-[#0a0a1a] rounded-xl p-3">
                  
                  {/* GitHub icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setInputError("");
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    placeholder="github.com/owner/repo"
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-white text-lg placeholder-white/30 outline-none min-w-0"
                  />

                  {/* Submit button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold disabled:opacity-50 transition-all"
                  >
                    {isLoading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="hidden sm:inline">Analyzing</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Analyze</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {(inputError || error) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 mt-4 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{inputError || error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-6"
            >
              <span className="text-white/30 text-sm">Try:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setUrl(`github.com/${s}`)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-sm font-mono hover:bg-white/10 hover:text-white/60 transition-all"
                >
                  {s}
                </button>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-white/20"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5 mx-auto" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="px-6 py-24">
          <div className="w-full max-w-4xl mx-auto">
            
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  RepoLens
                </span>
                ?
              </h2>
              <p className="text-white/40 max-w-md mx-auto">
                Get instant insights about your repository's health and quality.
              </p>
            </motion.div>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all"
                >
                  <div 
                    className="w-14 h-14 mx-auto mb-5 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="px-6 py-12 border-t border-white/5">
          <div className="w-full max-w-4xl mx-auto text-center">
            
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                RepoLens
              </span>
            </div>

            {/* Creator */}
            <p className="text-white/30 text-sm mb-2 flex items-center justify-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by
            </p>
            <p className="text-white font-medium text-lg mb-4">Omkar Parelkar</p>

            {/* Social links */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <a
                href="https://github.com/omkarparelkar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10 transition-all text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/omkar-parelkar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10 transition-all text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            {/* Copyright */}
            <p className="text-white/20 text-sm">
              © {new Date().getFullYear()} RepoLens
            </p>
          </div>
        </footer>
      </div>

      <LoadingOverlay
        isVisible={isLoading && !result}
        status={status}
      />
    </main>
  );
}