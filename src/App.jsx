import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Splash from './pages/Splash';
import TypingTest from './pages/TypingText';
import MainLayout from './components/MainLayout';

// const MainLayout = ({ children }) => (
//   <div className="flex min-h-screen bg-background text-white">
//     <Sidebar />
//     <main className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto">
//       {children}
//     </main>
//   </div>
// );

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/" element={<Navigate to="/splash" />} />
        
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/test/:id" element={<MainLayout><TypingTest /></MainLayout>} />    
        <Route path="/history" element={<MainLayout><History /></MainLayout>} />
        <Route path="/leaderboard" element={<MainLayout><Leaderboard /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="/logout" element={<Splash />} />

        
      </Routes>
    </Router>
  );
}

export default App;