import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { dataService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { MapPin, Calendar, Mail, Lock, Loader2, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const QuoteFunnel = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Step 1 data
  const [delaiMax, setDelaiMax] = useState('');
  const [rue, setRue] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');

  // Step 2 data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create account
      const authRes = await authService.register({ email, password, role: 'CLIENT' });
      
      if (authRes.token) {
        // 2. Login
        login(authRes.token);
        localStorage.setItem('token', authRes.token);
        
        const decoded: any = jwtDecode(authRes.token);
        const clientId = decoded.entityId || decoded.id || 1;

        // 3. Create Demande
        await dataService.createDemandeDevis({
          delaiMax,
          clientId,
          adresseProjet: { rue, codePostal, ville }
        });

        // 4. Redirect
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de la création de votre demande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-text-main">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-xl text-white font-bold text-xl mb-6 hover:bg-blue-700 transition-colors">
          G
        </Link>
        <h2 className="text-3xl font-extrabold text-navy">
          Demande de devis
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-accent' : 'bg-border'}`} />
          <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-border'}`} />
        </div>
        <p className="mt-2 text-sm text-text-muted font-medium">
          Étape {step} sur 2 : {step === 1 ? 'Votre projet' : 'Vos coordonnées'}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-border sm:rounded-xl sm:px-10 shadow-sm">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-1.5">Délai souhaité</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-text-muted" />
                  </div>
                  <input
                    type="date"
                    required
                    value={delaiMax}
                    onChange={(e) => setDelaiMax(e.target.value)}
                    className="focus:ring-accent focus:border-accent block w-full pl-10 sm:text-sm border-border rounded-lg py-2.5 border"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-border">
                <h3 className="text-sm font-bold text-navy">Adresse du projet</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1.5">Rue</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-text-muted" />
                    </div>
                    <input
                      type="text"
                      required
                      value={rue}
                      onChange={(e) => setRue(e.target.value)}
                      placeholder="123 avenue de la République"
                      className="focus:ring-accent focus:border-accent block w-full pl-10 sm:text-sm border-border rounded-lg py-2.5 border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-1.5">Code Postal</label>
                    <input
                      type="text"
                      required
                      value={codePostal}
                      onChange={(e) => setCodePostal(e.target.value)}
                      placeholder="75001"
                      className="focus:ring-accent focus:border-accent block w-full px-3 sm:text-sm border-border rounded-lg py-2.5 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-1.5">Ville</label>
                    <input
                      type="text"
                      required
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      placeholder="Paris"
                      className="focus:ring-accent focus:border-accent block w-full px-3 sm:text-sm border-border rounded-lg py-2.5 border"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg text-sm font-bold text-white bg-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors cursor-pointer"
                >
                  Continuer
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex gap-3 items-start border border-blue-100">
                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-blue-900">
                  Plus qu'une étape ! Créez votre compte client pour recevoir et gérer vos devis.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main mb-1.5">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-text-muted" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="focus:ring-accent focus:border-accent block w-full pl-10 sm:text-sm border-border rounded-lg py-2.5 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main mb-1.5">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-text-muted" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="focus:ring-accent focus:border-accent block w-full pl-10 sm:text-sm border-border rounded-lg py-2.5 border"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center px-4 py-3 border border-border rounded-lg text-sm font-bold text-text-main bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg text-sm font-bold text-white bg-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Valider ma demande'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
