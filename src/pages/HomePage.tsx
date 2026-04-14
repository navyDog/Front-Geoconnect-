import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, Building2, ShieldCheck, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-text-main flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center font-bold text-white">G</div>
          <span className="font-bold text-[18px] text-navy">GeoConnect</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-text-main font-semibold hover:text-navy transition-colors">Connexion</Link>
          <Link to="/register" className="bg-navy text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors">Espace Pro</Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-navy tracking-tight mb-6 leading-tight">
            Trouvez le bureau d'études idéal <br className="hidden md:block" /> pour votre projet
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Décrivez votre besoin, recevez des devis qualifiés et suivez l'avancement de vos études techniques sur une plateforme unique et sécurisée.
          </p>
          <Link to="/demande-devis" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
            Demander un devis gratuitement
            <ArrowRight size={20} />
          </Link>
        </section>

        <section className="bg-white border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Gain de temps</h3>
                <p className="text-text-muted">Plus besoin de démarcher. Remplissez un seul formulaire et recevez plusieurs propositions.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Bureaux certifiés</h3>
                <p className="text-text-muted">Nous vérifions les qualifications et les assurances de tous nos bureaux d'études partenaires.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-600">
                  <Building2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Suivi centralisé</h3>
                <p className="text-text-muted">Gérez vos devis, vos documents et l'avancement de vos études depuis un tableau de bord unique.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy py-12 text-center text-white/50">
        <p>© {new Date().getFullYear()} GeoConnect. Tous droits réservés.</p>
      </footer>
    </div>
  );
};
