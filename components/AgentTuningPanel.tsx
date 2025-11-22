"use client";

import { useEffect, useState } from "react";
import ArxonCard from "@/components/ArxonCard";
import {
  getAgentSettings,
  updateAgentSettings,
} from "@/lib/agentSettingsClient";

export default function AgentTuningPanel() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getAgentSettings();
      setSettings(data.settings);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    const updated = await updateAgentSettings(settings);

    if (updated.settings) {
      setSettings(updated.settings);
    }

    setSaving(false);
  };

  if (!settings) {
    return (
      <ArxonCard title="Agent Tuning">
        <p className="text-neutral-400">Loading agent settings…</p>
      </ArxonCard>
    );
  }

  return (
    <ArxonCard title="Agent Tuning">
      <div className="space-y-6 text-sm">

        {/* Autonomy Toggle */}
        <div>
          <label className="font-semibold text-neutral-200">
            Autonomy Enabled
          </label>
          <div className="mt-2">
            <input
              type="checkbox"
              checked={settings.autonomy_enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  autonomy_enabled: e.target.checked,
                })
              }
              className="h-4 w-4"
            />
          </div>
        </div>

        {/* Temperature */}
        <div>
          <label className="font-semibold text-neutral-200">
            Temperature ({settings.temperature})
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={settings.temperature}
            onChange={(e) =>
              setSettings({
                ...settings,
                temperature: parseFloat(e.target.value),
              })
            }
            className="w-full mt-2"
          />
        </div>

        {/* Max Tokens */}
        <div>
          <label className="font-semibold text-neutral-200">
            Max Tokens
          </label>
          <input
            type="number"
            value={settings.max_tokens}
            min={128}
            max={64000}
            onChange={(e) =>
              setSettings({
                ...settings,
                max_tokens: parseInt(e.target.value, 10),
              })
            }
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 mt-2"
          />
        </div>

        {/* System Prompt */}
        <div>
          <label className="font-semibold text-neutral-200">
            System Prompt
          </label>
          <textarea
            value={settings.system_prompt}
            onChange={(e) =>
              setSettings({
                ...settings,
                system_prompt: e.target.value,
              })
            }
            className="w-full h-28 bg-neutral-900 border border-neutral-700 rounded-lg p-3 mt-2 resize-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-3 rounded-lg bg-neutral-100 text-neutral-900 font-semibold hover:bg-white transition-colors ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </ArxonCard>
  );
}
