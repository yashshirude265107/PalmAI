"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { PalmReport } from "@/types";

export default function HistoryPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [reports, setReports] = useState<PalmReport[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      setLoading(true);
      const res = await api.get("/history", { params: { page, limit: 10 } });
      setReports(res.data.reports);
      setPages(res.data.pagination.pages);
      setLoading(false);
    })();
  }, [isAuthenticated, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this report? This cannot be undone.")) return;
    await api.delete(`/history/${id}`);
    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  if (authLoading || !isAuthenticated) return null;

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl">
          Report <span className="gradient-text">History</span>
        </h1>

        {loading ? (
          <p className="opacity-60">Loading...</p>
        ) : reports.length === 0 ? (
          <div className="glass-card p-10 text-center opacity-70">No reports found.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {reports.map((r) => (
              <div key={r._id} className="glass-card flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={r.palmImageUrl} alt="Palm" fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Palm Reading Report</p>
                  <p className="text-xs opacity-60">
                    {new Date(r.createdAt).toLocaleString()} · Score {r.analysisScore}%
                  </p>
                </div>
                <Link
                  href={`/result/${r._id}`}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white/40 dark:hover:bg-white/10"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="text-red-400 hover:text-red-500"
                  aria-label="Delete report"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-full text-sm font-semibold ${
                  p === page ? "bg-brand-gradient text-white" : "border border-white/20"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
