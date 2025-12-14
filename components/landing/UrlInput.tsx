//components/landing/UrlInput.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Github, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
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
  const [isValid, setIsValid] = useState(false);

  const glowOpacity = useMotionValue(0);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 30 });

  useEffect(() => {
    glowOpacity.set(isFocused ? 1 : 0);
  }, [isFocused, glowOpacity]);

  useEffect(() => {
    if (url.trim()) {
      const parsed = parseGitHubUrl(url);
      setIsValid(!!parsed);
    } else {
      setIsValid(false);
    }
  }, [url]);

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

  const suggestions = [
    "facebook/react",
    "vercel/next.js",
    "microsoft/vscode",
  ];

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      {/* THE MAIN INPUT - This is THE hero element */}
      <div className="relative">
        {/* Massive glow background when focused */}
        <motion.div
          className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-3xl"
          style={{ opacity: glowOpacitySpring }}
        />
        
        {/* Always visible subtle glow */}
        <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-2xl" />
        
        {/* Outer container with gradient border */}
        <motion.div
          className={`
            relative rounded-[2rem] p-[2px] transition-all duration-500
            ${isFocused 
              ? "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" 
              : "bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50"}
          `}
          animate={{
            boxShadow: isFocused 
              ? "0 0 100px rgba(168, 85, 247, 0.4), 0 0 150px rgba(59, 130, 246, 0.3)"
              : "0 0 40px rgba(168, 85, 247, 0.2), 0 0 60px rgba(59, 130, 246, 0.15)",
          }}
        >
          {/* Inner container */}
          <div className="relative rounded-[calc(2rem-2px)] bg-background/95 backdrop-blur-xl p-4">
            <div className="flex items-center gap-5 p-4 sm:p-5">
              {/* GitHub icon - Always prominent */}
              <motion.div
                className={`
                  flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center
                  transition-all duration-300
                  ${isFocused 
                    ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-glow" 
                    : "bg-gradient-to-br from-purple-500/80 to-blue-500/80"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-8 h-8 text-white" />
              </motion.div>

              {/* Input field */}
              <div className="flex-1 relative">
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
                  placeholder="github.com/owner/repository"
                  className="w-full bg-transparent text-white text-xl sm:text-2xl placeholder-white/30 outline-none font-medium"
                  disabled={loading}
                />
                
                {/* Valid indicator */}
                <AnimatePresence>
                  {isValid && url && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* THE ACTION BUTTON - BIG and PROMINENT */}
              <AnimatedButton
                onClick={handleSubmit}
                loading={loading}
                size="lg"
                className="flex-shrink-0 px-8 sm:px-12 py-4 sm:py-5 text-lg"
                icon={loading ? undefined : <ArrowRight className="w-5 h-5" />}
              >
                {loading ? "Analyzing" : "Analyze"}
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-center justify-center gap-2 mt-8 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 max-w-xl mx-auto"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions - Subtle, helpful */}
      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-white/30 text-sm">Try these:</span>
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            onClick={() => setUrl(`github.com/${suggestion}`)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm font-mono
                       hover:bg-white/10 hover:text-white/70 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}