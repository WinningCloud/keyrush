import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Flame, Terminal, 
  ChevronRight, Layers, Code2, Cpu 
} from 'lucide-react';
import { SNIPPETS } from '../data/snippets';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDiff, setActiveDiff] = useState('All');
  const [activeLang, setActiveLang] = useState('All');

  const languages = useMemo(() => ['All', ...new Set(SNIPPETS.map(s => s.language))], []);
  const dailyChallenge = useMemo(() => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)], []);

  // Filter and then Group by Difficulty
  const groupedSnippets = useMemo(() => {
    const filtered = SNIPPETS.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.language.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiff = activeDiff === 'All' || s.difficulty === activeDiff;
      const matchesLang = activeLang === 'All' || s.language === activeLang;
      return matchesSearch && matchesDiff && matchesLang;
    });

    return {
      Easy: filtered.filter(s => s.difficulty === 'Easy'),
      Medium: filtered.filter(s => s.difficulty === 'Medium'),
      Hard: filtered.filter(s => s.difficulty === 'Hard'),
    };
  }, [searchQuery, activeDiff, activeLang]);

  const difficultyStyles = {
    Easy: "border-l-[#00ff88] text-[#00ff88]",
    Medium: "border-l-[#ffdd00] text-[#ffdd00]",
    Hard: "border-l-[#ff0055] text-[#ff0055]"
  };

  return (
    <div className="w-full  mx-auto p-6 md:p-10 text-white font-sans min-h-screen bg-[#06080c]">
      
      {/* HEADER SECTION */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              DASHBOARD<span className="text-[#d4ff00]">.</span>
            </h1>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
              Select a module to begin training
            </p>
          </div>

          {/* SEARCH BOX */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#d4ff00]/50 transition-all font-mono text-sm"
            />
          </div>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-8 mb-12 pb-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Difficulty</span>
          <div className="flex bg-zinc-900/80 p-1 rounded-lg border border-white/5">
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDiff(diff)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeDiff === diff ? "bg-zinc-800 text-[#d4ff00] shadow-sm" : "text-zinc-500 hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Language</span>
          <div className="flex flex-wrap gap-2">
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  activeLang === lang 
                  ? "border-[#d4ff00]/40 bg-[#d4ff00]/5 text-[#d4ff00]" 
                  : "border-white/5 text-zinc-500 hover:border-white/20"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DYNAMIC SECTIONS BY DIFFICULTY */}
      <div className="space-y-16">
        {Object.entries(groupedSnippets).map(([difficulty, items]) => (
          items.length > 0 && (
            <section key={difficulty} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">
                  {difficulty} <span className="ml-2 text-zinc-600 font-normal">/ {items.length}</span>
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* THE 3-COLUMN GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {items.map((s) => (
                    <motion.div
                      key={s.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/test/${s.id}`)}
                      className={`group cursor-pointer relative flex items-center bg-[#0f1117] border border-white/5 rounded-xl p-4 transition-all hover:bg-[#161922] hover:border-white/10 border-l-4 ${difficultyStyles[difficulty]}`}
                    >
                      {/* Left: Icon */}
                      <div className="mr-4 p-3 bg-black/20 rounded-lg group-hover:scale-110 transition-transform">
                        <Terminal size={20} className="text-zinc-400 group-hover:text-white" />
                      </div>

                      {/* Center: Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">{s.language}</span>
                        </div>
                        <h3 className="text-md font-bold text-zinc-200 truncate group-hover:text-white transition-colors">
                          {s.title}
                        </h3>
                      </div>

                      {/* Right: Action */}
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-1.5 bg-[#d4ff00] rounded-full text-black">
                          <ChevronRight size={16} strokeWidth={3} />
                        </div>
                      </div>
                      
                      {/* Subtle Background Detail */}
                      <div className="absolute top-0 right-0 p-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                         <Code2 size={48} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          )
        ))}
      </div>

      {/* EMPTY STATE */}
      {Object.values(groupedSnippets).every(arr => arr.length === 0) && (
        <div className="text-center py-40 bg-zinc-900/20 rounded-[3rem] border border-dashed border-white/5">
          <Layers size={48} className="mx-auto text-zinc-700 mb-4" />
          <h3 className="text-xl font-bold text-zinc-500">No snippets match your criteria</h3>
          <button 
            onClick={() => {setSearchQuery(''); setActiveDiff('All'); setActiveLang('All');}}
            className="mt-4 text-[#d4ff00] text-sm font-mono hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* CHALLENGE OF THE DAY - MINI VERSION */}
      {!searchQuery && (
        <footer className="mt-32 pb-20">
          <div 
            onClick={() => navigate(`/test/${dailyChallenge.id}`)}
            className="group relative overflow-hidden bg-gradient-to-r from-zinc-900 to-black border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between cursor-pointer hover:border-[#d4ff00]/30 transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-[#d4ff00]/10 rounded-xl text-[#d4ff00]">
                <Flame size={32} />
              </div>
              <div>
                <h4 className="text-zinc-400 text-xs font-mono uppercase tracking-[0.2em] mb-1">Daily Challenge</h4>
                <p className="text-xl font-bold">{dailyChallenge.title}</p>
              </div>
            </div>
            <button className="mt-6 md:mt-0 px-8 py-3 bg-white text-black font-bold rounded-xl group-hover:bg-[#d4ff00] transition-colors">
              Boost Velocity
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Dashboard;