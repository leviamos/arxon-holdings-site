"use client";

import { useEffect, useState } from "react";

export default function ArxonConsole() {
  const [apiKey, setApiKey] = useState("");
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved key from localStorage (browser only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("arxon_console_key");
      if (stored) {
        setApiKey(stored);
        setIsKeySaved(true);
      }
    }
  }, []);

  const saveKey = () => {
    if (!apiKey.trim()) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("arxon_console_key", apiKey.trim());
    }
    setApiKey(apiKey.trim());
    setIsKeySaved(true);
    setError("");
  };

  const clearKey = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("arxon_console_key");
    }
    setApiKey("");
    setIsKeySaved(false);
  };

  const sendCommand = async () => {
    setError("");

    if (!apiKey) {
      setError("Enter your Arxon owner key first.");
      return;
    }

    if (!input.trim()) {
      setError("Type an instruction for the agent.");
      return;
    }

    setLoading(true);
    const message = input.trim();
    setInput("");

    // optimistic log entry
    const entryId = Date.now().toString();
    setLogs((prev) => [
      {
        id: entryId,
        role: "you",
        content: message,
        ts: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-arxon-key": apiKey,
        },
        body: JSON.stringify({ message }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      setLogs((prev) => [
        {
          id: entryId + "-res",
          role: res.ok ? "agent" : "error",
          content: typeof data === "string" ? data : JSON.stringify(data, null, 2),
          ts: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      if (!res.ok) {
        setError("Agent returned an error. Check logs below.");
      }
    } catch (err) {
      console.error(err);
      setError("Request failed. Check console/network.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendCommand();
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Arxon Operator Console
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Private control surface for orchestrating ventures, automations & AI systems.
            </p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/40">
            INTERNAL
          </span>
        </div>

        {/* Key / security bar */}
        <div className="mb-5 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400 mb-1">
              Arxon owner key (never share this)
            </p>
            <input
              type={isKeySaved ? "password" : "text"}
              className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/60"
              value={apiKey}
              placeholder="Enter ARXON_AGENT_KEY value"
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveKey}
              className="px-3 py-2 text-xs rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
            >
              Save
            </button>
            {isKeySaved && (
              <button
                onClick={clearKey}
                className="px-3 py-2 text-xs rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Command input */}
        <div className="mb-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
          <p className="text-xs text-gray-400 mb-2">
            Instruction to Arxon Agent
          </p>
          <textarea
            className="w-full bg-black/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-gray-100 outline-none focus:ring-2 focus:ring-emerald-500/60"
            rows={3}
            placeholder={
              loading
                ? "Waiting for agent..."
                : "Example: Design the workflow to register a new venture entity in jurisdiction X, purchase domains, and scaffold a site using the Arxon stack..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="mt-2 flex justify-between items-center gap-3">
            {error && (
              <span className="text-xs text-red-400">
                {error}
              </span>
            )}
            <button
              onClick={sendCommand}
              disabled={loading}
              className="ml-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-black text-xs font-semibold flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Running
                </>
              ) : (
                <>Send to Agent</>
              )}
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="space-y-2">
          {logs.length === 0 && (
            <div className="text-xs text-gray-500 border border-dashed border-zinc-700 rounded-2xl p-4 text-center">
              No activity yet. Use this console to instruct your backend agent to design,
              coordinate, or execute workflows for Arxon initiatives.
            </div>
          )}

          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-2xl text-xs whitespace-pre-wrap border ${
                log.role === "you"
                  ? "bg-zinc-900 border-zinc-800"
                  : log.role === "agent"
                  ? "bg-emerald-500/5 border-emerald-500/40"
                  : "bg-red-500/5 border-red-500/40"
              }`}
            >
              <div className="flex justify-between mb-1">
                <span
                  className={`font-semibold ${
                    log.role === "you"
                      ? "text-gray-300"
                      : log.role === "agent"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {log.role === "you"
                    ? "You"
                    : log.role === "agent"
                    ? "Arxon Agent"
                    : "Error"}
                </span>
                <span className="text-[10px] text-gray-500">
                  {log.ts}
                </span>
              </div>
              <div className="text-gray-200">
                {log.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
