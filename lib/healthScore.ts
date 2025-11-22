/**
 * Health Score Engine
 *
 * Produces a 0–100 health score using:
 * - Latency
 * - CPU
 * - Memory
 * - Workload
 * - Heartbeat age
 */

export function computeHealthScore(system: any): number {
  if (!system) return 0;

  const metrics = system.metrics || {};

  // Normalize values to 0–1 ranges
  const latency = metrics.latency ? Math.min(metrics.latency / 200, 1) : 0;
  const cpu = metrics.cpu ? Math.min(metrics.cpu, 1) : 0;
  const workload = metrics.workload
    ? Math.min(metrics.workload / 10, 1)
    : 0;
  const memory = metrics.memory
    ? Math.min(metrics.memory / 1000, 1)
    : 0;

  // Heartbeat recency
  let heartbeatPenalty = 0;
  if (system.last_heartbeat) {
    const last = new Date(system.last_heartbeat).getTime();
    const now = Date.now();
    const diff = now - last;

    // If heartbeat older than 15 seconds, score drops significantly
    heartbeatPenalty = diff > 15000 ? 1 : diff / 15000;
  }

  // Weighted scoring model
  const score =
    100 -
    (latency * 20 +
      cpu * 25 +
      memory * 15 +
      workload * 20 +
      heartbeatPenalty * 20);

  return Math.max(0, Math.min(100, Math.round(score)));
}
