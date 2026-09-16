"use client";

import { motion } from "framer-motion";
import { Upload, ScanEye, FileCheck2 } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Palm", desc: "Take a photo or upload an existing image of your palm." },
  { icon: ScanEye, title: "AI Analysis", desc: "Our AI reads your lines, mounts, and hand shape in seconds." },
  { icon: FileCheck2, title: "Get Premium Report", desc: "Receive a beautifully designed, downloadable report." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="section-heading">
          How It <span className="gradient-text">Works</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card relative p-8 text-center"
          >
            <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white shadow-glow">
              {i + 1}
            </div>
            <div className="mx-auto mt-6 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-white/10">
              <s.icon size={28} />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
            <p className="opacity-70">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
