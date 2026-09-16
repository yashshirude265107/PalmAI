"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-black/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="text-brand-600" size={22} />
          <span className="gradient-text">PalmAI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium opacity-80 hover:opacity-100">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <Link href="/dashboard" className="glow-btn !px-5 !py-2 text-sm">
              Hi, {user?.name?.split(" ")[0]}
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium opacity-80 hover:opacity-100">
                Log In
              </Link>
              <Link href="/upload" className="glow-btn !px-5 !py-2 text-sm">
                Analyze My Palm
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 md:hidden"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <ThemeToggle />
            <Link href={isAuthenticated ? "/dashboard" : "/upload"} className="glow-btn !px-5 !py-2 text-sm">
              {isAuthenticated ? "Dashboard" : "Analyze My Palm"}
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
