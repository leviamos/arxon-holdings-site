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

  // Bar color
  let barColor = "bg-red-600";
  if (score >= 80) barColor = "bg-green-600";
  else if (score >= 50) barColor = "bg-yellow-500";

  const statusColor = (s: string) =>
    s === "online"
      ? "text-green-400"
      : s === "offline"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <Link
      href={`/systems/${id}`}
      className="block bg-neutral-900 border border-neutral-800 rounded-xl pb-6 hover:border-neutral-700 transition"
    >
      {/* NEW: status color bar */}
      <div className={`h-2 w-full rounded-t-xl ${barColor}`} />

      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-white">{name}</h2>

          {/* Health Score Badge */}
          <HealthScoreBadge score={score} />
        </div>

        <p className="text-sm text-neutral-400 mb-3">
          <span className="text-neutral-500">Status: </span>
          <span className={statusColor(status)}>{status}</span>
        </p>

        <p className="text-neutral-500 text-sm line-clamp-2">
          {description || "No description available."}
        </p>
      </div>
    </Link>
  );
}
