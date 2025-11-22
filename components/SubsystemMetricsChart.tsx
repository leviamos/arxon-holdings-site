"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function SubsystemMetricsChart({ subsystemId }: { subsystemId: string }) {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      const res = await fetch(`/api/systems/${subsystemId}/metrics/history`);
      const json = await res.json();

      if (json.history) {
        const formatted = json.history.map((entry: any) => ({
          time: entry.timestamp,
          latency: entry.data.latency,
          cpu: entry.data.cpu,
          memory: entry.data.memory,
          workload: entry.data.workload
        }));
        setHistory(formatted);
        setError(null);
      } else {
        setError("No history found");
      }
    } catch (err) {
      setError("Failed to fetch metrics history");
    }
  };

  useEffect(() => {
    loadHistory();
    const interval = setInterval(loadHistory, 5000);
    return () => clearInterval(interval);
  }, [subsystemId]);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-neutral-100">
        Metrics Trend (Live)
      </h2>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {!error && history.length === 0 && (
        <p className="text-neutral-500 text-sm">Waiting for metrics…</p>
      )}

      {history.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#888" tick={false} />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
              labelStyle={{ color: "#ccc" }}
            />
            <Line type="monotone" dataKey="latency" stroke="#4ade80" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="cpu" stroke="#60a5fa" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="memory" stroke="#facc15" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="workload" stroke="#fb7185" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
