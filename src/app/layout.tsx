import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
