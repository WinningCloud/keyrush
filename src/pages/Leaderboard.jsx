import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Zap, Target, ChevronRight, Globe, Users } from 'lucide-react';

const Leaderboard = () => {
  const topPlayers = [
    { rank: 1, name: 'NullPointer', wpm: 142, lang: 'C++', accuracy: 99, avatar: 'NP' },
    { rank: 2, name: 'AsyncAwait', wpm: 128, lang: 'JS', accuracy: 98, avatar: 'AA' },
    { rank: 3, name: 'PythonicWay', wpm: 115, lang: 'Py', accuracy: 97, avatar: 'PW' },
  ];

  const players = [
    { rank: 4, name: 'ReactWizard', wpm: 108, lang: 'React', accuracy: 96, avatar: 'RW' },
    { rank: 5, name: 'Rustacean', wpm: 102, lang: 'Rust', accuracy: 95, avatar: 'RS' },
    { rank: 6, name: 'GoGopher', wpm: 97, lang: 'Go', accuracy: 94, avatar: 'GG' },
    { rank: 7, name: 'CyberKnight', wpm: 91, lang: 'C#', accuracy: 92, avatar: 'CK' },
    { rank: 8, name: 'DevOpsDan', wpm: 88, lang: 'Bash', accuracy: 91, avatar: 'DD' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-20">
      
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <Trophy className="text-[#d4ff00]" size={28} />
             <h1 className="text-4xl font-black tracking-tight">GLOBAL RANKINGS</h1>
          </div>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
            Top 1% of synchronization speeds worldwide
          </p>
        </div>
        
        <div className="flex gap-8 border-l border-white/10 pl-8">
            <div className="text-right">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total Pilots</p>
                <p className="text-xl font-mono font-bold">12,842</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Active Now</p>
                <div className="flex items-center gap-2 justify-end">
                    <div className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                    <p className="text-xl font-mono font-bold">428</p>
                </div>
            </div>
        </div>
      </header>

      {/* 2. THE PODIUM (TOP 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topPlayers.map((player) => (
          <motion.div 
            key={player.rank}
            whileHover={{ y: -5 }}
            className={`relative p-8 rounded-[2rem] bg-[#0b0e14] border flex flex-col items-center text-center ${
                player.rank === 1 ? 'border-[#d4ff00]/40 shadow-[0_0_40px_rgba(212,255,0,0.1)]' : 'border-white/5'
            }`}
          >
            {player.rank === 1 && (
                <div className="absolute -top-4 bg-[#d4ff00] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    World Champion
                </div>
            )}
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-2xl font-black border-4 ${
                player.rank === 1 ? 'border-[#d4ff00] text-[#d4ff00]' : 
                player.rank === 2 ? 'border-zinc-400 text-zinc-400' : 'border-orange-600 text-orange-600'
            }`}>
                {player.avatar}
            </div>

            <h3 className="text-xl font-bold mb-1">{player.name}</h3>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">{player.lang} Specialist</span>
            
            <div className="w-full pt-4 border-t border-white/5 flex justify-around">
                <div>
                    <p className="text-[9px] text-zinc-600 uppercase font-bold">Speed</p>
                    <p className="text-xl font-black font-mono text-white">{player.wpm}</p>
                </div>
                <div>
                    <p className="text-[9px] text-zinc-600 uppercase font-bold">Precision</p>
                    <p className="text-xl font-black font-mono text-[#00f2ff]">{player.accuracy}%</p>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. RANKING TABLE (WIDE PILLS) */}
      <div className="space-y-3">
        {/* Table Header Labels */}
        <div className="grid grid-cols-12 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Pilot</div>
            <div className="col-span-3">Core Language</div>
            <div className="col-span-2 text-center">Accuracy</div>
            <div className="col-span-2 text-right">Velocity</div>
        </div>

        {players.map((player, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={player.rank}
            className="grid grid-cols-12 items-center bg-[#0b0e14] border border-white/5 hover:border-white/20 p-4 px-8 rounded-2xl transition-all group"
          >
            <div className="col-span-1 font-mono text-zinc-500 font-bold">#{player.rank}</div>
            
            <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-[#d4ff00]">
                    {player.avatar}
                </div>
                <span className="font-bold text-zinc-200 group-hover:text-white transition-colors">{player.name}</span>
            </div>

            <div className="col-span-3">
                <span className="px-3 py-1 bg-black/40 border border-white/5 rounded-md text-[10px] font-mono text-zinc-400">
                    {player.lang}
                </span>
            </div>

            <div className="col-span-2 text-center">
                <span className="font-mono text-sm text-zinc-400">{player.accuracy}%</span>
            </div>

            <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-2 text-[#d4ff00]">
                    <span className="text-xl font-black font-mono leading-none">{player.wpm}</span>
                    <span className="text-[9px] font-bold uppercase tracking-tighter">WPM</span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. CURRENT USER STATUS (STAY AT BOTTOM) */}
      <div className="sticky bottom-8 left-0 right-0 bg-[#d4ff00] p-4 rounded-2xl flex items-center justify-between text-black shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-6 pl-4">
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Your Rank</span>
                <span className="text-2xl font-black font-mono">#1,242</span>
            </div>
            <div className="h-8 w-[1px] bg-black/20" />
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Global Tier</span>
                <span className="text-lg font-black italic">Elite Pilot</span>
            </div>
        </div>
        
        <div className="flex items-center gap-4 pr-4">
            <p className="text-xs font-bold font-mono text-black/60 max-w-[150px] text-right leading-tight">
                You are 12 WPM away from the Top 1,000
            </p>
            <button className="bg-black text-[#d4ff00] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                Train Now
            </button>
        </div>
      </div>

    </div>
  );
};

export default Leaderboard;