import React, { useEffect, useState } from 'react';
import { dataService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import { FileText, MapPin, Calendar, Loader2, CheckCircle } from 'lucide-react';

export const BEDashboard = () => {
  const { user } = useAuth();
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDemande, setSelectedDemande] = useState<number | null>(null);
  
  // Form state
  const [prix, setPrix] = useState('');
  const [dateRendu, setDateRendu] = useState('');
  const [cheminDevisPdf, setCheminDevisPdf] = useState('');

  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    try {
      setLoading(true);
      const data = await dataService.getAllDemandeDevis();
      setDemandes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load demandes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProposition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDemande) return;

    try {
      await dataService.createPropositionDevis({
        bureauEtudeId: user?.entityId || 1,
        demandeDevisId: selectedDemande,
        prix: parseFloat(prix),
        dateRendu,
        cheminDevisPdf,
        refusee: false
      });
      setSelectedDemande(null);
      // Optionally refresh or show success
      alert("Proposition envoyée avec succès !");
    } catch (error) {
      console.error("Failed to create proposition", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[16px] font-bold text-navy-light">Missions Disponibles</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
        </div>
      ) : demandes.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-slate-200">
          <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">Aucune mission</h3>
          <p className="text-slate-500 mt-1">Il n'y a pas de demandes de devis disponibles pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {demandes.map((demande) => (
            <div key={demande.id} className="bg-white rounded-xl border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                  En attente de devis
                </div>
                <span className="text-sm text-text-muted">#{demande.id}</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3 text-text-muted">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span className="text-sm">
                    {demande.adresseProjet?.rue}<br/>
                    {demande.adresseProjet?.codePostal} {demande.adresseProjet?.ville}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 text-text-muted">
                  <Calendar size={18} className="shrink-0" />
                  <span className="text-sm">
                    Délai max souhaité: {new Date(demande.delaiMax).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {selectedDemande === demande.id ? (
                <form onSubmit={handleSubmitProposition} className="bg-bg p-4 rounded-lg border border-border space-y-4">
                  <h4 className="font-medium text-navy">Faire une proposition</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-text-muted mb-1">Prix (€)</label>
                      <input
                        type="number"
                        required
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                        className="w-full border border-border rounded-md px-3 py-1.5 text-sm focus:ring-accent focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-muted mb-1">Date de rendu</label>
                      <input
                        type="date"
                        required
                        value={dateRendu}
                        onChange={(e) => setDateRendu(e.target.value)}
                        className="w-full border border-border rounded-md px-3 py-1.5 text-sm focus:ring-accent focus:border-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Lien PDF du devis</label>
                    <input
                      type="url"
                      required
                      value={cheminDevisPdf}
                      onChange={(e) => setCheminDevisPdf(e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-border rounded-md px-3 py-1.5 text-sm focus:ring-accent focus:border-accent"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDemande(null)}
                      className="px-3 py-1.5 text-sm text-text-muted hover:bg-slate-200 rounded-md transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-sm bg-accent text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setSelectedDemande(demande.id)}
                  className="w-full py-2 border border-accent text-accent rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm cursor-pointer"
                >
                  Proposer un devis
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
