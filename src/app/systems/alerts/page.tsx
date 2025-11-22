"use client";

import { useEffect, useState } from "react";

interface EventEntry {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  details?: any;
  correlationId?: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [hideAcknowledged, setHideAcknowledged] = useState(false);

  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [correlatedEvent, setCorrelatedEvent] = useState<EventEntry | null>(null);

  // ------------------------------
  // LOAD DATA
  // ------------------------------
  const loadAlerts = async () => {
    try {
      const res = await fetch("/api/alerts");
      const json = await res.json();
      if (json.alerts) setAlerts([...json.alerts].reverse());
    } catch (err) {
      console.error("Failed to load alerts:", err);
    }
    setLoading(false);
  };

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const json = await res.json();
      if (json.events) setEvents(json.events);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  const refresh = async () => {
    await loadAlerts();
    await loadEvents();
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------
  // CLEAR & ACKNOWLEDGE
  // ------------------------------
  const clearAlerts = async () => {
    setClearing(true);
    try {
      await fetch("/api/alerts", { method: "DELETE" });
      setAlerts([]);
      setSelectedAlert(null);
      setCorrelatedEvent(null);
    } catch (err) {
      console.error("Failed to clear alerts:", err);
    }
    setClearing(false);
  };

  const acknowledgeAlert = async (id: string) => {
    try {
      await fetch(`/api/alerts/${id}/ack`, { method: "POST" });
      refresh();
    } catch (err) {
      console.error("Failed to acknowledge alert:", err);
    }
  };

  // ------------------------------
  // SELECT ALERT → LOAD CORRELATED EVENT
  // ------------------------------
  const openAlert = (alert: any) => {
    setSelectedAlert(alert);

    if (!alert.correlationId) {
      setCorrelatedEvent(null);
      return;
    }

    const event = events.find((e) => e.correlationId === alert.correlationId);
    setC
