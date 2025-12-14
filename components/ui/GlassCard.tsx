"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  gradient = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
        hover && "transition-all duration-300 hover:bg-white/10 hover:border-white/20",
        gradient && "gradient-border",
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}