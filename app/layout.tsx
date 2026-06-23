import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arbiris.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arbiris",
    template: "%s | Arbiris",
  },
  description:
    "Foundational infrastructure for deterministic agentic intent. Anchor autonomous agents to statutory logic with cryptographic proof and compliance built for finance, healthcare, defence, and regulated sectors.",
  applicationName: "Arbiris",
  icons: {
    icon: [{ url: "/icons/logo.svg", type: "image/svg+xml" }],
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
  },
  openGraph: {
    title: "Arbiris",
    description:
      "Scale your AI workforce without increasing legal liability. Provable intent, real-time verification, and global compliance for autonomous systems.",
    type: "website",
    siteName: "Arbiris",
    images: [
      {
        url: "/images/og-image.png",
        width: 1812,
        height: 901,
        alt: "Arbiris — scale your AI workforce without increasing legal liability",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbiris",
    description:
      "Infrastructure for deterministic agentic intent—statutory logic, sub-second proof, and audit-ready visibility for agentic deployments.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, "h-full antialiased font-inter")}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
