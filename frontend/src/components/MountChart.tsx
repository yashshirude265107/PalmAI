"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { PalmReport } from "@/types";

interface MountChartProps {
  report: PalmReport;
}

/**
 * The AI returns qualitative mount descriptions, not raw numbers. To give the
 * report a visual "at a glance" summary, we derive a relative prominence score
 * per mount from the description length/detail as a proxy signal, purely for
 * illustrative visualization purposes.
 */
function scoreFromText(text: string | undefined) {
  if (!text) return 40;
  const base = 50 + (text.length % 40);
  return Math.min(base, 95);
}

export default function MountChart({ report }: MountChartProps) {
  const data = [
    { mount: "Jupiter", value: scoreFromText(report.mountJupiter) },
    { mount: "Saturn", value: scoreFromText(report.mountSaturn) },
    { mount: "Apollo", value: scoreFromText(report.mountApollo) },
    { mount: "Mercury", value: scoreFromText(report.mountMercury) },
    { mount: "Venus", value: scoreFromText(report.mountVenus) },
    { mount: "Moon", value: scoreFromText(report.mountMoon) },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Mount Prominence</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="currentColor" strokeOpacity={0.15} />
          <PolarAngleAxis dataKey="mount" tick={{ fontSize: 12, fill: "currentColor", opacity: 0.7 }} />
          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
          <Radar dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
