import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2 text-lg font-bold">
          <Sparkles className="text-brand-600" size={20} />
          <span className="gradient-text">PalmAI</span>
        </div>
        <p className="max-w-md text-sm opacity-60">
          AI-generated palm readings are for entertainment and self-reflection purposes only and are not a
          substitute for professional medical, legal, or financial advice.
        </p>
        <div className="flex gap-6 text-sm opacity-80">
          <Link href="/#features">Features</Link>
          <Link href="/login">Log In</Link>
          <Link href="/upload">Get Started</Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs opacity-40">
        © {new Date().getFullYear()} PalmAI. All rights reserved.
      </p>
    </footer>
  );
}
