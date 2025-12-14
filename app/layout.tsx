import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepoLens - AI-Powered GitHub Repository Analyzer",
  description:
    "Analyze any public GitHub repository and get instant AI-powered insights, quality scores, and improvement roadmaps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  );
}