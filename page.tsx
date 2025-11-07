import Link from "next/link";

const ventures = [
  {
    name: "OSIS",
    tagline: "Open Source Industry Standards",
    desc: "Automated, open standards & guidance development platform.",
    href: "/ventures/osis"
  },
  {
    name: "Prefab Factory Certification",
    tagline: "Assurance for modern methods of construction",
    desc: "Third-party certification framework for prefab and modular factories.",
    href: "/ventures/prefab-cert"
  },
  {
    name: "Future Ventures",
    tagline: "Idea-to-execution engine",
    desc: "Arxon-owned concepts that can be spun up by the agentic helper.",
    href: "/ventures"
  }
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="flex flex-col gap-4 mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Arxon Holdings
        </h1>
        <p className="text-slate-300 max-w-2xl">
          A modern holdings group that turns specialised ideas into fully
          operational ventures using automated systems, standards-aligned frameworks,
          and an agentic execution engine.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">What Arxon Does</h2>
        <p className="text-slate-300 max-w-3xl">
          Arxon owns and operates niche platforms such as OSIS and Prefab Factory Certification.
          Our internal agentic helper can register entities, secure domains, deploy compliant
          websites, and scaffold certification and standards workflows with human approval at key checkpoints.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Ventures</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {ventures.map(v => (
            <Link
              key={v.name}
              href={v.href}
              className="block border border-slate-800 bg-arxon-accentSoft/40 rounded-2xl p-4 hover:border-arxon-accent transition"
            >
              <h3 className="text-lg font-semibold mb-1">{v.name}</h3>
              <p className="text-sm text-slate-400 mb-1">{v.tagline}</p>
              <p className="text-xs text-slate-500">{v.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border border-slate-800 rounded-2xl p-4 bg-black/40">
        <h2 className="text-lg font-semibold mb-2">Internal Agent Console</h2>
        <p className="text-slate-400 text-sm mb-3">
          This is where Arxon&apos;s private agent executes tasks like domain purchase,
          company setup, and new venture scaffolding. For now, this is wired to
          backend workflows and requires explicit approval for any legal or financial actions.
        </p>
        <p className="text-xs text-slate-500">
          (In production, this section is behind secure auth. Public visitors only see a corporate overview.)
        </p>
      </section>
    </main>
  );
}
