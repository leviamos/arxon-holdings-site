/**
 * Alert Dispatcher
 *
 * Sends alerts to external systems:
 * - Slack
 * - Email (via n8n or service)
 * - SMS (Twilio)
 * - Any webhook
 *
 * This is the generic outbound pipeline. Specific providers are added later.
 */

export interface DispatchConfig {
  slackWebhookUrl?: string;
  emailWebhookUrl?: string;
  smsWebhookUrl?: string;
  genericWebhookUrl?: string;
}

let dispatchConfig: DispatchConfig = {};

export function configureAlertDispatch(config: DispatchConfig) {
  dispatchConfig = config;
}

export async function dispatchAlert(alert: any) {
  const payload = {
    timestamp: alert.timestamp,
    severity: alert.severity,
    message: alert.message,
    source: alert.source,
    details: alert.details || null,
  };

  // Helper to send POST safely
  const safePost = async (url?: string) => {
    if (!url) return;
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Failed to dispatch alert:", err);
    }
  };

  // Dispatch to enabled endpoints
  await Promise.all([
    safePost(dispatchConfig.slackWebhookUrl),
    safePost(dispatchConfig.emailWebhookUrl),
    safePost(dispatchConfig.smsWebhookUrl),
    safePost(dispatchConfig.genericWebhookUrl),
  ]);
}
