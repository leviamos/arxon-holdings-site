"use client";

import React from "react";

export default function SubsystemMetricsPanel({ metrics }: { metrics: any }) {
  if (!metrics) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold text-neutral-100">
          Metrics
        </h2>
        <p className="text-neutral-500 text-sm">
          No metrics have been received for this subsystem yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3">
      <h2 className="text-xl font-semibold text-neutral-100">
        Metrics (Live)
      </h2>

      <pre className="text-neutral-300 text-sm whitespace-pre-wrap bg-neutral-950 p-3 rounded-lg border border-neutral-800">
        {JSON.stringify(metrics, null, 2)}
      </pre>
    </div>
  );
}
