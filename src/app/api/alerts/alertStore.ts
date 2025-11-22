import { dispatchAlert } from "@/lib/alertDispatcher";

interface AlertEntry {
  id: string;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  message: string;
  source: string;
  details?: any;
  acknowledged: boolean;
  acknowledgedAt?: string;
  correlationId?: string;
}

class AlertStore {
  private alerts: AlertEntry[] = [];
  private maxAlerts = 100;

  addAlert(
    entry: Omit<
      AlertEntry,
      "id" | "timestamp" | "acknowledged" | "acknowledgedAt"
    >
  ) {
    const alert: AlertEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      acknowledged: false,
      ...entry,
    };

    this.alerts.push(alert);

    if (this.alerts.length > this.maxAlerts) {
      this.alerts.shift();
    }

    // Outbound dispatch
    dispatchAlert(alert).catch(() => {});
  }

  getAlerts() {
    return this.alerts;
  }

  acknowledgeAlert(id: string) {
    const alert = this.alerts.find((a) => a.id === id);
    if (!alert) return false;

    alert.acknowledged = true;
    alert.acknowledgedAt = new Date().toISOString();

    return true;
  }

  clear() {
    this.alerts = [];
  }
}

const alertStore = new AlertStore();
export default alertStore;
