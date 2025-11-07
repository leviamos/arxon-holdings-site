import "./globals.css";

export const metadata = {
  title: "Arxon Holdings",
  description:
    "Arxon Holdings — Investments, Automation, AI Systems. Developing innovative operating models and deploying fully automated systems to turn concepts into reality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-arxon-bg text-slate-100">
        {children}
      </body>
    </html>
  );
}
