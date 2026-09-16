"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadBox from "@/components/UploadBox";
import AnalyzingOverlay from "@/components/AnalyzingOverlay";
import { api, fileToBase64 } from "@/lib/api";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {

  if (!file) return;

  setError(null);
  setAnalyzing(true);

  try {

    // Convert image to base64
    const { base64, mimeType } = await fileToBase64(file);

    // Upload locally (backend now returns base64 instead of Cloudinary URL)
    const formData = new FormData();
    formData.append("image", file);

    const uploadRes = await api.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Analyze
    const analyzeRes = await api.post("/analyze", {

      imageBase64: uploadRes.data.imageBase64,

      mimeType: uploadRes.data.mimeType,

      imageUrl: "local-upload",

      handSide: "unspecified"

    });

    const reportId = analyzeRes.data.report.id;

    router.push(`/result/${reportId}`);

  } catch (err: any) {

    setError(
      err?.response?.data?.message ||
      "Analysis Failed"
    );

    setAnalyzing(false);

  }

};

  return (
    <main>
      <Navbar />
      <AnalyzingOverlay active={analyzing} />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10 text-center">
          <h1 className="section-heading">
            Upload Your <span className="gradient-text">Palm</span>
          </h1>
          <p className="mt-3 opacity-70">
            For the best results, use good lighting and photograph your dominant hand's palm flat and fully
            open.
          </p>
        </div>

        <UploadBox onFileSelected={setFile} />

        {error && (
          <p className="mt-4 text-center text-sm font-medium text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!file || analyzing}
            className="glow-btn disabled:cursor-not-allowed disabled:opacity-40"
          >
            {analyzing ? "Analyzing..." : "Analyze Palm"}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
