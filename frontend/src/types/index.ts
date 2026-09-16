export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface PalmReport {
  _id: string;
  user: string;
  palmImageUrl: string;
  handSide: "left" | "right" | "unspecified";

  handShape: string;
  palmShape: string;
  fingerShape: string;
  thumbAnalysis: string;

  lifeLine: string;
  heartLine: string;
  headLine: string;
  fateLine: string;
  sunLine: string;
  marriageLine: string;
  moneyLine: string;
  healthLine: string;

  mountJupiter: string;
  mountSaturn: string;
  mountApollo: string;
  mountMercury: string;
  mountVenus: string;
  mountMoon: string;

  career: string;
  education: string;
  love: string;
  marriage: string;
  business: string;
  finance: string;
  children: string;
  travel: string;
  personality: string;
  strengths: string;
  weaknesses: string;

  luckyNumber: string;
  luckyColor: string;
  luckyDay: string;
  futureTimeline: string;
  overallSummary: string;

  analysisScore: number;
  status: "processing" | "completed" | "failed";
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  [key: string]: unknown;
}
