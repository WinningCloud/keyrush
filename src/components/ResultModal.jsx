import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Home, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResultModal = ({ isOpen, wpm, accuracy, onRestart }) => {
  const navigate = useNavigate();

  const getRank = (wpm) => {
    if (wpm > 100) return { title: "10x ENGINEER", color: "text-[#bd93f9]" };
    if (wpm > 40) return { title: "SENIOR DEVELOPER", color: "text-[#7ee787]" };
    return { title: "JUNIOR DEVELOPER", color: "text-primary" };
  };

  const rank = getRank(wpm);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            className="bg-[#161b22] border border-white/10 p-10 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_80px_rgba(88,166,255,0.15)]"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="text-[#ffb86c]" size={40} />
            </div>

            <h2 className="text-sm font-mono tracking-[0.3em] text-muted mb-2">TEST COMPLETE</h2>
            <h3 className={`text-2xl font-black mb-10 tracking-tighter ${rank.color}`}>{rank.title}</h3>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-[#0d1117] p-6 rounded-3xl border border-white/5">
                <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Speed</p>
                <p className="text-4xl font-black text-primary">{wpm}</p>
                <p className="text-[10px] text-primary/50 font-mono font-bold">WPM</p>
              </div>
              <div className="bg-[#0d1117] p-6 rounded-3xl border border-white/5">
                <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Accuracy</p>
                <p className="text-4xl font-black text-accent">{accuracy}%</p>
                <p className="text-[10px] text-accent/50 font-mono font-bold">PRECISION</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={onRestart}
                className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <RotateCcw size={18} /> TRY AGAIN
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-white/5 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer border border-white/5"
              >
                <Home size={18} /> BACK TO MISSIONS
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal; // CRITICAL FIX: Ensure this line exists