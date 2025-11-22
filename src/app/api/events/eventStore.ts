/**
 * Global Event Store
 *
 * Stores system-wide events such as:
 * - subsystem status changes
 * - health degradation or recovery
 * - orchestrator actions
 * - metrics anomalies
 * - user/admin actions
 *
 * This is a rolling in-memory log (default: 200 entries).
 */

interface EventEntry {
  timestamp: string;
  type: string;       // e.g., "subsystem-offline", "health-recovered", "metrics-update", etc.
  message: string;    // human-readable summary
  details?: any;      // optional structured data
}

class EventStore {
  private events: EventEntry[] = [];
  private maxEvents = 200;

  addEvent(type: string, message: string, details?: any) {
    this.events.push({
      timestamp: new Date().toISOString(),
      type,
      message,
      details: details || null
    });

    if (this.events.length > this.maxEvents) {
      this.events.shift(); // drop oldest
    }
  }

  getEvents() {
    return this.events;
  }

  getEventsByType(type: string) {
    return this.events.filter((e) => e.type === type);
  }

  clear() {
    this.events = [];
  }
}

const eventStore = new EventStore();
export default eventStore;
