import { useRef, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Terminal, Zap, Trophy, ShieldCheck, ChevronRight, 
  Cpu, Globe, MousePointer2, Code2, Rocket, Command, Activity 
} from 'lucide-react';

// --- 3D Background Component ---
const NeuralField = () => {
  const pointsRef = useRef();
  const count = 2500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.5;
    const targetRotationX = state.mouse.y * 0.2; 
    const targetRotationY = state.mouse.x * 0.2;
    pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.03;
    pointsRef.current.rotation.z += (targetRotationY - pointsRef.current.rotation.z) * 0.03;
    pointsRef.current.position.y = Math.sin(t * 0.6) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#58a6ff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
};

const Experience = () => (
  <div className="fixed inset-0 z-0 bg-[#05070a]">
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <NeuralField />
        <Preload all />
      </Suspense>
    </Canvas>
  </div>
);

// --- Main Splash Page ---
const Splash = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <Zap size={20} />, title: "Precision Tracking", desc: "Millisecond-accurate keystroke analytics." },
    { icon: <Terminal size={20} />, title: "Real Syntax", desc: "Type through JS, Python, Rust, and Go snippets." },
    { icon: <Globe size={20} />, title: "Global Ranks", desc: "See where you stand among the top 1% of devs." },
    { icon: <ShieldCheck size={20} />, title: "Elite Standard", desc: "Used by engineers at top-tier tech firms." },
  ];

  return (
    <div className="relative min-h-screen w-full text-white selection:bg-primary/30 scroll-smooth">
      <Experience />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* Navigation */}
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto pointer-events-auto">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Cpu size={18} className="text-black" />
            </div>
            KEYRUSH
          </div>
          <div className="flex items-center gap-8">
            <button className="text-sm font-medium text-muted hover:text-white transition-colors cursor-pointer hidden md:block">Documentation</button>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-white/10 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-xs font-bold tracking-[0.2em] uppercase text-primary">
              <Activity size={14} className="animate-pulse" />
              Live typing simulator
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8]">
              TYPE LIKE <br />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-white bg-clip-text text-transparent italic tracking-[-0.05em]">A MACHINE</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-14 font-light leading-relaxed">
              Stop typing like a novelist. KeyRush is the high-performance interface designed specifically for software architects to master muscle memory.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pointer-events-auto">
              <button 
                onClick={() => navigate('/login')}
                className="group relative px-12 py-6 bg-white text-black font-black text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(88,166,255,0.4)] cursor-pointer"
              >
                START SPEEDTEST
                <ChevronRight size={24} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-4 text-muted font-mono text-sm opacity-50">
                <MousePointer2 size={16} />
                Explore Neural Field
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURE GRID */}
        <section className="max-w-7xl mx-auto px-6 py-32 pointer-events-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl hover:bg-white/[0.07] hover:border-primary/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-black transition-all">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                <p className="text-muted leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CODE PREVIEW SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-32 pointer-events-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative p-1 rounded-[3rem] bg-gradient-to-b from-primary/20 to-transparent shadow-2xl overflow-hidden"
          >
            <div className="bg-[#0b0e14] rounded-[2.9rem] p-8 md:p-16">
              <div className="flex items-center gap-2 mb-10 opacity-40">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-4 font-mono text-xs uppercase tracking-widest">test_environment.js</span>
              </div>
              <p className="text-3xl md:text-5xl font-mono font-bold leading-tight text-left">
                <span className="text-primary">const</span> masterCode = () ={">"} {"{"} <br />
                <span className="pl-8 text-white/40 italic"> // Achieve peak velocity </span> <br />
                <span className="pl-8">return <span className="text-accent underline decoration-primary">"Speed of Thought"</span>;</span> <br />
                {"}"};
              </p>
            </div>
          </motion.div>
          <div className="mt-16 flex flex-wrap justify-center gap-12 text-muted opacity-40 font-mono text-xs uppercase tracking-[0.3em]">
             <div className="flex items-center gap-2"><Code2 size={16}/> React</div>
             <div className="flex items-center gap-2"><Rocket size={16}/> Vite</div>
             <div className="flex items-center gap-2"><Command size={16}/> Tailwind</div>
          </div>
        </section>

        {/* LEADERBOARD BRAG SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-32 pointer-events-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-[4rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="max-w-md">
              <h2 className="text-5xl font-black mb-6 leading-tight">THE GLOBAL <br/>ELITE</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Join thousands of engineers who have transformed their typing into a lethal weapon. Track stats, climb the board, and win the game.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all cursor-pointer"
              >
                VIEW RANKINGS <ChevronRight size={20}/>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              {[142, 138, 125, 110].map((wpm, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center backdrop-blur-md hover:scale-105 transition-transform">
                  <p className="text-4xl font-black text-white">{wpm}</p>
                  <p className="text-[10px] text-primary uppercase font-bold tracking-widest">WPM</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-4xl mx-auto px-6 py-40 text-center pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-none italic">READY TO BREACH THE LIMIT?</h2>
          <button 
            onClick={() => navigate('/login')}
            className="px-16 py-8 bg-primary text-white font-black text-2xl rounded-3xl hover:scale-110 active:scale-95 transition-all shadow-[0_0_80px_rgba(88,166,255,0.4)] cursor-pointer"
          >
            GET STARTED NOW
          </button>
        </section>

        {/* FOOTER */}
        <footer className="py-20 border-t border-white/5 bg-black/20 backdrop-blur-xl pointer-events-auto">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="font-black text-2xl tracking-tighter opacity-50">KEYRUSH</div>
            <div className="flex gap-8 text-muted text-sm font-mono uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors cursor-pointer">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors cursor-pointer">Github</a>
              <a href="#" className="hover:text-primary transition-colors cursor-pointer">Privacy</a>
            </div>
            <p className="text-[10px] text-muted opacity-30 font-mono tracking-widest">© 2024 KEYRUSH NEURAL SYSTEMS. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Splash;