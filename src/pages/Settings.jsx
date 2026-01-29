import { Settings as SettingsIcon, Volume2, Monitor, Code } from 'lucide-react';

const Settings = () => {
  return (
    <div className="w-full max-w-3xl p-8">
      <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
        <SettingsIcon className="text-primary" /> Settings
      </h2>

      <div className="space-y-8">
        <section className="bg-surface p-8 rounded-3xl border border-white/5">
          <h3 className="text-muted text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
            <Monitor size={16} /> Interface
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">Mechanical Keyboard Sounds</p>
              <p className="text-muted text-sm italic text-primary">Coming Soon</p>
            </div>
            <div className="w-12 h-6 bg-primary/20 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full" />
            </div>
          </div>
        </section>

        <section className="bg-surface p-8 rounded-3xl border border-white/5">
          <h3 className="text-muted text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
            <Code size={16} /> Snippet Preferences
          </h3>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Primary Language</p>
              <select className="bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;