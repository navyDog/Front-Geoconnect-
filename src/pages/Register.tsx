import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Lock, Mail, User, Building, Loader2 } from 'lucide-react';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'CLIENT' | 'BUREAU_ETUDE'>('CLIENT');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.register({ email, password, role });
      if (response.token) {
        login(response.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-text-main">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-accent">
          <MapPin size={48} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-navy">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-text-muted">
          Ou{' '}
          <Link to="/login" className="font-semibold text-accent hover:text-blue-700">
            connectez-vous
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-border sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-text-main">Type de compte</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('CLIENT')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-semibold cursor-pointer ${
                    role === 'CLIENT'
                      ? 'border-accent text-accent bg-blue-50'
                      : 'border-border text-text-main bg-white hover:bg-slate-50'
                  }`}
                >
                  <User className="mr-2 h-4 w-4" />
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole('BUREAU_ETUDE')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-semibold cursor-pointer ${
                    role === 'BUREAU_ETUDE'
                      ? 'border-accent text-accent bg-blue-50'
                      : 'border-border text-text-main bg-white hover:bg-slate-50'
                  }`}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Bureau d'Étude
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-accent focus:border-accent block w-full pl-10 sm:text-sm border-border rounded-md py-2 border"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main">Mot de passe</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-accent focus:border-accent block w-full pl-10 sm:text-sm border-border rounded-md py-2 border"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "S'inscrire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
