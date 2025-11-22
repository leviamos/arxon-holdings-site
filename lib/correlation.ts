/**
 * Correlation Utility
 *
 * Generates correlation IDs for linking events <-> alerts.
 */

export function generateCorrelationId(): string {
  return crypto.randomUUID();
}
