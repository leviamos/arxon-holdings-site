/**
 * Updated Global Event Store — now with automatic alert binding.
 */

import alertStore from "@/app/api/alerts/alertStore";

interface EventEntry {
  timestamp: string;
  type: string;
  message: string;
  details?: any;
}

class EventStore {
  private events: EventEntry[] = [];
  private maxEvents = 200;

  addEvent(type: string, message: string, details?: any) {
    const entry: EventEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
      details: details || null
    };

    this.events.push(entry);

    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    // --- AUTOMATIC ALERT GENERATION ---
    if (type === "subsystem-offline") {
      alertStore.addAlert({
        severity: "critical",
        message,
        source: details?.id || "unknown",
        details
      });
    }

    if (type === "subsystem-critical") {
      alertStore.addAlert({
        severity: "critical",
        message,
        source: details?.id || "unknown",
        details
      });
    }

    if (type === "subsystem-degraded") {
      alertStore.addAlert({
        severity: "warning",
        message,
        source: details?.id || "unknown",
        details
      });
    }

    if (type === "subsystem-recovered") {
      alertStore.addAlert({
        severity: "info",
        message,
        source: details?.id || "unknown",
        details
      });
    }
  }

  getEvents() {
    return this.events;
  }
}

const eventStore = new EventStore();
export default eventStore;
