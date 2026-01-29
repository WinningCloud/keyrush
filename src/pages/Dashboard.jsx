import React, { useRef } from 'react';
import { useTypingLogic } from '../hooks/useTypingLogic';
import { SNIPPETS } from '../data/snippets';
import { useAudio } from '../hooks/useSound';
import {useState} from 'react';
//motion is not defined
import { motion } from 'framer-motion';

// --- Helper Function (Outside component for performance) ---
const highlightCode = (char, index, snippet) => {
  const purpleKeywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export', 'async', 'await'];
  const greenSymbols = ['=>', '(', ')', '{', '}', '[', ']', ';', '.', '=', '+', '-', '*', '/'];

  const words = snippet.split(/(\s+|\W+)/);
  let currentPos = 0;
  
  for (const word of words) {
    if (index >= currentPos && index < currentPos + word.length) {
      if (purpleKeywords.includes(word)) return 'text-[#bd93f9] drop-shadow-[0_0_5px_rgba(189,147,249,0.3)]';
      if (greenSymbols.includes(word) || greenSymbols.includes(char)) return 'text-[#7ee787] drop-shadow-[0_0_5px_rgba(126,231,135,0.3)]';
    }
    currentPos += word.length;
  }
  return '';
};

const Dashboard = () => {
  // Use the path relative to the PUBLIC folder
  const playClick = useAudio('/sounds/key.wav', 0.2); 
  
  const snippet = SNIPPETS[0].code;
  const { userInput, setUserInput, wpm, accuracy, isFinished, resetTest } = useTypingLogic(snippet);
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current?.focus();

  // Correct handler that plays sound and updates state
//   const handleInputChange = (e) => {
//     playClick(); // Sound will now trigger!
//     setUserInput(e.target.value);
//   };
  const [streak, setStreak] = useState(0);
const [maxStreak, setMaxStreak] = useState(0);

const handleInputChange = (e) => {
  const value = e.target.value;
  const lastChar = value[value.length - 1];
  const targetChar = snippet[value.length - 1];

  if (lastChar === targetChar) {
    setStreak(prev => {
      const newStreak = prev + 1;
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      return newStreak;
    });
  } else {
    setStreak(0); // Reset on mistake
  }
  
  playClick();
  setUserInput(value);
};

  return (
    <div 
      className="min-h-screen w-full bg-background text-white flex flex-col items-center justify-center p-6"
      onClick={focusInput}
    >
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          KeyRush<span className="animate-pulse text-white">_</span>
        </h1>
        <p className="text-muted font-mono uppercase tracking-widest text-xs">Professional Coding Speed Test</p>
      </header>

      {/* Stats Bar */}
      <div className="flex gap-12 mb-8 font-mono">
        <div className="text-center">
          <p className="text-muted text-xs uppercase">WPM</p>
          <p className="text-4xl font-bold text-primary">{wpm}</p>
        </div>
        <div className="text-center">
          <p className="text-muted text-xs uppercase">Accuracy</p>
          <p className="text-4xl font-bold text-accent">{accuracy}%</p>
        </div>
      </div>
      <div className="h-8 mb-2 flex justify-center">
  {streak > 10 && (
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }}
      className="text-[#bd93f9] font-black italic text-xl drop-shadow-[0_0_10px_#bd93f9]"
    >
      {streak} COMBO!
    </motion.div>
  )}
</div>

      {/* Main Typing Area */}
      <div className="relative max-w-4xl w-full p-10 rounded-[2.5rem] bg-surface border border-white/5 shadow-2xl group hover:border-primary/30 transition-all">
        
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none"
          autoFocus
          value={userInput}
          onChange={handleInputChange} // Linked correctly here
          disabled={isFinished}
        />

        <pre className="text-2xl font-mono leading-relaxed whitespace-pre-wrap break-all select-none">
          {snippet.split("").map((char, i) => {
            let colorClass = "text-muted/30"; 
            const syntaxClass = highlightCode(char, i, snippet);

            if (i < userInput.length) {
              colorClass = userInput[i] === char 
                ? (syntaxClass || "text-white") 
                : "text-error border-b-2 border-error/50 bg-error/10";
            } else {
              colorClass = syntaxClass ? `${syntaxClass} opacity-40` : "text-muted/30";
            }

            return (
              <span key={i} className={`${colorClass} transition-all duration-75 ${i === userInput.length ? "border-l-2 border-primary animate-pulse" : ""}`}>
                {char}
              </span>
            );
          })}
        </pre>
      </div>

      {isFinished && (
        <div className="mt-8 animate-bounce text-xl font-bold text-accent">
          Test Complete! 
        </div>
      )}

      <footer className="mt-12">
        <button 
          onClick={resetTest}
          className="px-10 py-3 rounded-full border border-white/10 hover:border-primary/50 transition-all text-muted font-mono text-xs uppercase tracking-widest"
        >
          Restart Test
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;