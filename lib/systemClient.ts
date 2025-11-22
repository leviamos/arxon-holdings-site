// Fetch full system list
export async function getSystems() {
  try {
    const res = await fetch("/api/systems");
    return await res.json();
  } catch (err: any) {
    return {
      error: "Failed to load systems.",
      details: err?.message || null,
    };
  }
}

// Register or update a subsystem
export async function registerSystem(system: {
  id: string;
  name: string;
  status?: string;
  description?: string;
}) {
  try {
    const res = await fetch("/api/systems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(system),
    });

    return await res.json();
  } catch (err: any) {
    return {
      error: "Failed to register system.",
      details: err?.message || null,
    };
  }
}
