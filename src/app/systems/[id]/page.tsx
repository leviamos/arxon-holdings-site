"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { startHealthPoller } from "@/lib/healthPoller";
import SubsystemMetricsPanel from "@/components/SubsystemMetricsPanel";
import SubsystemMetricsSummary from "@/components/SubsystemMetricsSummary";
import SubsystemMetricsChart from "@/components/SubsystemMetricsChart";

export default function SubsystemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [system, setSystem] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const stop = startHealthPoller(
      id,
      ({ data, error }) => {
        if (data) {
          setSystem(data);
          setError(null);
        } else {
          setError(error);
        }
        setInitialLoad(false);
      },
      5000
    );

    return () => stop();
  }, [id]);

  const statusColor = (s: string) =>
    s === "online"
      ? "text-green-400"
      : s === "offline"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      <Link
        href="/systems"
        className="text-neutral-400 hover:text-white text-sm"
      >
        ← Back to Systems Overview
      </Link>

      {initialLoad && (
        <p className="text-neutral-400">Loading subsystem details…</p>
      )}

      {!initialLoad && error && (
        <p className="text-red-400">{error}</p>
      )}

      {system && !error && (
        <>
          {/* Header */}
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

            {system.last_heartbeat && (
              <div className="text-sm text-neutral-400">
                <span className="text-neutral-500">Last heartbeat: </span>
                {system.last_heartbeat}
              </div>
            )}

            <p className="text-neutral-400 text-sm">
              {system.description || "No description available."}
            </p>
          </div>

          {/* Summary Metrics Panel */}
          <SubsystemMetricsSummary metrics={system.metrics} />

          {/* Full Metrics JSON Panel */}
          <SubsystemMetricsPanel metrics={system.metrics} />

          {/* NEW: Metrics Chart */}
          <SubsystemMetricsChart subsystemId={id} />

          {/* Diagnostics */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-neutral-100">
              Diagnostics (Live)
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              More diagnostics will appear here as subsystem monitoring expands.
            </p>
          </section>

          {/* Controls */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-neutral-100">
              Subsystem Controls
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Restart, disable, configure, or trigger recovery routines in future versions.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
