import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arxon Holdings",
  description: "Arxon Holdings – A parent platform for automated, standards-led ventures including OSIS and Prefab Factory Certification.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-arxon-bg text-slate-100">
        {children}
      </body>
    </html>
  );
}
