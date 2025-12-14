"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowRight, AlertCircle } from "lucide-react";
import { AnimatedButton } from "../ui/AnimatedButton";
import { parseGitHubUrl } from "@/lib/utils";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export function UrlInput({ onAnalyze, loading }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("Please enter a GitHub URL");
      return;
    }

    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    setError("");
    onAnalyze(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className={`
          relative p-2 rounded-2xl transition-all duration-300
          ${isFocused ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20" : "bg-white/5"}
          ${isFocused ? "shadow-glow" : ""}
        `}
      >
        <div className="glass-strong p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
            </div>

            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="github.com/user/repository"
              className="flex-1 bg-transparent text-white text-lg placeholder-white/40 outline-none"
              disabled={loading}
            />

            <AnimatedButton
              onClick={handleSubmit}
              loading={loading}
              size="lg"
              className="flex items-center gap-2"
            >
              Analyze
              <ArrowRight className="w-5 h-5" />
            </AnimatedButton>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 mt-4 text-red-400 justify-center"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-white/40 text-sm mt-4 text-center">
        Try: github.com/facebook/react or github.com/vercel/next.js
      </p>
    </motion.div>
  );
}