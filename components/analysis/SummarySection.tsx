"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
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
    }, 15);

    return () => clearInterval(interval);
  }, [summary]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <GlassCard
        className="relative overflow-hidden border-l-4 border-l-purple-500"
        hover={false}
      >
        <h3 className="text-xl font-semibold text-white mb-4">AI Summary</h3>

        <p className="text-white/80 text-lg leading-relaxed mb-6">
          {displayedText}
          {isTyping && (
            <motion.span
              className="inline-block w-2 h-5 bg-purple-500 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div>
            <h4 className="text-green-400 font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-start gap-2 text-white/70"
                >
                  <span className="text-green-400 mt-1">•</span>
                  {strength}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div>
            <h4 className="text-amber-400 font-medium mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-start gap-2 text-white/70"
                >
                  <span className="text-amber-400 mt-1">•</span>
                  {weakness}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}