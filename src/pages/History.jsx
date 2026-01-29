import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Code2, Zap, Target, 
  BarChart3, Clock, ChevronRight, 
  Trophy, Trash2 
} from 'lucide-react';
// Import the logic from your storage utility
import { getHistory } from '../utils/storage';

const History = () => {
  const [history, setHistory] = useState([]);

  // Load real data from storage on component mount
  useEffect(() => {
    const data = getHistory();
    // Sort by date (newest first)
    setHistory(data);
  }, []);

  // CALCULATE DYNAMIC STATS BASED ON REAL DATA
  const stats = [
    { 
        label: 'Average Velocity', 
        value: history.length > 0 
            ? Math.round(history.reduce((acc, curr) => acc + curr.wpm, 0) / history.length) 
            : 0, 
        unit: 'WPM',
        icon: <Zap size={20} />, 
        color: 'text-[#d4ff00]' 
    },
    { 
        label: 'Average Precision', 
        value: history.length > 0 
            ? Math.round(history.reduce((acc, curr) => acc + curr.acc, 0) / history.length) 
            : 0, 
        unit: '%',
        icon: <Target size={20} />, 
        color: 'text-[#00f2ff]' 
    },
    { 
        label: 'Total Sessions', 
        value: history.length, 
        unit: 'RECORDS',
        icon: <BarChart3 size={20} />, 
        color: 'text-[#bd93f9]' 
    },
  ];

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to wipe all session logs?")) {
        localStorage.removeItem('keyrush_history');
        setHistory([]);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 py-10">
      
      {/* HEADER SECTION */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            PERFORMANCE LOG<span className="text-[#d4ff00]">.</span>
          </h1>
          <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-[0.3em]">
            Historical synchronization data retrieved from local storage
          </p>
        </div>
        
        {history.length > 0 && (
            <button 
                onClick={clearHistory}
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-500 transition-colors border border-white/5 hover:border-red-500/30 rounded-lg bg-white/5"
            >
                <Trash2 size={14} /> Wipe Logs
            </button>
        )}
      </header>

      {/* QUICK STATS BARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0b0e14] border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">{stat.label}</p>
              <p className="text-3xl font-black font-mono text-white">
                {stat.value} <span className="text-[10px] text-zinc-600 tracking-normal ml-1">{stat.unit}</span>
              </p>
            </div>
            <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* HISTORY LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">Recent Sessions</h2>
          <div className="h-[1px] flex-1 mx-8 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid gap-3">
          <AnimatePresence mode='popLayout'>
            {history.length > 0 ? (
                history.map((session, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03 }}
                      key={session.id}
                      className="group flex items-center bg-[#0b0e14] border border-white/5 hover:border-[#d4ff00]/20 hover:bg-[#12151d] rounded-2xl p-4 transition-all"
                    >
                      {/* LEFT: DATE & LANGUAGE */}
                      <div className="flex items-center gap-6 w-1/4">
                        <div className="hidden sm:flex flex-col items-center justify-center min-w-[60px] py-2 bg-black/40 rounded-xl border border-white/5">
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">
                            {session.date.split(' ')[0]}
                          </span>
                          <span className="text-lg font-black leading-none text-zinc-200">
                            {session.date.split(' ')[1].replace(',', '')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#d4ff00] transition-colors">{session.lang}</h3>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
                            <Calendar size={10} /> {session.date.split(',')[1]}
                          </div>
                        </div>
                      </div>
        
                      {/* CENTER: PERFORMANCE METRICS */}
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 items-center px-4 border-l border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Velocity</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-zinc-200">{session.wpm}</span>
                            <span className="text-[9px] text-zinc-600 font-mono">WPM</span>
                          </div>
                        </div>
        
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Accuracy</span>
                          <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black font-mono ${session.acc > 95 ? 'text-[#00f2ff]' : 'text-zinc-400'}`}>
                              {session.acc}%
                            </span>
                          </div>
                        </div>
        
                        <div className="hidden sm:flex flex-col items-end mr-8">
                           <div className={`
                            w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-lg
                            ${session.grade === 'S' ? 'border-[#d4ff00] text-[#d4ff00]' : 
                              session.grade === 'A' ? 'border-white/20 text-white' : 'border-zinc-800 text-zinc-700'}
                           `}>
                            {session.grade}
                           </div>
                        </div>
                      </div>
        
                      {/* RIGHT: ACTION */}
                      <div className="flex items-center gap-4">
                        <div className="p-2 text-zinc-800 group-hover:text-white transition-colors">
                           <ChevronRight size={20} />
                        </div>
                      </div>
                    </motion.div>
                ))
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2rem] bg-white/[0.01]"
                >
                    <Code2 size={40} className="text-zinc-800 mb-4" />
                    <p className="text-zinc-600 font-mono text-[11px] uppercase tracking-[0.3em]">No synchronization logs detected</p>
                    <p className="text-zinc-700 text-[10px] mt-2 italic">Complete a training session to populate this log.</p>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER-STYLE CALL TO ACTION */}
      {history.length > 0 && (
        <div className="bg-gradient-to-r from-zinc-900 to-transparent border border-white/5 p-8 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Trophy className="text-[#d4ff00]" size={32} />
                <div>
                    <h4 className="font-bold text-lg">Growth Tracking Active</h4>
                    <p className="text-zinc-500 text-xs">Your data is stored locally in your browser. Clearing your cache will reset these logs.</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-1">Consistency Streak</p>
                <div className="flex gap-1 justify-end">
                    {[1, 1, 1, 0, 0].map((dot, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${dot ? 'bg-[#d4ff00]' : 'bg-zinc-800'}`} />
                    ))}
                </div>
            </div>
        </div>
      )}
      
    </div>
  );
};

export default History;