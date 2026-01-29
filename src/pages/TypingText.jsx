import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SNIPPETS } from '../data/snippets';
import { useTypingLogic } from '../hooks/useTypingLogic';
import { useAudio } from '../hooks/useSound';
import ResultModal from '../components/ResultModal';
import { Target, Zap, ChevronLeft, Keyboard, Award, ShieldAlert, Cpu } from 'lucide-react';
import { saveTestResult, calculateGrade } from '../utils/storage';

const highlightCode = (char, index, snippet) => {
  const purpleKeywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export', 'async', 'await'];
  const greenSymbols = ['=>', '(', ')', '{', '}', '[', ']', ';', '.', '=', '+', '-', '*', '/'];

  const words = snippet.split(/(\s+|\W+)/);
  let currentPos = 0;
  for (const word of words) {
    if (index >= currentPos && index < currentPos + word.length) {
      if (purpleKeywords.includes(word)) return 'text-[#bd93f9] drop-shadow-[0_0_8px_rgba(189,147,249,0.6)]';
      if (greenSymbols.includes(word) || greenSymbols.includes(char)) return 'text-[#d4ff00] drop-shadow-[0_0_8px_rgba(212,255,0,0.6)]';
    }
    currentPos += word.length;
  }
  return '';
};

const TypingTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const playClick = useAudio('/sounds/key.wav', 0.2);
  
  const selectedSnippet = SNIPPETS.find(s => s.id === id) || SNIPPETS[0];

  // Logic Hooks
  const { userInput, setUserInput, wpm, accuracy, isFinished, resetTest } = useTypingLogic(selectedSnippet.code);

  // States
  const [hasSaved, setHasSaved] = useState(false);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFinished && !hasSaved) {
      const sessionData = {
        id: Date.now(),
        lang: selectedSnippet.language,
        wpm: wpm,
        acc: accuracy,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        grade: calculateGrade(wpm, accuracy),
        time: "30s", 
      };
      saveTestResult(sessionData);
      setHasSaved(true);
    }
  }, [isFinished, wpm, accuracy, selectedSnippet, hasSaved]);

  const getStatus = (acc, speed) => {
    if (acc >= 98 && speed > 80) return { label: 'SUPERSONIC', color: 'text-[#d4ff00]', bg: 'bg-[#d4ff00]' };
    if (acc >= 90) return { label: 'OPTIMAL', color: 'text-[#00f2ff]', bg: 'bg-[#00f2ff]' };
    if (acc >= 75) return { label: 'STABLE', color: 'text-orange-400', bg: 'bg-orange-400' };
    return { label: 'CRITICAL', color: 'text-red-500', bg: 'bg-red-500' };
  };

  const status = getStatus(accuracy, wpm);

  const handleInput = (e) => {
    const val = e.target.value;
    const lastTyped = val[val.length - 1];
    const target = selectedSnippet.code[val.length - 1];
    if (lastTyped === target) setStreak(s => s + 1);
    else setStreak(0);
    playClick();
    setUserInput(val);
  };

  const handleRestart = () => {
    setHasSaved(false);
    setStreak(0);
    resetTest();
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  return (
    <div 
      className="w-full min-h-screen flex flex-col items-center bg-[#06080c] text-white selection:bg-[#d4ff00]/30" 
      onClick={() => inputRef.current?.focus()}
    >
      {/* 1. MINIMAL TOP NAV */}
      <div className="w-full max-w-7xl px-8 py-6 flex justify-between items-center">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-zinc-600 hover:text-[#d4ff00] transition-all font-mono text-[10px] uppercase tracking-[0.2em]"
        >
          <ChevronLeft size={14} /> Terminate Session
        </button>
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Link Active</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{selectedSnippet.language} // {selectedSnippet.difficulty}</span>
        </div>
      </div>

      {/* 2. STATS PILL HUD */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 px-6 mb-12 mt-4">
        
        {/* VELOCITY CARD */}
        <div className="md:col-span-4 bg-[#0b0e14] border border-white/5 rounded-[2rem] p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 text-[#d4ff00]">
                <Zap size={24} className="fill-current" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-1">Velocity</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black font-mono tracking-tighter">{wpm}</p>
                <p className="text-xs font-mono text-zinc-600 font-bold uppercase">WPM</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <Cpu size={120} />
          </div>
        </div>

        {/* ACCURACY ENGINE CARD */}
        <div className="md:col-span-8 bg-[#0b0e14] border border-white/5 rounded-[2rem] p-6 relative flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4 px-2">
            <div className="flex items-center gap-3">
              <Target size={18} className={status.color} />
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black">Accuracy Engine</p>
            </div>
            <div className="flex flex-col items-end">
                <p className={`text-[10px] font-black tracking-widest mb-1 ${status.color}`}>{status.label}</p>
                <p className={`text-3xl font-black font-mono leading-none ${status.color}`}>{accuracy}%</p>
            </div>
          </div>
          
          {/* THE PROGRESS BAR */}
          <div className="relative h-3 w-full bg-black/50 rounded-full border border-white/5 p-[2px] overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className={`h-full rounded-full ${status.bg} shadow-[0_0_20px_rgba(255,255,255,0.1)] relative`}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. NEON TYPING ARENA */}
      <div className="w-full max-w-6xl px-6 relative">
        
        {/* COMBO NOTIFICATION */}
        <AnimatePresence>
          {streak > 15 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute -top-10 right-10 flex items-center gap-3"
            >
              <Award className="text-[#bd93f9]" size={24} />
              <span className="text-[#bd93f9] font-black italic text-2xl tracking-tighter drop-shadow-[0_0_10px_#bd93f9]">
                {streak} COMBO
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`relative w-full p-12 md:p-20 rounded-[3rem] bg-[#0b0e14]/40 border backdrop-blur-md transition-all duration-700 ${
          streak > 20 ? "border-[#bd93f9]/40 shadow-[0_0_60px_rgba(189,147,249,0.05)]" : "border-white/5"
        }`}>
          
          <input 
            ref={inputRef}
            type="text"
            className="absolute opacity-0 pointer-events-none"
            value={userInput}
            onChange={handleInput}
            autoFocus
          />

          <pre className="text-3xl md:text-4xl font-mono leading-[1.8] whitespace-pre-wrap break-all select-none tracking-tight">
            {selectedSnippet.code.split("").map((char, i) => {
              let charStyle = "text-zinc-800"; // Default Untyped
              const syntaxClass = highlightCode(char, i, selectedSnippet.code);

              if (i < userInput.length) {
                if (userInput[i] === char) {
                  // CORRECT: Use syntax color or brand green
                  charStyle = syntaxClass || "text-zinc-200";
                } else {
                  // WRONG: Neon Red Warning
                  charStyle = "text-white bg-[#ff0055] rounded-sm shadow-[0_0_15px_rgba(255,0,85,0.6)]";
                }
              }

              return (
                <span key={i} className={`relative transition-all duration-75 ${charStyle}`}>
                  {char}
                  {i === userInput.length && (
                    <motion.span 
                      className="absolute left-0 top-[10%] bottom-[10%] w-[3px] bg-[#d4ff00] shadow-[0_0_15px_#d4ff00,0_0_30px_#d4ff00]"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </span>
              );
            })}
          </pre>
        </div>

        {/* UTILITY FOOTER */}
        <div className="mt-10 flex justify-center items-center gap-10">
          <div className="flex items-center gap-3 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em]">
            <Keyboard size={14} />
            <span>Link established</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-zinc-800" />
          <div className="flex items-center gap-3 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em]">
            <span className="px-2 py-0.5 border border-zinc-800 rounded-md text-zinc-500">ESC</span>
            <span>Abort session</span>
          </div>
        </div>
      </div>

      <ResultModal 
        isOpen={isFinished} 
        wpm={wpm} 
        accuracy={accuracy} 
        onRestart={handleRestart} 
      />
    </div>
  );
};

export default TypingTest;