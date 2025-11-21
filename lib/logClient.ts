export async function sendLog(
  level: "info" | "warn" | "error" | "agent" | "system",
  message: string,
  meta?: any
) {
  try {
    const res = await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        level,
        message,
        meta: meta || null
      })
    });

    return await res.json();
  } catch (err: any) {
    return {
      error: "Failed to send log entry.",
      details: err?.message || null
    };
  }
}
