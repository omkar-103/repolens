import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepoLens - AI-Powered GitHub Repository Analyzer",
  description:
    "Analyze any public GitHub repository and get instant AI-powered insights, quality scores, and improvement roadmaps.",
  keywords: ["GitHub", "Repository", "Analyzer", "AI", "Code Quality", "Developer Tools"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}