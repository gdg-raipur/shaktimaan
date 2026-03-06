import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Load Inter font — clean, modern, great for readability
const inter = Inter({ subsets: ["latin"] });

// Metadata shown in the browser tab and when sharing links
export const metadata: Metadata = {
  title: "AI Resume Judge | GDG Raipur Workshop",
  description:
    "Upload your resume and get instant AI-powered feedback using Google Gemini.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Dark theme: slate-900 background with white text */}
      <body className={`${inter.className} bg-slate-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
