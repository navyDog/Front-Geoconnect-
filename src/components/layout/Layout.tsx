import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

export const Layout = () => {
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getPageTitle = () => {
    if (location.pathname.includes('demandes')) return 'Mes Demandes';
    if (location.pathname.includes('etudes')) return 'Mes Études';
    if (location.pathname.includes('missions')) return 'Missions Disponibles';
    return 'Tableau de Bord';
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden text-text-main font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[64px] bg-white border-b border-border flex items-center justify-between px-8 shrink-0">
          <h2 className="text-[18px] font-semibold">{getPageTitle()}</h2>
          <div className="flex items-center gap-4">
            <span className="bg-indigo-100 text-indigo-700 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
              Rôle : {user?.role.replace('_', ' ')}
            </span>
            <span className="text-text-muted cursor-pointer">🔔</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
