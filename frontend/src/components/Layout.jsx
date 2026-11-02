import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Music, Users, LogOut, Mic2 } from 'lucide-react';

const Layout = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: Music },
    { name: 'Circles', path: '/circles', icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <Mic2 className="text-indigo-400" />
          <span className="text-xl font-bold tracking-tight">SyncSound</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
              {user?.username?.[0].toUpperCase()}
            </div>
            <span className="text-sm font-medium">{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-indigo-300 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;