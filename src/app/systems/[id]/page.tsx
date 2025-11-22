"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SubsystemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [system, setSystem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadSubsystem = async () => {
    try {
      const res = await fetch(`/api/systems/${id}`);
      const json = await res.json();

      if (json.system) {
        setSystem(json.system);
      }
    } catch (err) {
      console.error("Failed to load subsystem:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSubsystem();
  }, [id]);

  const statusColor = (s: string) =>
    s === "online"
      ? "text-green-400"
      : s === "offline"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* Back Link */}
      <Link
        href="/systems"
        className="text-neutral-400 hover:text-white text-sm"
      >
        ← Back to Systems Overview
      </Link>

      {/* Loading State */}
      {loading && (
        <p className="text-neutral-400">Loading subsystem details…</p>
      )}

      {/* Not Found */}
      {!loading && !system && (
        <p className="text-red-400">Subsystem not found.</p>
      )}

      {/* Subsystem Data */}
      {system && (
        <>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {system.name}
            </h1>

            <div className="text-sm">
              <span className="text-neutral-500">Status: </span>
              <span className={statusColor(system.status)}>
                {system.status}
              </span>
            </div>

            <p className="text-neutral-400 text-sm">
              {system.description || "No description available."}
            </p>
          </div>

          {/* Future Diagnostics Section */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-neutral-100">
              Diagnostics
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Diagnostic data for this subsystem will appear here, including 
              uptime, recent events, health metrics, connected workflows, 
              orchestrator routes, performance metrics, and subsystem-level logs.
            </p>
          </section>

          {/* Future Controls Section */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-neutral-100">
              Subsystem Controls
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Administrative tools for restarting, disabling, updating, or configuring 
              this subsystem will appear here in future versions.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
