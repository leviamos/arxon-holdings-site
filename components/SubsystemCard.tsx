import React from "react";

interface SubsystemCardProps {
  id: string;
  name: string;
  status: string;
  description?: string;
}

export default function SubsystemCard({
  id,
  name,
  status,
  description,
}: SubsystemCardProps) {
  const statusColor =
    status === "online"
      ? "text-green-400"
      : status === "offline"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div
      key={id}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-2 panel fade-in"
    >
      <h2 className="text-xl font-semibold text-neutral-100">
        {name}
      </h2>

      <div className="text-sm text-neutral-400">
        {description || "No description available."}
      </div>

      <div className="mt-3 text-sm">
        <span className="text-neutral-500">Status: </span>
        <span className={statusColor}>{status}</span>
      </div>
    </div>
  );
}
