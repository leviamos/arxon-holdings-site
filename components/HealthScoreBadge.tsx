"use client";

export default function HealthScoreBadge({ score }: { score: number }) {
  let color = "bg-red-600";
  let label = "Critical";

  if (score >= 80) {
    color = "bg-green-600";
    label = "Healthy";
  } else if (score >= 50) {
    color = "bg-yellow-500";
    label = "Degraded";
  }

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${color}`}
    >
      {label} — {score}
    </div>
  );
}
