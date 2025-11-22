"use client";

import { useEffect, useState } from "react";
import SubsystemCard from "@/components/SubsystemCard";
import AutoRegisterSubsystem from "@/components/AutoRegisterSubsystem";
import { computeGlobalHealth } from "@/lib/globalHealth";

export default function SystemsPage() {
  const [systems, setSystems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSystems = async () => {
    try {
      const res = await fetch("/api/systems");
      const json = await res.json();

      if (json.systems) {
        setSystems(json.systems);
      }
    } catch (err) {
      console.error("Failed to load systems:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadSystems();
    const interval = setInterval(loadSystems, 5000);
    return () => clearInterval(interval);
  }, []);

  // Compute global health score
  const global = computeGlobalHealth();

  const barColor =
    global.status === "healthy"
      ? "bg-green-600"
      : global.status === "degraded"
      ? "bg-yellow-500"
      : "bg-red-600";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* Auto-register this subsystem */}
      <AutoRegisterSubsystem
        id="systems-overview"
        name="Systems Overview Module"
        description="Provides a complete view of all registered subsystems."
      />

      {/* NEW: Global Health Banner */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl">
        <div className={`h-3 w-full rounded-t-xl ${barColor}`} />

        <div className="p-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Arxon Intelligence — {global.label} ({global.score})
          </h1>

          <p className="text-neutral-400 text-sm">
            Monitoring {global.subsystems} subsystems in real time.
          </p>
        </div>
      </section>

      {loading && (
        <p className="text-neutral-400">Loading systems…</p>
      )}

      {!loading && systems.length === 0 && (
        <p className="text-neutral-500">No systems registered.</p>
      )}

      {!loading && systems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systems.map((sys) => (
            <SubsystemCard
              key={sys.id}
              id={sys.id}
              name={sys.name}
              status={sys.status}
              description={sys.description}
              metrics={sys.metrics}
            />
          ))}
        </div>
      )}
    </div>
  );
}
