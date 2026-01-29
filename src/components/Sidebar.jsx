import { LayoutDashboard, History, Trophy, Settings, LogOut, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Test', path: '/dashboard' },
    { icon: <History size={20} />, label: 'History', path: '/history' },
    { icon: <Trophy size={20} />, label: 'Leaderboard', path: '/leaderboard' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-surface border-r border-white/5 flex flex-col p-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Terminal className="text-primary" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tighter">KeyRush</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'text-muted hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-all mt-auto">
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;