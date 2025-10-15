import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GlassMotion",
  description: "Beautiful Glass UI Design System with layered glass effects, dynamic lighting, and fluid motion.",
  keywords: ["glass design", "ui components", "design system", "shadcn", "tailwind css", "glassmorphism", "translucent ui"],
  authors: [{ name: "GlassMotion" }],
  creator: "GlassMotion",
  publisher: "GlassMotion",
  metadataBase: new URL("https://glassmotion.llmer.com"),
  openGraph: {
    title: "GlassMotion",
    description: "Beautiful Glass UI Design System with layered glass effects, dynamic lighting, and fluid motion.",
    url: "https://glassmotion.llmer.com",
    siteName: "GlassMotion",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GlassMotion Design System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlassMotion",
    description: "Beautiful Glass UI Design System with layered glass effects, dynamic lighting, and fluid motion.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
