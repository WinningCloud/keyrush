import React, { useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { User, Lock, ArrowRight, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Enlarged 3D Technical Object ---
const NeonObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = t * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        {/* Increased size from 1 to 1.8 */}
        <octahedronGeometry args={[1.8, 0]} /> 
        <meshStandardMaterial 
          color="#d4ff00" 
          wireframe 
          emissive="#d4ff00" 
          emissiveIntensity={1.5} 
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#06080c] flex flex-col items-center justify-center p-6 font-mono">
      
      {/* 1. LARGE 3D VISUAL ANCHOR */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} color="#d4ff00" intensity={1} />
            <NeonObject />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. LOGIN MODULE */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        <div className="bg-[#0b0e14]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
          
          <header className="mb-10 text-center">
            <div className="inline-flex p-3 bg-white/5 rounded-xl mb-4 border border-white/10">
              <TerminalIcon size={20} className="text-[#d4ff00]" />
            </div>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">Login to Key_Rush</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-1">Entering playground </p>
          </header>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Identity Field */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
                Pilot Identity
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#d4ff00] transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="USERNAME"
                  className="w-full bg-black/50 border border-white/5 rounded-lg py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#d4ff00]/50 transition-all text-sm text-zinc-200 placeholder:text-zinc-800"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
                Access Token
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#d4ff00] transition-colors" size={16} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/5 rounded-lg py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#d4ff00]/50 transition-all text-sm text-zinc-200 placeholder:text-zinc-800"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-4 bg-white hover:bg-[#d4ff00] text-black font-black py-4 rounded-lg transition-all flex items-center justify-center gap-2 group text-xs uppercase tracking-widest"
            >
              Start Practice 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Optional Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] text-zinc-600 uppercase tracking-widest">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Request Access</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">v2.0.4-Stable</span>
          </div>
        </div>
      </motion.div>

      {/* BACKGROUND DETAIL */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <div className="text-[10px] text-zinc-700 font-mono space-y-1 uppercase tracking-tighter">
          <p>{`>> status: awaiting_input`}</p>
          <p>{`>> auth_service: initialized`}</p>
          <p>{`>> environment: production`}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;