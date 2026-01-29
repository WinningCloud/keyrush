import React, { useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { User, Lock, Terminal, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Small 3D Neon Component ---
const NeonObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.z = t * 0.2;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={1}>
      <mesh ref={meshRef}>
        {/* OctahedronGeometry gives that precise, diamond-like technical shape */}
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#58a6ff" 
          wireframe 
          emissive="#58a6ff" 
          emissiveIntensity={5} 
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
    <div className="min-h-screen w-full bg-[#0d1117] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* 3D Component Container */}
        <div className="h-40 w-full flex items-center justify-center mb-2">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#58a6ff" intensity={2} />
              <NeonObject />
            </Suspense>
          </Canvas>
        </div>

        {/* Login Card */}
        <div className="bg-[#161b22] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tighter mb-2">AUTH_SYSTEM</h2>
            <p className="text-muted text-sm font-mono uppercase tracking-[0.2em]">Initialize your session</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-muted mb-2 ml-1 font-bold">Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="USERNAME"
                  className="w-full bg-[#0d1117] border border-white/5 rounded-2xl px-12 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono text-sm placeholder:text-white/10"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-muted mb-2 ml-1 font-bold">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#0d1117] border border-white/5 rounded-2xl px-12 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono text-sm placeholder:text-white/10"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-white text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] group cursor-pointer"
              >
                LOGIN <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Footer Bragging inside card
          <div className="mt-10 flex justify-center gap-6 opacity-20 hover:opacity-100 transition-opacity">
            <Terminal size={16} />
            <div className="h-4 w-[1px] bg-white/50" />
            <span className="text-[10px] font-mono tracking-widest uppercase italic">Secure Terminal Link Active</span>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;