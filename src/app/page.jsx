export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-32 text-center">
      <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
        Arxon Holdings
      </h1>

      <p className="text-slate-300 text-xl md:text-2xl mb-6">
        Investments. Automation. AI Systems.
      </p>

      <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
        Arxon develops innovative operating models and deploys fully automated
        systems to turn concepts into reality. We invest in ideas, technology,
        and capability that redefine performance across every sector.
      </p>

      <div className="mt-12 border-t border-slate-800 pt-8">
        <p className="text-slate-500 text-sm uppercase tracking-widest">
          Arxon Holdings © {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
