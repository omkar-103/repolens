"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Sparkles, Brain, Lightbulb } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { useEffect, useState } from "react";

interface SummarySectionProps {
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export function SummarySection({
  summary,
  strengths,
  weaknesses,
}: SummarySectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < summary.length) {
        setDisplayedText(summary.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [summary]);

  return (
    <div className="space-y-12">
      {/* Section Header - PROMINENT with spacing */}
      <motion.div
        className="flex items-center gap-5 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">AI Analysis</h2>
          <p className="text-white/40 text-lg">Powered by Gemini AI</p>
        </div>
      </motion.div>

      {/* AI Summary Card - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="relative" padding="2xl" hover={false}>
          {/* Accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 rounded-l-3xl" />
          
          <div className="flex items-start gap-5 mb-8">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-7 h-7 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-2xl font-semibold text-white">Summary</h3>
                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Generated
                </span>
              </div>
            </div>
          </div>

          <p className="text-white/80 text-xl leading-relaxed pl-20">
            {displayedText}
            {isTyping && (
              <motion.span
                className="inline-block w-0.5 h-6 bg-purple-500 ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </p>
        </GlassCard>
      </motion.div>

      {/* Strengths & Weaknesses - Two Column Grid with SPACING */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="h-full relative" padding="2xl" hover={false}>
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-3xl" />
            
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">Strengths</h3>
                <p className="text-white/40">What you're doing well</p>
              </div>
            </div>

            <ul className="space-y-6">
              {strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.15 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mt-0.5 group-hover:bg-green-500/20 transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors">
                    {strength}
                  </span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="h-full relative" padding="2xl" hover={false}>
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-3xl" />
            
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">Areas to Improve</h3>
                <p className="text-white/40">Room for growth</p>
              </div>
            </div>

            <ul className="space-y-6">
              {weaknesses.map((weakness, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mt-0.5 group-hover:bg-amber-500/20 transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors">
                    {weakness}
                  </span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}