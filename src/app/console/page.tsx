"use client";

import { useState } from "react";
import SystemStatusPanel from "@/components/SystemStatusPanel";
import ArxonCard from "@/components/ArxonCard";
import ActivityLogPanel from "@/components/ActivityLogPanel";
import AgentTuningPanel from "@/components/AgentTuningPanel";

export default function ConsoleDashboard() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);

  const sendInstruction = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "arxon-access-key": "Arxon_owner_281083"
        },
        body: JSON.stringify({
          instruction: input,
          timestamp: Date.now()
        })
      });

      const data = await res.json();
      setOutput(data);
    } catch (err: any) {
      setOutput({ error: err.message || "Failed to reach agent." });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-10">

      {/* System Status */}
      <SystemStatusPanel />

      {/* Direct Instruction Console */}
      <ArxonCard title="Direct Instruction Console">
        <div className="space-y-4">
          <textarea
            className="w-full h-36 bg-neutral-900 border border-neutral-700 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-600"
            placeholder="Enter instruction…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendInstruction}
            disabled={loading}
            className={`px-6 py-3 rounded-lg bg-neutral-100 text-neutral-900 font-semibold hover:bg-white transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing…" : "Send Instruction"}
          </button>

          {output && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mt-4 text-sm text-neutral-300 whitespace-pre-wrap">
              <h3 className="font-semibold text-neutral-100 mb-2">
                Agent Response
              </h3>
              <pre>{JSON.stringify(output, null, 2)}</pre>
            </div>
          )}
        </div>
      </ArxonCard>

      {/* Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left: Activity Logs */}
        <ActivityLogPanel />

        {/* Right: Agent Tuning */}
        <AgentTuningPanel />

      </div>
    </div>
  );
}
