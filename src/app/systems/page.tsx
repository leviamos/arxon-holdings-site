export default function SystemsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">

      <h1 className="text-3xl font-bold tracking-tight">
        Systems Overview
      </h1>

      <p className="text-neutral-400">
        This section will contain real-time status views for all Arxon Intelligence
        subsystems, multi-agent clusters, orchestration nodes, and infrastructure
        components. Modules will appear here as they are implemented.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-neutral-100 mb-2">
            Core Agent System
          </h2>
          <p className="text-neutral-400 text-sm">
            Status panel coming soon.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-neutral-100 mb-2">
            Orchestrator & Workflow Engine
          </h2>
          <p className="text-neutral-400 text-sm">
            Health metrics will display here.
          </p>
        </div>

      </div>

    </div>
  );
}
