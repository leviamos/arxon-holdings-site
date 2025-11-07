import "./globals.css";

export const metadata = {
  title: "Arxon Holdings",
  description:
    "Arxon Holdings – A parent platform for automated, standards-led ventures including OSIS and Prefab Factory Certification.",
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
