/**
 * Global Health Aggregator
 *
 * Computes a total platform health score by averaging
 * all subsystem health scores.
 */

import { computeHealthScore } from "@/lib/healthScore";
import systemsData from "@/app/api/systems/store";

export function computeGlobalHealth() {
  const systems = systemsData.systems;

  if (systems.length === 0) {
    return {
      score: 0,
      label: "No Subsystems",
      status: "unknown"
    };
  }

  const scores = systems.map((sys) => computeHealthScore(sys));
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  let label = "Critical";
  let status = "critical";

  if (avg >= 80) {
    label = "Healthy";
    status = "healthy";
  } else if (avg >= 50) {
    label = "Degraded";
    status = "degraded";
  }

  return {
    score: avg,
    label,
    status,
    subsystems: systems.length
  };
}
