"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const LOADING_TEXTS = [
  "Reading Palm Lines...",
  "Analyzing Mounts...",
  "Predicting Career...",
  "Finding Future...",
  "Almost Done...",
];

interface AnalyzingOverlayProps {
  active: boolean;
}

export default function AnalyzingOverlay({ active }: AnalyzingOverlayProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      setTextIndex(0);
      return;
    }

    const textTimer = setInterval(() => {
      setTextIndex((i) => (i + 1) % LOADING_TEXTS.length);
    }, 1800);

    // Progress crawls toward 92% while waiting on the real API response,
    // then the caller can let it finish naturally when the request resolves.
    const progressTimer = setInterval(() => {
      setProgress((p) => (p < 92 ? p + Math.random() * 6 : p));
    }, 400);

    return () => {
      clearInterval(textTimer);
      clearInterval(progressTimer);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient shadow-glow"
      >
        <Sparkles className="text-white" size={32} />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={textIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mb-6 text-lg font-semibold text-white"
        >
          {LOADING_TEXTS[textIndex]}
        </motion.p>
      </AnimatePresence>

      <div className="h-2 w-72 max-w-[80vw] overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="h-full bg-brand-gradient"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
