/**
 * MetricsStore
 *
 * Keeps a rolling history of metrics for each subsystem.
 * Used for charts, trend analysis, and anomaly detection.
 *
 * Default history length: 50 data points per subsystem.
 */

interface MetricEntry {
  timestamp: string;
  data: any;
}

class MetricsStore {
  private store: Record<string, MetricEntry[]> = {};
  private maxEntries = 50;

  addMetric(id: string, data: any) {
    if (!this.store[id]) {
      this.store[id] = [];
    }

    this.store[id].push({
      timestamp: new Date().toISOString(),
      data,
    });

    // enforce rolling limit
    if (this.store[id].length > this.maxEntries) {
      this.store[id].shift();
    }
  }

  getMetrics(id: string) {
    return this.store[id] || [];
  }

  getAll() {
    return this.store;
  }
}

const metricsStore = new MetricsStore();
export default metricsStore;
