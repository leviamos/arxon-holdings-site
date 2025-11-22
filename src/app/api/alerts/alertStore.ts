/**
 * Alert Store
 *
 * Stores system alerts based on critical events.
 * Alerts are separate from events because:
 * - Alerts are user-facing
 * - Alerts may require action
 * - Alerts persist longer
 *
 * Default: 100 alerts stored.
 */

interface AlertEntry {
  id: string;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  message: string;
  source: string;     // subsystem id
  details?: any;
}

class AlertStore {
  private alerts: AlertEntry[] = [];
  private maxAlerts = 100;

  addAlert(entry: Omit<AlertEntry, "id" | "timestamp">) {
    const alert: AlertEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...entry
    };

    this.alerts.push(alert);

    if (this.alerts.length > this.maxAlerts) {
      this.alerts.shift(); // drop oldest
    }
  }

  getAlerts() {
    return this.alerts;
  }

  clear() {
    this.alerts = [];
  }
}

const alertStore = new AlertStore();
export default alertStore;
