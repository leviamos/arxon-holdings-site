export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      <h1 className="text-3xl font-bold tracking-tight">
        Settings
      </h1>

      <p className="text-neutral-400">
        Configure Arxon Intelligence platform behaviour, environment preferences, 
        and global operational controls. Additional settings modules will be added 
        as the system expands.
      </p>

      <div className="space-y-6">

        {/* General Settings */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-neutral-100 mb-3">
            General Platform Settings
          </h2>
          <p className="text-neutral-400 text-sm">
            Core configuration options will appear here.
          </p>
        </section>

        {/* Security Section */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-neutral-100 mb-3">
            Security & Access Control
          </h2>
          <p className="text-neutral-400 text-sm">
            Authentication, API keys, and access control configuration will be housed here.
          </p>
        </section>

        {/* UI Preferences */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-neutral-100 mb-3">
            UI & Display Preferences
          </h2>
          <p className="text-neutral-400 text-sm">
            Interface layout, theme customisation, and user experience preferences will be added.
          </p>
        </section>

      </div>
    </div>
  );
}
