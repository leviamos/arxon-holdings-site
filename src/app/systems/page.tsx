"use client";

import { useEffect, useState } from "react";

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

      <h1 className="text-3xl font-bold tracking-tight">
        Systems Overview
      </h1>

      <p className="text-neutral-400">
        Real-time status for all registered Arxon Intelligence subsystems.
      </p>

      {loading && (
        <p classname="text-neutral-400">Loading systems…</p>
      )}

      {!loading && systems.length === 0 && (
        <p className="text-neutral-500">No systems registered.</p>
      )}

      {!loading && systems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {systems.map((sys) => (
            <div
              key={sys.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-2"
            >
              <h2 className="text-xl font-semibold text-neutral-100">
                {sys.name}
              </h2>

              <div className="text-sm text-neutral-400">
                {sys.description || "No description available."}
              </div>

              <div className="mt-3 text-sm">
                <span className="text-neutral-500">Status: </span>
                <span
                  className={
                    sys.status === "online"
                      ? "text-green-400"
                      : sys.status === "offline"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {sys.status}
                </span>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
