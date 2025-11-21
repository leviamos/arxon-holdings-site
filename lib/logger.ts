type LogLevel = "info" | "warn" | "error" | "agent" | "system";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  meta?: any;
}

export function arxonLog(
  level: LogLevel,
  message: string,
  meta?: any
) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    meta: meta || null,
  };

  // Dev-mode console output
  if (process.env.NODE_ENV !== "production") {
    console.log(`[ARXON][${entry.level.toUpperCase()}]`, entry);
  }

  // Placeholder: Future expansion for DB or n8n log streaming.
  // Example:
  // await fetch("/api/logs/stream", { ... });

  return entry;
}
