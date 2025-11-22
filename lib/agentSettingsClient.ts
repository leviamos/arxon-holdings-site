export async function getAgentSettings() {
  try {
    const res = await fetch("/api/agent/settings");
    return await res.json();
  } catch (err: any) {
    return {
      error: "Failed to load agent settings.",
      details: err?.message || null
    };
  }
}

export async function updateAgentSettings(data: any) {
  try {
    const res = await fetch("/api/agent/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (err: any) {
    return {
      error: "Failed to update agent settings.",
      details: err?.message || null
    };
  }
}
