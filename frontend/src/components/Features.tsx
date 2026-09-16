"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Briefcase,
  Heart,
  Wallet,
  HeartPulse,
  Hash,
  Palette,
  Mountain,
  Clock,
} from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Palm Analysis", desc: "Deep computer-vision analysis of your lines, mounts, and hand shape." },
  { icon: Briefcase, title: "Career Prediction", desc: "Insights into your professional strengths and career direction." },
  { icon: Heart, title: "Love & Marriage", desc: "Understand your romantic tendencies and relationship patterns." },
  { icon: Wallet, title: "Money Analysis", desc: "Discover your natural relationship with wealth and finance." },
  { icon: HeartPulse, title: "Health Analysis", desc: "Reflective insights based on your health line and vitality mounts." },
  { icon: Hash, title: "Lucky Number", desc: "Your personal lucky number derived from your palm's unique markings." },
  { icon: Palette, title: "Lucky Color", desc: "The color that resonates most with your palm's energy signature." },
  { icon: Mountain, title: "Mount Analysis", desc: "A full breakdown of Jupiter, Saturn, Apollo, Mercury, Venus & Moon mounts." },
  { icon: Clock, title: "Future Timeline", desc: "A projected timeline of key life phases based on your fate line." },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="section-heading">
          Everything you need in <span className="gradient-text">one report</span>
        </h2>
        <p className="mt-4 opacity-70">
          A single palm photo unlocks a complete premium reading across every part of your life.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08 }}
            className="glass-card group p-6 transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <f.icon size={22} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-sm opacity-70">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
