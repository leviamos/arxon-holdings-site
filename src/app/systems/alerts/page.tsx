"use client";

import { useEffect, useState } from "react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [hideAcknowledged, setHideAcknowledged] = useState(false);

  const loadAlerts = async () => {
    try {
      const res = await fetch("/api/alerts");
      const json = await res.json();

      if (json.alerts) {
        setAlerts([...json.alerts].reverse()); // newest first
      }
    } catch (err) {
      console.error("Failed to load alerts:", err);
    }

    setLoading(false);
  };

  const clearAlerts = async () => {
    setClearing(true);
    try {
      await fetch("/api/alerts", { method: "DELETE" });
      setAlerts([]);
    } catch (err) {
      console.error("Failed to clear alerts:", err);
    }
    setClearing(false);
  };

  const acknowledgeAlert = async (id: string) => {
    try {
      await fetch(`/api/alerts/${id}/ack`, { method: "POST" });
      loadAlerts();
    } catch (err) {
      console.error("Failed to acknowledge alert:", err);
    }
  };

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const badgeColor = (sev: string) => {
    if (sev === "critical") return "bg-red-600";
    if (sev === "warning") return "bg-yellow-500 text-black";
    return "bg-blue-600";
  };

  const filteredAlerts = hideAcknowledged
    ? alerts.filter((a) => !a.acknowledged)
    : alerts;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Alerts
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHideAcknowledged(!hideAcknowledged)}
            className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 hover:border-neutral-500"
          >
            {hideAcknowledged ? "Show Acknowledged" : "Hide Acknowledged"}
          </button>

          <button
            onClick={clearAlerts}
            disabled={clearing}
            className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 hover:border-neutral-500 disabled:opacity-50"
          >
            {clearing ? "Clearing…" : "Clear All"}
          </button>
        </div>
      </div>

      <p className="text-neutral-400 text-sm">
        Active system alerts. Updates every 5 seconds.
      </p>

      {loading && <p className="text-neutral-400">Loading alerts…</p>}

      {!loading && filteredAlerts.length === 0 && (
        <p className="text-neutral-500">No alerts to display.</p>
      )}

      {/* ALERT LIST */}
      {filteredAlerts.length > 0 && (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3 ${
                alert.acknowledged ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">

                {/* Severity Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${badgeColor(
                    alert.severity
                  )}`}
                >
                  {alert.severity.toUpperCase()}
                </span>

                <span className="text-xs text-neutral-500">
                  {alert.timestamp}
                </span>
              </div>

              <p className="text-neutral-300 text-sm">{alert.message}</p>

              <p className="text-xs text-neutral-500">
                Source: {alert.source}
              </p>

              {/* Details */}
              {alert.details && (
                <pre className="text-xs text-neutral-500 bg-neutral-950 border border-neutral-800 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(alert.details, null, 2)}
                </pre>
              )}

              {/* Acknowledgement Section */}
              {!alert.acknowledged ? (
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="px-3 py-1 bg-neutral-800 text-white text-sm rounded-md border border-neutral-700 hover:border-neutral-500"
                >
                  Acknowledge
                </button>
              ) : (
                <p className="text-xs text-green-400">
                  Acknowledged at {alert.acknowledgedAt}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
