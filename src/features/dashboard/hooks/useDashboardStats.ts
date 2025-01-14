import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DashboardStats {
  totalScans: number;
  totalParticipations: number;
  totalLoyalCustomers: number;
  totalReviews: number;
}

interface ParticipationData {
  date: string;
  participations: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalScans: 0,
    totalParticipations: 0,
    totalLoyalCustomers: 0,
    totalReviews: 0
  });
  const [participationData, setParticipationData] = useState<ParticipationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simuler le chargement des données depuis Firestore
        // Dans une vraie application, vous devrez adapter ces requêtes
        // à votre structure de données spécifique
        
        // Pour l'exemple, on utilise des données statiques
        setStats({
          totalScans: 1234,
          totalParticipations: 856,
          totalLoyalCustomers: 423,
          totalReviews: 89
        });

        // Générer des données de participation pour les 7 derniers jours
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = subDays(new Date(), i);
          return {
            date: format(date, 'EEE dd/MM', { locale: fr }),
            participations: Math.floor(Math.random() * 50) + 10
          };
        }).reverse();

        setParticipationData(last7Days);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, participationData, loading, error };
};