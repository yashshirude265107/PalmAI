import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://palmai.app"),
  title: {
    default: "PalmAI – AI Palm Reading & Future Analysis",
    template: "%s | PalmAI",
  },
  description:
    "Upload your palm and receive a detailed AI-generated palm reading report covering career, love, health, money, and your future timeline — in seconds.",
  keywords: [
    "AI palm reading",
    "palmistry",
    "palm reading online",
    "future prediction AI",
    "hand analysis",
  ],
  openGraph: {
    title: "PalmAI – AI Palm Reading & Future Analysis",
    description:
      "Upload your palm and receive a detailed AI-generated palm reading report within seconds.",
    url: "https://palmai.app",
    siteName: "PalmAI",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PalmAI – AI Palm Reading & Future Analysis",
    description: "Discover your future with AI-powered palm reading.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PalmAI",
              applicationCategory: "LifestyleApplication",
              description:
                "AI-powered palm reading web application providing career, love, health, and money predictions.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
