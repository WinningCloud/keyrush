import React from 'react';
import { Settings as SettingsIcon, Volume2, Monitor, Code, User, Bell } from 'lucide-react';

const Settings = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-6">
      {/* SIMPLE HEADER */}
      <div className="mb-12">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
          <SettingsIcon size={24} /> CONFIGURATION
        </h1>
        <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-[0.2em] mt-1">
          Adjust system preferences and neural link parameters
        </p>
      </div>

      <div className="space-y-1 bg-[#0b0e14] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        
        {/* INTERFACE SECTION */}
        <div className="px-8 py-6 border-b border-white/5">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Monitor size={14} /> Interface & Audio
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-200">Mechanical Key Sounds</p>
                <p className="text-[11px] text-zinc-500">Play tactile audio feedback while typing</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-mono font-bold text-[#d4ff00] bg-[#d4ff00]/5 px-2 py-0.5 rounded border border-[#d4ff00]/20 uppercase">
                  Enabled
                </span>
                <div className="w-10 h-5 bg-[#d4ff00] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-200">Dynamic UI Glow</p>
                <p className="text-[11px] text-zinc-500">Enable neon accents based on performance</p>
              </div>
              <div className="w-10 h-5 bg-zinc-800 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* CODE PREFERENCES SECTION */}
        <div className="px-8 py-6 border-b border-white/5">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Code size={14} /> Snippet Engine
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Default Language</label>
              <select className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-[#d4ff00]/50 transition-all cursor-pointer">
                <option>JavaScript / TypeScript</option>
                <option>Python 3.10+</option>
                <option>Rust</option>
                <option>C++ / C</option>
                <option>Go</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Preferred Difficulty</label>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map((d) => (
                  <button key={d} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                    d === 'Medium' ? 'border-[#d4ff00] text-[#d4ff00] bg-[#d4ff00]/5' : 'border-white/5 text-zinc-500 hover:border-white/20'
                  }`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACCOUNT SECTION */}
        <div className="px-8 py-6">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <User size={14} /> Pilot Identity
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center font-black text-zinc-400">
                NP
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-200">NullPointer_</p>
                <p className="text-[10px] text-zinc-600 font-mono tracking-tighter">ID: KX-942-ALPHA</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
        <div>
          <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-1">Danger Zone</h4>
          <p className="text-[11px] text-zinc-600">Permanently delete your synchronization data and history.</p>
        </div>
        <button className="px-6 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          Reset Data
        </button>
      </div>
    </div>
  );
};

export default Settings;