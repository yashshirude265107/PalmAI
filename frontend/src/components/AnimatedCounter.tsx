"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
}

export default function AnimatedCounter({ value, label, icon, suffix = "" }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex flex-col items-center gap-1 p-5 text-center"
    >
      {icon && <div className="mb-1 text-brand-600">{icon}</div>}
      <span className="text-2xl font-bold">
        {display}
        {suffix}
      </span>
      <span className="text-xs opacity-60">{label}</span>
    </motion.div>
  );
}
