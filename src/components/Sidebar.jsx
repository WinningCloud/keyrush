import React from 'react';
import { LayoutDashboard, History, Trophy, Settings, LogOut, Terminal, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <History size={20} />, label: 'History', path: '/history' },
    { icon: <Trophy size={20} />, label: 'Leaderboard', path: '/leaderboard' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0b0e14] 
        border-r border-white/5 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* HEADER / LOGO */}
      <div className="h-20 flex items-center px-6 mb-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 p-2 bg-[#d4ff00] rounded-lg shadow-[0_0_15px_rgba(212,255,0,0.2)]">
            <Terminal size={20} className="text-black" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-xl font-black tracking-tighter text-white"
            >
              KEYRUSH<span className="text-[#d4ff00]">.</span>
            </motion.span>
          )}
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center h-12 rounded-xl transition-all duration-200 group
                ${isActive ? 'bg-[#d4ff00]/10 text-[#d4ff00]' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}
              `}
            >
              <div className="w-14 flex-shrink-0 flex justify-center">
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-bold tracking-wide"
                >
                  {item.label}
                </motion.span>
              )}

              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-6 bg-[#d4ff00] rounded-r-full"
                />
              )}

              {/* Collapsed Tooltip */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-zinc-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-white/10 shadow-xl">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* COLLAPSE TOGGLE BUTTON */}
      <div className="px-3 mb-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft 
            className={`transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`} 
            size={18} 
          />
        </button>
      </div>

      {/* LOGOUT */}
      <div className="p-3 border-t border-white/5">
        <Link
          to="/logout"
          className="flex items-center h-12 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all group"
        >
          <div className="w-14 flex-shrink-0 flex justify-center">
            <LogOut size={20} />
          </div>
          {!isCollapsed && <span className="text-sm font-bold tracking-wide">Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;