"use client";

import eventStore from "@/app/api/events/eventStore";
import { computeHealthScore } from "@/lib/healthScore";

interface PollResult {
  data?: any;
  error?: string;
}

const lastStatus: Record<string, string> = {};
const lastHealth: Record<string, number> = {};

export function startHealthPoller(
  id: string,
  callback: (result: PollResult) => void,
  interval = 5000
) {
  async function poll() {
    try {
      const res = await fetch(`/api/systems/${id}`);
      const json = await res.json();

      if (!json || !json.system) {
        callback({ error: "Invalid response" });
        return;
      }

      const system = json.system;
      const currentStatus = system.status;
      const currentHealth = computeHealthScore(system);

      // --- EVENT: STATUS CHANGE ---
      if (lastStatus[id] && lastStatus[id] !== currentStatus) {
        if (currentStatus === "online") {
          eventStore.addEvent(
            "subsystem-online",
            `${system.name} is now ONLINE`,
            { id, status: currentStatus }
          );
        } else if (currentStatus === "offline") {
          eventStore.addEvent(
            "subsystem-offline",
            `${system.name} is now OFFLINE`,
            { id, status: currentStatus }
          );
        }
      }

      // --- EVENT: HEALTH CHANGE ---
      if (lastHealth[id] !== undefined) {
        if (currentHealth < 50 && lastHealth[id] >= 50) {
          eventStore.addEvent(
            "subsystem-critical",
            `${system.name} entered CRITICAL health (${currentHealth}).`,
            { id, health: currentHealth }
          );
        } else if (currentHealth < 80 && lastHealth[id] >= 80) {
          eventStore.addEvent(
            "subsystem-degraded",
            `${system.name} became DEGRADED (${currentHealth}).`,
            { id, health: currentHealth }
          );
        } else if (currentHealth >= 80 && lastHealth[id] < 80) {
          eventStore.addEvent(
            "subsystem-recovered",
            `${system.name} recovered to HEALTHY (${currentHealth}).`,
            { id, health: currentHealth }
          );
        }
      }

      // --- UPDATE TRACKED VALUES ---
      lastStatus[id] = currentStatus;
      lastHealth[id] = currentHealth;

      callback({ data: system });

    } catch (err: any) {
      callback({ error: "Failed to poll health" });
    }
  }

  poll();
  const handle = setInterval(poll, interval);

  return () => clearInterval(handle);
}
