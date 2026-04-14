import api from '../api/api';

export const dataService = {
  // DemandeDevis
  getAllDemandeDevis: () => api.get('/demandeDevis').then(res => res.data),
  getDemandeDevisById: (id: number) => api.get(`/demandeDevis/${id}`).then(res => res.data),
  getDemandeDevisByClientId: (id: number) => api.get(`/demandeDevis/client/${id}`).then(res => res.data),
  createDemandeDevis: (data: any) => api.post('/demandeDevis', data).then(res => res.data),
  updateDemandeDevis: (data: any) => api.put('/demandeDevis', data).then(res => res.data),
  deleteDemandeDevis: (id: number) => api.delete(`/demandeDevis/${id}`).then(res => res.data),

  // PropositionDevis
  getAllPropositionDevis: () => api.get('/propositionDevis').then(res => res.data),
  getPropositionDevisById: (id: number) => api.get(`/propositionDevis/${id}`).then(res => res.data),
  getPropositionDevisByDemandeId: (id: number) => api.get(`/propositionDevis/devis/${id}`).then(res => res.data),
  getPropositionDevisByBureauEtudeId: (id: number) => api.get(`/propositionDevis/bureauEtude/${id}`).then(res => res.data),
  createPropositionDevis: (data: any) => api.post('/propositionDevis', data).then(res => res.data),
  updatePropositionDevis: (data: any) => api.put('/propositionDevis', data).then(res => res.data),
  deletePropositionDevis: (id: number) => api.delete(`/propositionDevis/${id}`).then(res => res.data),

  // Etude
  getAllEtudes: () => api.get('/etude').then(res => res.data),
  getEtudeById: (id: number) => api.get(`/etude/${id}`).then(res => res.data),
  getEtudesByClientId: (id: number) => api.get(`/etude/client/${id}`).then(res => res.data),
  getEtudesByBureauEtudeId: (id: number) => api.get(`/etude/bureauEtude/${id}`).then(res => res.data),
  createEtude: (data: any) => api.post('/etude', data).then(res => res.data),
  updateEtude: (data: any) => api.put('/etude', data).then(res => res.data),
  deleteEtude: (id: number) => api.delete(`/etude/${id}`).then(res => res.data),

  // Client
  getAllClients: () => api.get('/client').then(res => res.data),
  getClientById: (id: number) => api.get(`/client/${id}`).then(res => res.data),
  createClient: (data: any) => api.post('/client', data).then(res => res.data),
  updateClient: (data: any) => api.put('/client', data).then(res => res.data),

  // BureauEtude
  getAllBureauEtudes: () => api.get('/bureauEtude').then(res => res.data),
  getBureauEtudeById: (id: number) => api.get(`/bureauEtude/${id}`).then(res => res.data),
  createBureauEtude: (data: any) => api.post('/bureauEtude', data).then(res => res.data),
  updateBureauEtude: (data: any) => api.put('/bureauEtude', data).then(res => res.data),
};
