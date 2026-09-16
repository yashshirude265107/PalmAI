"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { UploadCloud, Camera, X, ImageIcon } from "lucide-react";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 8;

interface UploadBoxProps {
  onFileSelected: (file: File) => void;
}

export default function UploadBox({ onFileSelected }: UploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      setError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Please upload a JPEG, PNG, or WEBP image.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
        return;
      }
      // Basic quality guard — extremely small images are unlikely to show palm detail clearly
      if (file.size < 10 * 1024) {
        setError("This image looks too low-quality. Please upload a clearer photo.");
        return;
      }

      setPreview(URL.createObjectURL(file));
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  const clear = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`glass-card flex flex-col items-center justify-center gap-4 border-2 border-dashed p-12 text-center transition ${
            dragActive ? "border-brand-500 bg-brand-50/50" : "border-white/30"
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white">
            <UploadCloud size={28} />
          </div>
          <div>
            <p className="font-semibold">Drag & drop your palm photo here</p>
            <p className="text-sm opacity-60">JPEG, PNG, or WEBP — up to {MAX_SIZE_MB}MB</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="glow-btn !px-5 !py-2.5 text-sm"
            >
              <ImageIcon size={16} /> Choose Image
            </button>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/40 dark:hover:bg-white/10"
            >
              <Camera size={16} /> Use Camera
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => validateAndSet(e.target.files?.[0])}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => validateAndSet(e.target.files?.[0])}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card relative overflow-hidden p-4"
        >
          <button
            onClick={clear}
            className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl">
            <Image src={preview} alt="Palm preview" fill className="object-cover" unoptimized />
          </div>
          <p className="mt-3 text-center text-sm opacity-60">
            Make sure your full palm is visible, in focus, and well-lit for the most accurate reading.
          </p>
        </motion.div>
      )}

      {error && <p className="mt-3 text-center text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
