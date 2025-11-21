"use client";

import { useState } from "react";

export default function ConsolePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const sendToAgent = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);

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
      setResponse(data);
    } catch (err: any) {
      setResponse({ error: err.message || "Failed to reach agent." });
    }

    setLoading(false);
  };

  return (
    <main className="w-full min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold tracking-tight">
            Arxon Intelligence Console
          </h1>
          <p className="text-neutral-400 mt-1">
            Direct command interface for the Arxon orchestration layer.
          </p>
        </header>

        <section className="space-y-4">
          <textarea
            className="w-full h-40 bg-neutral-900 border border-neutral-700 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-600"
            placeholder="Enter instruction…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendToAgent}
            disabled={loading}
            className={`px-6 py-3 rounded-lg bg-neutral-100 text-neutral-900 font-semibold hover:bg-white transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing…" : "Execute"}
          </button>
        </section>

        {response && (
          <section className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 whitespace-pre-wrap text-sm">
            <h3 className="text-lg font-semibold mb-2">Response</h3>
            <pre className="text-neutral-300">
{JSON.stringify(response, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
