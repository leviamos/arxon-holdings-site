"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { startHealthPoller } from "@/lib/healthPoller";

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
    // Start live polling
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
      5000 // 5 second interval
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

      {/* Back Link */}
      <Link
        href="/systems"
        className="text-neutral-400 hover:text-white text-sm"
      >
        ← Back to Systems Overview
      </Link>

      {/* Initial Loading */}
      {initialLoad && (
        <p className="text-neutral-400">Loading subsystem details…</p>
      )}

      {/* Error State */}
      {!initialLoad && error && (
        <p className="text-red-400">{error}</p>
      )}

      {/* Subsystem Details */}
      {system && !error && (
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

          {/* Live Diagnostics */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-neutral-100">
              Diagnostics (Live)
            </h2>

            <p className="text-neutral-400 text-sm leading-relaxed">
              This subsystem is being monitored in real time. Future metrics such as
              heartbeat frequency, uptime percentage, API latency, memory usage, and
              orchestrator workflow statistics will be displayed here.
            </p>
          </section>

          {/* Controls */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-neutral-100">
              Subsystem Controls
            </h2>

            <p className="text-neutral-400 text-sm leading-relaxed">
              Restart, disable, or modify subsystem configuration here once controls
              are implemented in later versions.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
