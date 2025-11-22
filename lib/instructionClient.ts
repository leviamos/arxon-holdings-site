// Fetch the current instruction history
export async function getInstructionHistory() {
  try {
    const res = await fetch("/api/agent/instructions");
    return await res.json();
  } catch (err: any) {
    return {
      error: "Failed to load instruction history.",
      details: err?.message || null,
    };
  }
}

// Store a new instruction
export async function storeInstruction(instruction: string) {
  try {
    const res = await fetch("/api/agent/instructions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instruction,
        timestamp: new Date().toISOString(),
      }),
    });

    return await res.json();
  } catch (err: any) {
    return {
      error: "Failed to store instruction.",
      details: err?.message || null,
    };
  }
}
