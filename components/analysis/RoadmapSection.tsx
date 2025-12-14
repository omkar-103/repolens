"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Check, Rocket, Target } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { RoadmapItem } from "@/types";
import { cn } from "@/lib/utils";

interface RoadmapSectionProps {
  roadmap: RoadmapItem[];
}

const priorityConfig = {
  High: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    icon: "🔥",
    label: "High Priority",
  },
  Medium: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    icon: "⚡",
    label: "Medium Priority",
  },
  Low: {
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
    icon: "🌱",
    label: "Low Priority",
  },
};

export function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const completedCount = completedItems.size;
  const totalCount = roadmap.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Group by priority
  const highPriority = roadmap.filter(item => item.priority === "High");
  const mediumPriority = roadmap.filter(item => item.priority === "Medium");
  const lowPriority = roadmap.filter(item => item.priority === "Low");

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-display">Improvement Roadmap</h2>
            <p className="text-white/40">Your path to a better repository</p>
          </div>
        </div>

        {/* Progress Card */}
        <GlassCard className="flex items-center gap-6" padding="md" hover={false}>
          <div className="text-center">
            <p className="text-3xl font-bold text-white font-mono">{completedCount}<span className="text-white/40">/{totalCount}</span></p>
            <p className="text-white/40 text-sm">Completed</p>
          </div>
          <div className="w-40">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">{Math.round(progressPercent)}% complete</p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Priority Sections */}
      <div className="space-y-10">
        {/* High Priority */}
        {highPriority.length > 0 && (
          <PriorityGroup
            title="High Priority"
            subtitle="Address these first"
            items={highPriority}
            priority="High"
            completedItems={completedItems}
            expandedItem={expandedItem}
            toggleComplete={toggleComplete}
            setExpandedItem={setExpandedItem}
            delay={0}
          />
        )}

        {/* Medium Priority */}
        {mediumPriority.length > 0 && (
          <PriorityGroup
            title="Medium Priority"
            subtitle="Important improvements"
            items={mediumPriority}
            priority="Medium"
            completedItems={completedItems}
            expandedItem={expandedItem}
            toggleComplete={toggleComplete}
            setExpandedItem={setExpandedItem}
            delay={0.2}
          />
        )}

        {/* Low Priority */}
        {lowPriority.length > 0 && (
          <PriorityGroup
            title="Low Priority"
            subtitle="Nice to have"
            items={lowPriority}
            priority="Low"
            completedItems={completedItems}
            expandedItem={expandedItem}
            toggleComplete={toggleComplete}
            setExpandedItem={setExpandedItem}
            delay={0.4}
          />
        )}
      </div>

      {/* Completion celebration */}
      <AnimatePresence>
        {completedCount === totalCount && totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <GlassCard className="text-center" padding="xl" hover={false}>
              <motion.div
                className="text-7xl mb-6"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                🎉
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-3">All Tasks Complete!</h3>
              <p className="text-white/50 text-lg">You've completed all improvement tasks. Great work!</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PriorityGroupProps {
  title: string;
  subtitle: string;
  items: RoadmapItem[];
  priority: "High" | "Medium" | "Low";
  completedItems: Set<string>;
  expandedItem: string | null;
  toggleComplete: (id: string, e: React.MouseEvent) => void;
  setExpandedItem: (id: string | null) => void;
  delay: number;
}

function PriorityGroup({
  title,
  subtitle,
  items,
  priority,
  completedItems,
  expandedItem,
  toggleComplete,
  setExpandedItem,
  delay,
}: PriorityGroupProps) {
  const config = priorityConfig[priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {/* Group Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{config.icon}</span>
        <div>
          <h3 className={`text-xl font-semibold ${config.color}`}>{title}</h3>
          <p className="text-white/40 text-sm">{subtitle}</p>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
      </div>

      {/* Items Grid */}
      <div className="grid lg:grid-cols-2 gap-5">
        {items.map((item, index) => {
          const isCompleted = completedItems.has(item.id);
          const isExpanded = expandedItem === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.1 + index * 0.1 }}
            >
              <GlassCard
                className={cn(
                  "cursor-pointer transition-all duration-300 h-full",
                  isCompleted && "opacity-60",
                  isExpanded && config.glow
                )}
                padding="lg"
                hover={true}
                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <motion.button
                    onClick={(e) => toggleComplete(item.id, e)}
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300",
                      isCompleted
                        ? "bg-green-500 border-green-500"
                        : "border-white/20 hover:border-white/40"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={cn(
                      "text-lg font-semibold text-white mb-2 transition-all duration-300",
                      isCompleted && "line-through text-white/50"
                    )}>
                      {item.title}
                    </h4>

                    {/* Always show truncated description, full on expand */}
                    <p className={cn(
                      "text-white/50 text-sm leading-relaxed transition-all duration-300",
                      !isExpanded && "line-clamp-2"
                    )}>
                      {item.description}
                    </p>

                    {/* Expand indicator */}
                    <motion.div
                      className="flex items-center gap-1 mt-3 text-white/30 text-xs"
                      animate={{ opacity: isExpanded ? 0 : 1 }}
                    >
                      <span>Click to expand</span>
                      <ChevronRight className="w-3 h-3" />
                    </motion.div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}