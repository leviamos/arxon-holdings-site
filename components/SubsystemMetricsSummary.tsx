"use client";

export default function SubsystemMetricsSummary({ metrics }: { metrics: any }) {
  if (!metrics) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-neutral-100 mb-3">
          Metrics Summary
        </h3>
        <p className="text-neutral-500 text-sm">
          No metrics available.
        </p>
      </div>
    );
  }

  const summaryItems = [
    { label: "Latency", value: metrics.latency ? metrics.latency + " ms" : "—" },
    { label: "CPU", value: metrics.cpu ? metrics.cpu : "—" },
    { label: "Memory", value: metrics.memory ? metrics.memory + " MB" : "—" },
    { label: "Workload", value: metrics.workload ?? "—" },
    { label: "Node", value: metrics.node ?? "—" },
    { label: "Updated", value: metrics.last_updated ?? "—" },
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
      <h3 className="text-lg font-semibold text-neutral-100">
        Metrics Summary
      </h3>

      <div className="grid grid-cols-2 gap-3 text-sm">
        {summaryItems.map((item, i) => (
          <div
            key={i}
            className="flex flex-col bg-neutral-950 border border-neutral-800 rounded-lg p-2"
          >
            <span className="text-neutral-500 text-xs">{item.label}</span>
            <span className="text-neutral-100 text-sm">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
