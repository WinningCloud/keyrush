import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SNIPPETS } from '../data/snippets';
import { useTypingLogic } from '../hooks/useTypingLogic';
import { useAudio } from '../hooks/useSound';
import ResultModal from '../components/ResultModal';
import { Target, Zap } from 'lucide-react';

const highlightCode = (char, index, snippet) => {
  const purpleKeywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export', 'async', 'await'];
  const greenSymbols = ['=>', '(', ')', '{', '}', '[', ']', ';', '.', '=', '+', '-', '*', '/'];

  const words = snippet.split(/(\s+|\W+)/);
  let currentPos = 0;
  for (const word of words) {
    if (index >= currentPos && index < currentPos + word.length) {
      if (purpleKeywords.includes(word)) return 'text-[#bd93f9] drop-shadow-[0_0_8px_#bd93f966]';
      if (greenSymbols.includes(word) || greenSymbols.includes(char)) return 'text-[#d4ff00] drop-shadow-[0_0_8px_#d4ff0066]';
    }
    currentPos += word.length;
  }
  return '';
};

const TypingTest = () => {
  const { id } = useParams();
  const playClick = useAudio('/sounds/key.wav', 0.2);
  
  const selectedSnippet = SNIPPETS.find(s => s.id === id) || SNIPPETS[0];
  const { userInput, setUserInput, wpm, accuracy, isFinished, resetTest } = useTypingLogic(selectedSnippet.code);
  
  const inputRef = useRef(null);
  const [streak, setStreak] = useState(0);

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
    setStreak(0);
    resetTest();
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  return (
    <div 
      className="w-full min-h-screen flex flex-col items-center p-6 md:p-12 bg-[#05070a]" 
      onClick={() => inputRef.current?.focus()}
    >
      
      {/* 1. TOP HUD (Spatially Separated) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 mt-10">
        
        {/* WPM Module */}
        <div className="bg-[#0b0e14] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-6">
          <div className="p-4 bg-[#d4ff00]/10 rounded-2xl text-[#d4ff00] shadow-[0_0_15px_rgba(212,255,0,0.1)]">
            <Zap size={28} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold mb-1">Velocity</p>
            <p className="text-4xl font-black text-white">{wpm} <span className="text-xs text-[#d4ff00] ml-1 tracking-widest">WPM</span></p>
          </div>
        </div>

        {/* 3D PRECISION BAR MODULE */}
        <div className="md:col-span-2 bg-[#0b0e14] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="flex justify-between items-end mb-4 px-2">
            <div className="flex items-center gap-3">
              <Target size={18} className="text-[#00f2ff]" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Accuracy Engine</p>
            </div>
            <p className="text-2xl font-mono font-black text-[#00f2ff] tracking-tighter">{accuracy}%</p>
          </div>
          
          {/* THE 3D BAR */}
          <div className="relative h-5 w-full bg-black/50 rounded-full border border-white/5 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
              className="h-full bg-gradient-to-r from-[#00f2ff] to-[#d4ff00] shadow-[0_0_20px_rgba(212,255,0,0.3)] relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. THE CLEAN ARENA (Larger Code Box) */}
      <div className="w-full max-w-6xl relative">
        
        {/* Streak Combo Notification (Minimalist) */}
        <AnimatePresence>
          {streak > 15 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute -top-10 right-4 text-[#bd93f9] font-black italic text-2xl drop-shadow-[0_0_10px_rgba(189,147,249,0.5)]"
            >
              {streak} COMBO
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`relative w-full p-20 rounded-[3.5rem] bg-[#0b0e14] border transition-all duration-700 shadow-2xl ${
          streak > 20 ? "border-[#bd93f9]/40 shadow-[0_0_80px_rgba(189,147,249,0.1)]" : "border-white/5"
        }`}>
          
          <input 
            ref={inputRef}
            type="text"
            className="absolute opacity-0 pointer-events-none"
            value={userInput}
            onChange={handleInput}
            autoFocus
          />

          {/* Larger code box with increased font size and line height */}
          <pre className="text-4xl font-mono leading-[1.75] whitespace-pre-wrap break-all select-none tracking-tight max-h-[70vh] overflow-y-auto">
            {selectedSnippet.code.split("").map((char, i) => {
              let colorClass = "text-white/10"; 
              const syntaxClass = highlightCode(char, i, selectedSnippet.code);

              if (i < userInput.length) {
                colorClass = userInput[i] === char 
                  ? (syntaxClass || "text-white") 
                  : "text-[#ff4d4d] border-b-2 border-[#ff4d4d]/50 bg-[#ff4d4d]/5";
              } else {
                colorClass = syntaxClass ? `${syntaxClass} opacity-30` : "text-white/10";
              }

              return (
                <span key={i} className={`${colorClass} transition-all duration-75 ${i === userInput.length ? "border-l-2 border-[#d4ff00] animate-pulse" : ""}`}>
                  {char}
                </span>
              );
            })}
          </pre>
        </div>
      </div>

      {/* 3. FOOTER (Clean & Spaced) */}
      <div className="mt-20 flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-ping" />
          Neural Link Active
        </div>
        <div className="text-[9px] font-mono tracking-widest uppercase italic text-muted">
          Esc to restart session // {selectedSnippet.language} // {selectedSnippet.difficulty}
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
