import React from 'react';

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[16px] font-bold text-navy-light">Tableau de bord Administrateur</h1>
      </div>
      <div className="bg-white p-12 text-center rounded-xl border border-border">
        <h3 className="text-lg font-medium text-navy">Bienvenue, Administrateur</h3>
        <p className="text-text-muted mt-1">Vous pouvez gérer les utilisateurs et les paramètres de la plateforme ici.</p>
      </div>
    </div>
  );
};
