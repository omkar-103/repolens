"use client";

import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glow?: boolean;
  tilt?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  gradient = false,
  glow = false,
  tilt = false,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative glass-card rounded-2xl p-6 overflow-hidden",
        hover && "hover-lift cursor-pointer",
        gradient && "border-gradient",
        glow && "glow-purple",
        className
      )}
      style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      {/* Inner glow on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
          }}
          whileHover={{ opacity: 1 }}
        />
      )}
      
      {/* Shimmer effect */}
      {hover && <div className="absolute inset-0 shimmer pointer-events-none" />}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom gradient line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-50"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.5), transparent)",
        }}
      />
    </motion.div>
  );
}