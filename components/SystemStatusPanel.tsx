"use client";

import { useEffect, useState } from "react";
import ArxonCard from "@/components/ArxonCard";

export default function SystemStatusPanel() {
  const [status, setStatus] = useState<any>(null);
  const [orchestrator, setOrchestrator] = useState<any>(null);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const sys = await fetch("/api/status").then((r) => r.json());
        setStatus(sys);

        const orch = await fetch("/api/status/orchestrator").then((r) =>
          r.json()
        );
        setOrchestrator(orch);
      } catch (err) {
        setStatus({ error: "Failed to load system status." });
      }
    };

    loadStatus();
  }, []);

  return (
    <ArxonCard title="System Status">
      {!status && (
        <div className="text-neutral-400">Loading system diagnostics…</div>
      )}

      {status && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-neutral-200 mb-1">
              Core System
            </h3>
            {status.error ? (
              <p className="text-red-400 text-sm">{status.error}</p>
            ) : (
              <ul className="text-sm space-y-1">
                <li>Status: {status.status}</li>
                <li>Server Time: {status.server_time}</li>
                <li>Environment: {status.environment}</li>
              </ul>
            )}
          </div>

          <div className="border-t border-neutral-800 pt-4">
            <h3 className="font-semibold text-neutral-200 mb-1">
              Orchestrator Health
            </h3>
            {!orchestrator && (
              <p className="text-neutral-400 text-sm">Checking…</p>
            )}
            {orchestrator && (
              <ul className="text-sm space-y-1">
                <li>
                  URL:{" "}
                  <span className="text-neutral-400">
                    {orchestrator.orchestrator_url}
                  </span>
                </li>
                <li>
                  Reachable:{" "}
                  {orchestrator.reachable ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No</span>
                  )}
                </li>
                <li>
                  Latency:{" "}
                  {orchestrator.latency_ms !== null
                    ? `${orchestrator.latency_ms} ms`
                    : "N/A"}
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </ArxonCard>
  );
}
