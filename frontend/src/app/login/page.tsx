"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", data);
      login(res.data.token, res.data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-brand-radial" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative w-full max-w-md p-8"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Sparkles className="text-brand-600" size={22} />
            <span className="gradient-text">PalmAI</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm opacity-60">Log in to view your palm reading history</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/50 px-4 py-3 dark:bg-white/5">
              <Mail size={16} className="opacity-50" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm font-medium">Password</label>
              <Link href="/forgot-password" className="text-xs text-brand-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/50 px-4 py-3 dark:bg-white/5">
              <Lock size={16} className="opacity-50" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {serverError && <p className="text-center text-sm font-medium text-red-500">{serverError}</p>}

          <button type="submit" disabled={submitting} className="glow-btn mt-2 w-full justify-center">
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm opacity-70">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-brand-600 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
