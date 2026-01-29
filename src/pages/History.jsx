import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Code2, Zap, Target, 
  BarChart3, Clock, ChevronRight, 
  Trophy, MousePointer2 
} from 'lucide-react';

const History = () => {
  // Realistic Mock Data
  const mockHistory = [
    { id: 1, lang: 'TypeScript', wpm: 92, acc: 99, date: 'Oct 26, 2023', grade: 'S', time: '45s' },
    { id: 2, lang: 'Rust', wpm: 68, acc: 94, date: 'Oct 25, 2023', grade: 'A', time: '1m 12s' },
    { id: 3, lang: 'Python', wpm: 84, acc: 97, date: 'Oct 25, 2023', grade: 'A', time: '38s' },
    { id: 4, lang: 'Go', wpm: 75, acc: 91, date: 'Oct 24, 2023', grade: 'B', time: '52s' },
    { id: 5, lang: 'React', wpm: 105, acc: 98, date: 'Oct 23, 2023', grade: 'S', time: '31s' },
    { id: 6, lang: 'C++', wpm: 61, acc: 88, date: 'Oct 22, 2023', grade: 'C', time: '1m 05s' },
    { id: 7, lang: 'JavaScript', wpm: 88, acc: 100, date: 'Oct 21, 2023', grade: 'S', time: '28s' },
  ];

  const stats = [
    { label: 'Average WPM', value: '82.4', icon: <Zap size={20} />, color: 'text-[#d4ff00]' },
    { label: 'Best Accuracy', value: '100%', icon: <Target size={20} />, color: 'text-[#00f2ff]' },
    { label: 'Total Sessions', value: '142', icon: <BarChart3 size={20} />, color: 'text-[#bd93f9]' },
  ];

  return (
    <div className="w-full pl-20 pr-20 mx-auto space-y-12 pt-30">
      
      {/* HEADER SECTION */}
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2">
          PERFORMANCE LOG<span className="text-[#d4ff00]">.</span>
        </h1>
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
          Review your neural-link synchronization history
        </p>
      </header>

      {/* QUICK STATS BARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0b0e14] border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">{stat.label}</p>
              <p className="text-3xl font-black font-mono text-white">{stat.value}</p>
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
          {mockHistory.map((session, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={session.id}
              className="group flex items-center bg-[#0b0e14] border border-white/5 hover:border-[#d4ff00]/30 hover:bg-[#12151d] rounded-2xl p-4 transition-all cursor-pointer"
            >
              {/* LEFT: DATE & LANGUAGE */}
              <div className="flex items-center gap-6 w-1/4">
                <div className="hidden sm:flex flex-col items-center justify-center min-w-[60px] py-1 bg-black/40 rounded-lg border border-white/5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">OCT</span>
                  <span className="text-xl font-black leading-none">{session.date.split(' ')[1].replace(',', '')}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#d4ff00] transition-colors">{session.lang}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase">
                    <Clock size={10} /> {session.time}
                  </div>
                </div>
              </div>

              {/* CENTER: PERFORMANCE METRICS */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 items-center px-4">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Velocity</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black font-mono">{session.wpm}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">WPM</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Accuracy</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-black font-mono ${session.acc > 95 ? 'text-[#00f2ff]' : 'text-orange-400'}`}>
                      {session.acc}%
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end mr-8">
                   <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-lg
                    ${session.grade === 'S' ? 'border-[#d4ff00] text-[#d4ff00] shadow-[0_0_15px_rgba(212,255,0,0.2)]' : 
                      session.grade === 'A' ? 'border-white/20 text-white' : 'border-zinc-800 text-zinc-600'}
                   `}>
                    {session.grade}
                   </div>
                </div>
              </div>

              {/* RIGHT: ACTION */}
              <div className="flex items-center gap-4">
                <button className="hidden md:block px-4 py-2 bg-white/5 hover:bg-[#d4ff00] hover:text-black rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                  Details
                </button>
                <div className="p-2 text-zinc-700 group-hover:text-white transition-colors">
                   <ChevronRight size={20} />
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER-STYLE CALL TO ACTION */}
      <div className="bg-gradient-to-r from-[#d4ff00]/10 via-transparent to-transparent border-l-2 border-[#d4ff00] p-8 rounded-r-2xl">
        <div className="flex items-center gap-4">
          <Trophy className="text-[#d4ff00]" size={32} />
          <div>
            <h4 className="font-bold text-lg">Consistency is Key.</h4>
            <p className="text-zinc-500 text-sm">You typed 12,400 keys this week. You are in the top 5% of React developers.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default History;