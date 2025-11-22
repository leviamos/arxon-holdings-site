import { sendLog } from "@/lib/logClient";
import { storeInstruction } from "@/lib/instructionClient";

export async function sendInstructionToAgent(instruction: string) {
  // Store in instruction history
  await storeInstruction(instruction);

  // Log the instruction
  await sendLog("agent", "Instruction sent to agent", {
    instruction,
  });

  // Relay to main agent API
  try {
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "arxon-access-key": "Arxon_owner_281083",
      },
      body: JSON.stringify({
        instruction,
        timestamp: Date.now(),
      }),
    });

    return await res.json();
  } catch (err: any) {
    await sendLog("error", "Failed to reach agent endpoint", {
      error: err?.message || null,
      instruction,
    });

    return {
      error: "Agent request failed.",
      details: err?.message || null,
    };
  }
}
