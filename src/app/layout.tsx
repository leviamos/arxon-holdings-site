import "./globals.css";
import ArxonNav from "@/components/ArxonNav";

export const metadata = {
  title: "Arxon Intelligence",
  description: "Autonomous Agent System for Arxon Holdings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 antialiased min-h-screen">
        {/* Global Navigation */}
        <ArxonNav />

        {/* Page Content */}
        <main className="pt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
