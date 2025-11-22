"use client";

import { useEffect, useState } from "react";

interface EventEntry {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  details?: any;
  correlationId?: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [hideAcknowledged, setHideAcknowledged] = useState(false);

  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [correlatedEvent, setCorrelatedEvent] = useState<EventEntry | null>(null);

  // ------------------------------
  // LOAD DATA
  // ------------------------------
  const loadAlerts = async () => {
    try {
      const res = await fetch("/api/alerts");
      const json = await res.json();
      if (json.alerts) setAlerts([...json.alerts].reverse());
    } catch (err) {
      console.error("Failed to load alerts:", err);
    }
    setLoading(false);
  };

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const json = await res.json();
      if (json.events) setEvents(json.events);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  const refresh = async () => {
    await loadAlerts();
    await loadEvents();
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------
  // CLEAR & ACKNOWLEDGE
  // ------------------------------
  const clearAlerts = async () => {
    setClearing(true);
    try {
      await fetch("/api/alerts", { method: "DELETE" });
      setAlerts([]);
      setSelectedAlert(null);
      setCorrelatedEvent(null);
    } catch (err) {
      console.error("Failed to clear alerts:", err);
    }
    setClearing(false);
  };

  const acknowledgeAlert = async (id: string) => {
    try {
      await fetch(`/api/alerts/${id}/ack`, { method: "POST" });
      refresh();
    } catch (err) {
      console.error("Failed to acknowledge alert:", err);
    }
  };

  // ------------------------------
  // SELECT ALERT → LOAD CORRELATED EVENT
  // ------------------------------
  const openAlert = (alert: any) => {
    setSelectedAlert(alert);

    if (!alert.correlationId) {
      setCorrelatedEvent(null);
      return;
    }

    const event = events.find((e) => e.correlationId === alert.correlationId);
    setCorrelatedEvent(event || null);
  };

  const closePanel = () => {
    setSelectedAlert(null);
    setCorrelatedEvent(null);
  };

  // ------------------------------
  // UI HELPERS
  // ------------------------------
  const badgeColor = (sev: string) => {
    if (sev === "critical") return "bg-red-600";
    if (sev === "warning") return "bg-yellow-500 text-black";
    return "bg-blue-600";
  };

  const filteredAlerts = hideAcknowledged
    ? alerts.filter((a) => !a.acknowledged)
    : alerts;

  // ------------------------------
  // RENDER
  // ------------------------------
  return (
    <div className="relative max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Alerts</h1>

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

      {/* EMPTY STATE */}
      {!loading && filteredAlerts.length === 0 && (
        <p className="text-neutral-500">No alerts to display.</p>
      )}

      {/* ALERT LIST */}
      {filteredAlerts.length > 0 && (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => openAlert(alert)}
              className={`cursor-pointer bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3 hover:border-neutral-600 transition ${
                alert.acknowledged ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">
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

              <p className="text-neutral-300">{alert.message}</p>

              <p className="text-xs text-neutral-500">
                Source: {alert.source}
              </p>

              {!alert.acknowledged ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    acknowledgeAlert(alert.id);
                  }}
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

      {/* SIDE PANEL — CORRELATED EVENT VIEW */}
      {selectedAlert && (
        <div className="fixed top-0 right-0 w-96 h-full bg-neutral-950 border-l border-neutral-800 shadow-2xl p-6 overflow-y-auto">
          <button
            onClick={closePanel}
            className="text-neutral-400 hover:text-white mb-6"
          >
            Close
          </button>

          <h2 className="text-xl font-bold text-white mb-4">
            Alert Details
          </h2>

          <pre className="text-sm text-neutral-400 bg-neutral-900 p-3 rounded-lg overflow-x-auto mb-8">
            {JSON.stringify(selectedAlert, null, 2)}
          </pre>

          <h2 className="text-xl font-bold text-white mb-4">
            Correlated Event
          </h2>

          {!correlatedEvent && (
            <p className="text-neutral-500">
              No correlated event found.
            </p>
          )}

          {correlatedEvent && (
            <pre className="text-sm text-neutral-400 bg-neutral-900 p-3 rounded-lg overflow-x-auto">
              {JSON.stringify(correlatedEvent, null, 2)}
            </pre>
          )}

          <a
            href="/systems/events"
            className="inline-block mt-6 px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 hover:border-neutral-500"
          >
            View Full Event Feed →
          </a>
        </div>
      )}

    </div>
  );
}
