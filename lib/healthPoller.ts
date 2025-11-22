/**
 * Polls subsystem health at a fixed interval.
 *
 * @param id        Subsystem ID as registered in /api/systems
 * @param interval  Polling interval in milliseconds (default: 5000)
 * @param callback  Function invoked with latest { data, error }
 *
 * Returns: cleanup function to stop polling
 */
export function startHealthPoller(
  id: string,
  callback: (result: { data: any | null; error: any | null }) => void,
  interval: number = 5000
) {
  let active = true;

  const poll = async () => {
    if (!active) return;

    try {
      const res = await fetch(`/api/systems/${id}`);
      const json = await res.json();

      if (json.system) {
        callback({ data: json.system, error: null });
      } else {
        callback({
          data: null,
          error: json.error || "Unknown subsystem error",
        });
      }
    } catch (err: any) {
      callback({
        data: null,
        error: err.message || "Failed to fetch subsystem health",
      });
    }

    if (active) {
      setTimeout(poll, interval);
    }
  };

  // Start immediately
  poll();

  // Stop polling
  return () => {
    active = false;
  };
}
