"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, FileText, Plus, Trash2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { PalmReport } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [reports, setReports] = useState<PalmReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        const res = await api.get("/history", { params: { limit: 6 } });
        setReports(res.data.reports);
      } catch {
        // silently ignore — the section will just show the empty state
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this report? This cannot be undone.")) return;
    await api.delete(`/history/${id}`);
    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  if (authLoading || !isAuthenticated) return null;

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome back, <span className="gradient-text">{user?.name?.split(" ")[0]}</span>
            </h1>
            <p className="mt-1 opacity-60">Here&apos;s an overview of your palm readings.</p>
          </div>
          <Link href="/upload" className="glow-btn">
            <Plus size={16} /> New Reading
          </Link>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <AnimatedCounter value={reports.length} label="Total Reports" icon={<FileText size={20} />} />
          <AnimatedCounter
            value={Math.round(reports.reduce((a, r) => a + (r.analysisScore || 0), 0) / (reports.length || 1))}
            suffix="%"
            label="Avg. Score"
            icon={<Sparkles size={20} />}
          />
          <AnimatedCounter value={reports.filter((r) => r.status === "completed").length} label="Completed" />
          <AnimatedCounter value={reports.filter((r) => r.status === "processing").length} label="Processing" />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Reports</h2>
          <Link href="/history" className="flex items-center gap-1 text-sm font-semibold text-brand-600">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <p className="opacity-60">Loading your reports...</p>
        ) : reports.length === 0 ? (
          <div className="glass-card flex flex-col items-center gap-4 p-12 text-center">
            <Sparkles className="text-brand-500" size={32} />
            <p className="font-semibold">No reports yet</p>
            <p className="max-w-sm text-sm opacity-60">
              Upload a photo of your palm to generate your first AI-powered reading.
            </p>
            <Link href="/upload" className="glow-btn">
              Analyze My Palm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((r, i) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card group overflow-hidden"
              >
                <Link href={`/result/${r._id}`} className="block">
                  <div className="relative h-40 w-full">
                    <Image src={r.palmImageUrl} alt="Palm" fill className="object-cover" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-sm font-semibold text-white">
                      Score: {r.analysisScore}%
                    </span>
                  </div>
                </Link>
                <div className="flex items-center justify-between p-4">
                  <p className="text-xs opacity-60">{new Date(r.createdAt).toLocaleDateString()}</p>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-400 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
                    aria-label="Delete report"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
