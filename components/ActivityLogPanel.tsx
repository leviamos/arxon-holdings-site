"use client";

import { useEffect, useState } from "react";
import ArxonCard from "@/components/ArxonCard";

export default function ActivityLogPanel() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      const res = await fetch("/api/logs/list");
      const json = await res.json();
      setLogs(json.logs || []);
    } catch (err) {
      console.error("Failed to load logs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLogs();

    const interval = setInterval(() => {
      loadLogs();
    }, 3000); // auto-refresh

    return () => clearInterval(interval);
  }, []);

  const levelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      case "agent":
        return "text-blue-400";
      case "system":
        return "text-purple-400";
      default:
        return "text-neutral-300";
    }
  };

  return (
    <ArxonCard title="Activity Logs">
      {loading && (
        <p className="text-neutral-400">Loading logs…</p>
      )}

      {!loading && logs.length === 0 && (
        <p className="text-neutral-500">No logs yet.</p>
      )}

      {!loading && logs.length > 0 && (
        <div className="h-80 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {logs.map((log, i) => (
            <div
              key={i}
              className="border-b border-neutral-800 pb-2 last:border-none"
            >
              <div className={`font-semibold ${levelColor(log.level)}`}>
                {log.level.toUpperCase()}
              </div>
              <div className="text-neutral-200 text-sm whitespace-pre-wrap">
                {log.message}
              </div>
              <div className="text-neutral-500 text-xs">
                {log.timestamp}
              </div>
              {log.meta && (
                <pre className="text-neutral-400 text-xs mt-1 whitespace-pre-wrap">
                  {JSON.stringify(log.meta, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </ArxonCard>
  );
}
