"use client";

import { useEffect, useState } from "react";
import ArxonCard from "@/components/ArxonCard";
import { getInstructionHistory } from "@/lib/instructionClient";

export default function InstructionHistoryPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const result = await getInstructionHistory();
      if (result.instructions) {
        setItems(result.instructions);
      }
    } catch (err) {
      console.error("Failed to load instruction history:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();

    const interval = setInterval(() => {
      loadHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ArxonCard title="Instruction History">
      {loading && <p className="text-neutral-400">Loading history…</p>}

      {!loading && items.length === 0 && (
        <p className="text-neutral-500">No instructions sent yet.</p>
      )}

      {!loading && items.length > 0 && (
        <div className="h-80 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {items.map((entry, i) => (
            <div
              key={i}
              className="border-b border-neutral-800 pb-2 last:border-none"
            >
              <div className="text-neutral-200 font-semibold">
                {entry.instruction}
              </div>
              <div className="text-neutral-500 text-xs mt-1">
                {entry.timestamp}
              </div>
            </div>
          ))}
        </div>
      )}
    </ArxonCard>
  );
}
