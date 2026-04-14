import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ClientDashboard } from './pages/ClientDashboard';
import { BEDashboard } from './pages/BEDashboard';
import { EtudeDetail } from './pages/EtudeDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { HomePage } from './pages/HomePage';
import { QuoteFunnel } from './pages/QuoteFunnel';

const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (user.role === 'CLIENT') {
    return <Navigate to="/client" replace />;
  } else if (user.role === 'BUREAU_ETUDE') {
    return <Navigate to="/be" replace />;
  } else {
    return <Navigate to="/admin" replace />;
  }
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/demande-devis" element={<QuoteFunnel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<Layout />}>
        <Route path="dashboard" element={<RoleBasedRedirect />} />
        
        {/* Client Routes */}
        <Route path="client" element={<ClientDashboard />} />
        <Route path="client/demandes" element={<ClientDashboard />} />
        <Route path="client/etudes/:id" element={<EtudeDetail />} />
        
        {/* Bureau Etude Routes */}
        <Route path="be" element={<BEDashboard />} />
        <Route path="be/missions" element={<BEDashboard />} />
        <Route path="be/etudes/:id" element={<EtudeDetail />} />

        {/* Admin Routes */}
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
