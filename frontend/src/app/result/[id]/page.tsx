"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Briefcase,
  Heart,
  Wallet,
  HeartPulse,
  Mountain,
  Clock,
  Sparkles,
  Download,
  Image as ImageIcon,
  Share2,
  GraduationCap,
  Building2,
  Baby,
  Plane,
  User,
  Hand,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircularProgress from "@/components/CircularProgress";
import Accordion, { AccordionItem } from "@/components/Accordion";
import MountChart from "@/components/MountChart";
import AnimatedCounter from "@/components/AnimatedCounter";
import { api } from "@/lib/api";
import { downloadElementAsImage, downloadElementAsPDF, shareReport } from "@/lib/reportExport";
import { PalmReport } from "@/types";

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);

  const [report, setReport] = useState<PalmReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState<"pdf" | "image" | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/history/${id}`);
        setReport(res.data.report);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Report not found.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setExporting("pdf");
    try {
      await downloadElementAsPDF(reportRef.current, `PalmAI-Report-${id}`);
    } finally {
      setExporting(null);
    }
  };

  const handleDownloadImage = async () => {
    if (!reportRef.current) return;
    setExporting("image");
    try {
      await downloadElementAsImage(reportRef.current, `PalmAI-Report-${id}`);
    } finally {
      setExporting(null);
    }
  };

  const handleShare = async () => {
    await shareReport(window.location.href, "My PalmAI Reading");
  };

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="opacity-60">Loading your report...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !report) {
    return (
      <main>
        <Navbar />
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-lg font-semibold">{error || "Report not found."}</p>
          <button onClick={() => router.push("/upload")} className="glow-btn">
            Try Another Reading
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section ref={reportRef} className="mx-auto max-w-5xl px-6 py-16">
        {/* Cover / hero of report */}
        <div className="glass-card mb-10 flex flex-col items-center gap-8 p-8 md:flex-row md:items-start">
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl shadow-glow">
            <Image src={report.palmImageUrl} alt="Your palm" fill className="object-cover" unoptimized />
          </div>
          <div className="flex flex-1 flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                Your Premium Palm Report
              </p>
              <h1 className="text-2xl font-bold md:text-3xl">Personal Palm Reading</h1>
              <p className="mt-2 max-w-md text-sm opacity-70">{report.overallSummary}</p>
            </div>
            <CircularProgress value={report.analysisScore} />
          </div>
        </div>

        {/* Quick stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <AnimatedCounter value={report.analysisScore} suffix="%" label="Analysis Score" icon={<Sparkles size={20} />} />
          <AnimatedCounter value={8} label="Lines Analyzed" icon={<Hand size={20} />} />
          <AnimatedCounter value={6} label="Mounts Analyzed" icon={<Mountain size={20} />} />
          <AnimatedCounter value={9} label="Life Areas Covered" icon={<User size={20} />} />
        </div>

        {/* Chart */}
        <div className="mb-10">
          <MountChart report={report} />
        </div>

        {/* Detailed sections */}
        <h2 className="mb-4 text-xl font-bold">Detailed Analysis</h2>
        <Accordion>
          <AccordionItem icon={Hand} title="Hand & Palm Shape" defaultOpen>
            <p className="mb-2"><strong>Hand Shape:</strong> {report.handShape}</p>
            <p className="mb-2"><strong>Palm Shape:</strong> {report.palmShape}</p>
            <p className="mb-2"><strong>Finger Shape:</strong> {report.fingerShape}</p>
            <p><strong>Thumb Analysis:</strong> {report.thumbAnalysis}</p>
          </AccordionItem>

          <AccordionItem icon={Sparkles} title="Palm Lines">
            <p className="mb-2"><strong>Life Line:</strong> {report.lifeLine}</p>
            <p className="mb-2"><strong>Heart Line:</strong> {report.heartLine}</p>
            <p className="mb-2"><strong>Head Line:</strong> {report.headLine}</p>
            <p className="mb-2"><strong>Fate Line:</strong> {report.fateLine}</p>
            <p className="mb-2"><strong>Sun Line:</strong> {report.sunLine}</p>
            <p className="mb-2"><strong>Marriage Line:</strong> {report.marriageLine}</p>
            <p className="mb-2"><strong>Money Line:</strong> {report.moneyLine}</p>
            <p><strong>Health Line:</strong> {report.healthLine}</p>
          </AccordionItem>

          <AccordionItem icon={Briefcase} title="Career & Education">
            <p className="mb-2">{report.career}</p>
            <p className="flex items-center gap-2 text-xs opacity-60"><GraduationCap size={14} /> Education</p>
            <p>{report.education}</p>
          </AccordionItem>

          <AccordionItem icon={Heart} title="Love & Marriage">
            <p className="mb-2">{report.love}</p>
            <p>{report.marriage}</p>
          </AccordionItem>

          <AccordionItem icon={Wallet} title="Money & Business">
            <p className="mb-2 flex items-center gap-2 text-xs opacity-60"><Building2 size={14} /> Business</p>
            <p className="mb-2">{report.business}</p>
            <p>{report.finance}</p>
          </AccordionItem>

          <AccordionItem icon={HeartPulse} title="Health">
            <p>{report.healthLine}</p>
          </AccordionItem>

          <AccordionItem icon={Mountain} title="Mount Analysis">
            <p className="mb-2"><strong>Jupiter:</strong> {report.mountJupiter}</p>
            <p className="mb-2"><strong>Saturn:</strong> {report.mountSaturn}</p>
            <p className="mb-2"><strong>Apollo:</strong> {report.mountApollo}</p>
            <p className="mb-2"><strong>Mercury:</strong> {report.mountMercury}</p>
            <p className="mb-2"><strong>Venus:</strong> {report.mountVenus}</p>
            <p><strong>Moon:</strong> {report.mountMoon}</p>
          </AccordionItem>

          <AccordionItem icon={User} title="Personality & Traits">
            <p className="mb-2">{report.personality}</p>
            <p className="mb-2"><strong>Strengths:</strong> {report.strengths}</p>
            <p><strong>Weaknesses:</strong> {report.weaknesses}</p>
          </AccordionItem>

          <AccordionItem icon={Baby} title="Children & Travel">
            <p className="mb-2">{report.children}</p>
            <p className="flex items-center gap-2 text-xs opacity-60"><Plane size={14} /> Travel</p>
            <p>{report.travel}</p>
          </AccordionItem>

          <AccordionItem icon={Clock} title="Future Timeline">
            <p>{report.futureTimeline}</p>
          </AccordionItem>
        </Accordion>

        {/* Lucky attributes */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass-card p-5 text-center">
            <p className="text-xs uppercase opacity-60">Lucky Number</p>
            <p className="mt-1 text-2xl font-bold gradient-text">{report.luckyNumber}</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-xs uppercase opacity-60">Lucky Color</p>
            <p className="mt-1 text-2xl font-bold gradient-text">{report.luckyColor}</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-xs uppercase opacity-60">Lucky Day</p>
            <p className="mt-1 text-2xl font-bold gradient-text">{report.luckyDay}</p>
          </div>
        </div>
      </section>

      {/* Action bar (excluded from the exported report by being outside reportRef) */}
      <div className="mx-auto mb-16 flex max-w-5xl flex-wrap justify-center gap-4 px-6">
        <button onClick={handleDownloadPDF} disabled={!!exporting} className="glow-btn">
          <Download size={16} /> {exporting === "pdf" ? "Preparing..." : "Download PDF"}
        </button>
        <button
          onClick={handleDownloadImage}
          disabled={!!exporting}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold hover:bg-white/40 dark:hover:bg-white/10"
        >
          <ImageIcon size={16} /> {exporting === "image" ? "Preparing..." : "Download Image"}
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold hover:bg-white/40 dark:hover:bg-white/10"
        >
          <Share2 size={16} /> Share Report
        </button>
      </div>

      <Footer />
    </main>
  );
}
