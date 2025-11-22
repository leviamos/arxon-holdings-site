import alertStore from "@/app/api/alerts/alertStore";
import { generateCorrelationId } from "@/lib/correlation";

interface EventEntry {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  details?: any;
  correlationId?: string;
}

class EventStore {
  private events: EventEntry[] = [];
  private maxEvents = 200;

  addEvent(type: string, message: string, details?: any) {
    const correlationId = generateCorrelationId();

    const entry: EventEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
      message,
      details: details || null,
      correlationId,
    };

    this.events.push(entry);

    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    // Forward correlation ID to alert system
    this.forwardToAlerts(type, message, details, correlationId);

    return entry;
  }

  forwardToAlerts(
    type: string,
    message: string,
    details: any,
    correlationId: string
  ) {
    // Map between event types and alert types
    if (type === "subsystem-offline") {
      alertStore.addAlert({
        severity: "critical",
        message,
        source: details?.id || "unknown",
        details,
        correlationId,
      });
    }

    if (type === "subsystem-critical") {
      alertStore.addAlert({
        severity: "critical",
        message,
        source: details?.id || "unknown",
        details,
        correlationId,
      });
    }

    if (type === "subsystem-degraded") {
      alertStore.addAlert({
        severity: "warning",
        message,
        source: details?.id || "unknown",
        details,
        correlationId,
      });
    }

    if (type === "subsystem-recovered") {
      alertStore.addAlert({
        severity: "info",
        message,
        source: details?.id || "unknown",
        details,
        correlationId,
      });
    }
  }

  getEvents() {
    return this.events;
  }
}

const eventStore = new EventStore();
export default eventStore;
