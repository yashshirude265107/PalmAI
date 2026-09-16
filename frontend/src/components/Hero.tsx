"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Hand } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-32">
      {/* Floating glowing gradient blobs */}
      <div className="pointer-events-none absolute inset-0 bg-brand-radial" />
      <motion.div
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl animate-float-slow"
        aria-hidden
      />
      <motion.div
        className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl animate-float"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card mb-6 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-600"
        >
          <Hand size={14} /> Powered by Advanced AI Vision
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-heading max-w-3xl"
        >
          Discover Your <span className="gradient-text">Future</span> with AI Palm Reading
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-lg opacity-70"
        >
          Upload your palm and receive an AI-generated detailed report within seconds — career, love, money,
          health, and your future timeline, all in one premium report.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/upload" className="glow-btn">
            Analyze My Palm <ArrowRight size={18} />
          </Link>
          <a href="#how-it-works" className="text-sm font-semibold opacity-70 hover:opacity-100">
            See how it works →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
