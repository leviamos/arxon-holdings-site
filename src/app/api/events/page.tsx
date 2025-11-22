"use client";

import { useEffect, useState } from "react";

export default function EventFeedPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () =>
    {
    try {
      const res = await fetch("/api/events");
      const json = await res.json();

      if (json.events) {
        // Newest events at top
        setEvents([...json.events].reverse());
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
    const interval = setInterval(loadEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const typeColor = (type: string) => {
    if (type.includes("offline") || type.includes("critical"))
      return "text-red-400";
    if (type.includes("degraded") || type.includes("warn"))
      return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

      <h1 className="text-3xl font-bold tracking-tight text-white">
        Event Feed
      </h1>

      <p className="text-neutral-400 text-sm">
        Real-time system events, logs, warnings, and state changes.
      </p>

      {loading && (
        <p className="text-neutral-400">Loading events…</p>
      )}

      {!loading && events.length === 0 && (
        <p className="text-neutral-400">No events logged yet.</p>
      )}

      {events.length > 0 && (
        <div className="space-y-4">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${typeColor(event.type)}`}>
                  {event.type}
                </span>
                <span className="text-xs text-neutral-500">
                  {event.timestamp}
                </span>
              </div>

              <p className="text-neutral-300 text-sm mb-2">
                {event.message}
              </p>

              {event.details && (
                <pre className="text-xs text-neutral-500 bg-neutral-950 p-3 rounded-lg overflow-x-auto border border-neutral-800">
                  {JSON.stringify(event.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
