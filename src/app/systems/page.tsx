"use client";

import { useEffect, useState } from "react";
import SubsystemCard from "@/components/SubsystemCard";
import AutoRegisterSubsystem from "@/components/AutoRegisterSubsystem";

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
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* Auto-register this subsystem */}
      <AutoRegisterSubsystem
        id="systems-overview"
        name="Systems Overview Module"
        description="Provides a complete view of all registered subsystems."
      />

      <h1 className="text-3xl font-bold tracking-tight">
        Systems Overview
      </h1>

      <p className="text-neutral-400">
        Real-time status for all registered Arxon Intelligence subsystems.
      </p>

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
            />
          ))}
        </div>
      )}

    </div>
  );
}
