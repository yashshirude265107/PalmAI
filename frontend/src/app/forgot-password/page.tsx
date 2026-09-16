"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

interface ForgotFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<ForgotFormValues>();

  const onSubmit = async (data: ForgotFormValues) => {
    setSubmitting(true);
    try {
      await api.post("/auth/forgot-password", data);
    } finally {
      setSubmitting(false);
      setSent(true); // always show success, regardless of whether the email exists
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-brand-radial" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative w-full max-w-md p-8 text-center"
      >
        <Link href="/" className="mb-4 flex items-center justify-center gap-2 text-xl font-bold">
          <Sparkles className="text-brand-600" size={22} />
          <span className="gradient-text">PalmAI</span>
        </Link>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="text-green-500" size={40} />
            <h1 className="text-xl font-bold">Check your email</h1>
            <p className="text-sm opacity-60">
              If an account exists for that email, we&apos;ve sent a password reset link.
            </p>
            <Link href="/login" className="mt-2 text-sm font-semibold text-brand-600 hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-1 text-xl font-bold">Reset your password</h1>
            <p className="mb-6 text-sm opacity-60">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/50 px-4 py-3 dark:bg-white/5">
                <Mail size={16} className="opacity-50" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm outline-none"
                  {...register("email", { required: true })}
                />
              </div>
              <button type="submit" disabled={submitting} className="glow-btn w-full justify-center">
                {submitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </main>
  );
}
