import { dispatchAlert } from "@/lib/alertDispatcher";

interface AlertEntry {
  id: string;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  message: string;
  source: string;
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
      this.alerts.shift();
    }

    // 🔥 AUTO-DISPATCH ALERT
    dispatchAlert(alert).catch(() => { /* avoid breaking alert pipeline */ });
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
