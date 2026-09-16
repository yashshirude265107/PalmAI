"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LogOut, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

interface ProfileFormValues {
  name: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [stats, setStats] = useState<{ totalReports: number } | null>(null);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, reset } = useForm<ProfileFormValues>();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      const res = await api.get("/profile");
      setStats(res.data.stats);
      reset({ name: res.data.user.name });
    })();
  }, [isAuthenticated, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    await api.put("/profile", data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (authLoading || !isAuthenticated) return null;

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-xl px-6 py-16">
        <div className="glass-card p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white">
              <UserIcon size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{user?.name}</h1>
              <p className="text-sm opacity-60">{user?.email}</p>
            </div>
          </div>

          {stats && (
            <div className="mb-8 glass-card p-4 text-center">
              <p className="text-2xl font-bold gradient-text">{stats.totalReports}</p>
              <p className="text-xs opacity-60">Total Reports Generated</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <input
                className="w-full rounded-xl border border-white/20 bg-white/50 px-4 py-3 text-sm outline-none dark:bg-white/5"
                {...register("name", { required: true })}
              />
            </div>
            <button type="submit" className="glow-btn w-full justify-center">
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </form>

          <button
            onClick={logout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-red-400/40 py-3 text-sm font-semibold text-red-500 hover:bg-red-500/10"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
