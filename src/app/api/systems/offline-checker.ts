/**
 * Subsystem Offline Checker
 *
 * Runs automatically when imported.
 * Marks subsystems as "offline" if no heartbeat is received within
 * a defined timeout window (default: 15 seconds).
 */

import systemsData from "@/app/api/systems/store";

const TIMEOUT_MS = 15000; // 15 seconds
let checkerStarted = false;

function startOfflineChecker() {
  if (checkerStarted) return;
  checkerStarted = true;

  const check = () => {
    const now = Date.now();

    systemsData.systems.forEach((sys) => {
      if (!sys.last_heartbeat) return;

      const last = new Date(sys.last_heartbeat).getTime();
      const diff = now - last;

      if (diff > TIMEOUT_MS) {
        sys.status = "offline";
      }
    });

    setTimeout(check, 5000); // run every 5 seconds
  };

  check();
}

startOfflineChecker();
