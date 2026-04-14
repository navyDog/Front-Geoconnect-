import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Loader2, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const ETATS = [
  "DEVIS_VALIDE",
  "DATE_INTERVENTION_PROPOSEE",
  "DATE_INTERVENTION_FIXEE",
  "INTERVENTION_EFFECTUEE",
  "RAPPORT_TERMINE",
  "PAIEMENT_EFFECTUE"
];

export const EtudeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [etude, setEtude] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEtude(parseInt(id));
    }
  }, [id]);

  const loadEtude = async (etudeId: number) => {
    try {
      setLoading(true);
      const data = await dataService.getEtudeById(etudeId);
      setEtude(data);
    } catch (error) {
      console.error("Failed to load etude", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEtat = async (nouvelEtat: string) => {
    if (!etude) return;
    try {
      await dataService.updateEtude({ ...etude, etat: nouvelEtat });
      loadEtude(etude.id);
    } catch (error) {
      console.error("Failed to update etude", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!etude) {
    return <div>Étude introuvable</div>;
  }

  const currentEtatIndex = ETATS.indexOf(etude.etat);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-navy">Étude #{etude.id}</h1>
          <p className="text-text-muted mt-1">Suivi de l'avancement du projet</p>
        </div>
        <div className="bg-[#D1FAE5] text-[#065F46] px-3 py-1 rounded-full text-sm font-semibold">
          {etude.etat.replace(/_/g, ' ')}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-8">
        <h2 className="text-lg font-semibold mb-6 text-navy">Progression</h2>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          
          <div className="space-y-8 relative">
            {ETATS.map((etat, index) => {
              const isCompleted = index <= currentEtatIndex;
              const isCurrent = index === currentEtatIndex;
              
              return (
                <div key={etat} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10",
                    isCompleted ? "bg-accent text-white" : "bg-slate-200 text-text-muted"
                  )}>
                    {isCompleted ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={cn(
                      "font-semibold",
                      isCompleted ? "text-navy" : "text-text-muted"
                    )}>
                      {etat.replace(/_/g, ' ')}
                    </h3>
                  </div>
                  
                  {/* For demo purposes, we allow updating state directly here. 
                      In a real app, this would depend on the user role. */}
                  {index === currentEtatIndex + 1 && (
                    <button
                      onClick={() => handleUpdateEtat(etat)}
                      className="ml-4 px-3 py-1 text-sm bg-blue-50 text-accent hover:bg-blue-100 rounded-md transition-colors font-semibold cursor-pointer border-none"
                    >
                      Valider cette étape
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
