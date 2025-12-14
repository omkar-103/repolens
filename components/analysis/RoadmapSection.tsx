"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { RoadmapItem } from "@/types";
import { getPriorityColor, cn } from "@/lib/utils";

interface RoadmapSectionProps {
  roadmap: RoadmapItem[];
}

export function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setCompletedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">
        Improvement Roadmap
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmap.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <GlassCard
              className={cn(
                "cursor-pointer transition-all duration-300",
                completedItems.has(item.id) && "opacity-60"
              )}
              onClick={() => toggleExpand(item.id)}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(item.id);
                  }}
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                    completedItems.has(item.id)
                      ? "bg-green-500 border-green-500"
                      : "border-white/30 hover:border-white/50"
                  )}
                >
                  <AnimatePresence>
                    {completedItems.has(item.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full border",
                        getPriorityColor(item.priority)
                      )}
                    >
                      {item.priority}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    </motion.div>
                  </div>

                  <h4
                    className={cn(
                      "font-medium text-white mb-2 transition-all duration-300",
                      completedItems.has(item.id) && "line-through"
                    )}
                  >
                    {item.title}
                  </h4>

                  <AnimatePresence>
                    {expandedItem === item.id && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-white/60 overflow-hidden"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}