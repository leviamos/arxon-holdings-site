export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      <h1 className="text-3xl font-bold tracking-tight">
        About Arxon Intelligence
      </h1>

      <p className="text-neutral-400 leading-relaxed">
        Arxon Intelligence is the autonomous systems division of Arxon Holdings,
        designed to operate as a high-performance, multi-agent orchestration layer.
        It unifies decision logic, workflow execution, system monitoring, and adaptive
        behaviour into a single cohesive framework.
      </p>

      {/* Mission Section */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold text-neutral-100">
          Mission
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed">
          To create a self-governing, self-optimising, agentic infrastructure capable
          of powering intelligent operations across all Arxon business entities—
          with minimal human intervention and maximum reliability.
        </p>
      </section>

      {/* Architecture Section */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold text-neutral-100">
          System Architecture
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Arxon Intelligence leverages a modular architecture that includes:
        </p>
        <ul className="text-neutral-300 text-sm space-y-1 list-disc pl-5">
          <li>AI orchestration layer (n8n-based workflow engine)</li>
          <li>Real-time logging and monitoring services</li>
          <li>Instruction stream and command routing</li>
          <li>Agent tuning and behavioural configuration</li>
          <li>Multi-agent cluster expandability</li>
        </ul>
      </section>

      {/* Roadmap Section */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold text-neutral-100">
          Roadmap
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Upcoming enhancements to Arxon Intelligence include:
        </p>
        <ul className="text-neutral-300 text-sm space-y-1 list-disc pl-5">
          <li>Autonomous agent scheduling and multi-agent planning</li>
          <li>System-wide analytics and behaviour prediction</li>
          <li>Agent roles, permissions, and delegation rules</li>
          <li>Persistent long-term memory and knowledge graphs</li>
          <li>Self-diagnostics and self-recovery routines</li>
        </ul>
      </section>

      {/* Footer Note */}
      <p className="text-neutral-500 text-xs pt-4">
        © {new Date().getFullYear()} Arxon Holdings. All rights reserved.
      </p>

    </div>
  );
}
