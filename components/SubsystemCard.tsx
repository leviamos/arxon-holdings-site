"use client";

import Link from "next/link";
import HealthScoreBadge from "@/components/HealthScoreBadge";
import { computeHealthScore } from "@/lib/healthScore";

export default function SubsystemCard({
  id,
  name,
  status,
  description,
  metrics
}: {
  id: string;
  name: string;
  status: string;
  description?: string;
  metrics?: any;
}) {

  const score = computeHealthScore({
    status,
    metrics,
    last_heartbeat: metrics?.last_updated
  });

  const statusColor = (s: string) =>
    s === "online"
      ? "text-green-400"
      : s === "offline"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <Link
      href={`/systems/${id}`}
      className="block bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">{name}</h2>

        {/* NEW: Health Score Badge */}
        <HealthScoreBadge score={score} />
      </div>

      <p className="text-sm text-neutral-400 mb-3">
        <span className="text-neutral-500">Status: </span>
        <span className={statusColor(status)}>{status}</span>
      </p>

      <p className="text-neutral-500 text-sm line-clamp-2">
        {description || "No description available."}
      </p>
    </Link>
  );
}
