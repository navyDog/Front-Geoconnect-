import React, { useEffect, useState } from 'react';
import { dataService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import { Plus, FileText, MapPin, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClientDashboard = () => {
  const { user } = useAuth();
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [delaiMax, setDelaiMax] = useState('');
  const [rue, setRue] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');

  useEffect(() => {
    if (user?.entityId) {
      loadDemandes();
    }
  }, [user]);

  const loadDemandes = async () => {
    try {
      setLoading(true);
      // Fallback to getAll if entityId is not properly set in demo
      const data = await dataService.getDemandeDevisByClientId(user?.entityId || 1).catch(() => dataService.getAllDemandeDevis());
      setDemandes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load demandes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dataService.createDemandeDevis({
        delaiMax,
        clientId: user?.entityId || 1,
        adresseProjet: {
          rue,
          codePostal,
          ville
        }
      });
      setShowForm(false);
      loadDemandes();
    } catch (error) {
      console.error("Failed to create demande", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-border">
            <div className="text-[13px] text-text-muted mb-2">Demandes Actives</div>
            <div className="text-2xl font-bold text-navy">{demandes.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border">
            <div className="text-[13px] text-text-muted mb-2">Études en Cours</div>
            <div className="text-2xl font-bold text-navy">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border">
            <div className="text-[13px] text-text-muted mb-2">Budget Engagé</div>
            <div className="text-2xl font-bold text-navy">0 €</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border">
            <div className="text-[13px] text-text-muted mb-2">Propositions Reçues</div>
            <div className="text-2xl font-bold text-navy">0</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center">
          <h3 className="text-[16px] font-bold text-navy-light">Dernières Demandes de Devis</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-accent text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm border-none cursor-pointer"
          >
            + Nouvelle Demande
          </button>
        </div>
        
        {showForm && (
          <div className="p-6 border-b border-border bg-bg">
            <h2 className="text-lg font-semibold mb-4 text-navy">Créer une nouvelle demande</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Délai Maximum</label>
                <input
                  type="date"
                  required
                  value={delaiMax}
                  onChange={(e) => setDelaiMax(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-text-muted mb-1">Rue</label>
                  <input
                    type="text"
                    required
                    value={rue}
                    onChange={(e) => setRue(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Code Postal</label>
                  <input
                    type="text"
                    required
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-muted mb-1">Ville</label>
                  <input
                    type="text"
                    required
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-text-muted hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-accent" />
          </div>
        ) : demandes.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-navy">Aucune demande</h3>
            <p className="text-text-muted mt-1">Vous n'avez pas encore créé de demande de devis.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-text-muted font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Projet</th>
                <th className="px-6 py-4">Bureau d'Études</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {demandes.map((demande) => (
                <tr key={demande.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">#{demande.id}</td>
                  <td className="px-6 py-4 font-semibold text-navy-light">
                    {demande.adresseProjet?.rue}, {demande.adresseProjet?.ville}
                  </td>
                  <td className="px-6 py-4 text-text-muted">-</td>
                  <td className="px-6 py-4">
                    <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-[12px] font-semibold">
                      EN ATTENTE
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    {new Date(demande.delaiMax).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/client/demandes/${demande.id}`}
                      className="text-accent font-semibold hover:underline"
                    >
                      Voir détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
