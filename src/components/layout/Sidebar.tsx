import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, FileText, Briefcase, LogOut, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getLinks = () => {
    if (!user) return [];
    
    if (user.role === 'CLIENT') {
      return [
        { name: 'Tableau de bord', path: '/client', icon: Home },
        { name: 'Mes Demandes', path: '/client/demandes', icon: FileText },
        { name: 'Mes Études', path: '/client/etudes', icon: Briefcase },
      ];
    } else if (user.role === 'BUREAU_ETUDE') {
      return [
        { name: 'Tableau de bord', path: '/be', icon: Home },
        { name: 'Missions Disponibles', path: '/be/missions', icon: FileText },
        { name: 'Mes Études', path: '/be/etudes', icon: Briefcase },
      ];
    } else if (user.role === 'ADMIN') {
      return [
        { name: 'Tableau de bord', path: '/admin', icon: Home },
        { name: 'Utilisateurs', path: '/admin/users', icon: User },
      ];
    }
    return [];
  };

  const links = getLinks();

  return (
    <aside className="w-[240px] bg-navy text-white h-full flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center font-bold">G</div>
        <span className="font-bold text-[18px]">GeoConnect</span>
      </div>
      
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={18} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-text-muted flex items-center justify-center shrink-0">
          <User size={16} />
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-sm font-semibold whitespace-nowrap truncate">{user?.email}</p>
          <p className="text-xs text-white/50 capitalize">{user?.role.replace('_', ' ').toLowerCase()}</p>
        </div>
        <button
          onClick={logout}
          className="text-white/50 hover:text-white p-1 cursor-pointer transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};
