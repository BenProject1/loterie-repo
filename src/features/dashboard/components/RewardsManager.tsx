import React, { useState } from 'react';
import { Gift, Beer, UtensilsCrossed, XCircle, Save } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';

interface Reward {
  icon: any;
  title: string;
  description: string;
  probability: number;
  points: number;
}

const DEFAULT_REWARDS: Reward[] = [
  {
    icon: UtensilsCrossed,
    title: "-50% sur votre prochain repas",
    description: "Valable sur l'ensemble de la carte",
    probability: 0.1,
    points: 50
  },
  {
    icon: Beer,
    title: "2 bières gratuites",
    description: "Au choix parmi notre sélection pression",
    probability: 0.15,
    points: 30
  },
  {
    icon: Gift,
    title: "Une surprise offerte",
    description: "À découvrir sur place",
    probability: 0.15,
    points: 20
  },
  {
    icon: XCircle,
    title: "Rien gagné",
    description: "Continuez à jouer pour gagner !",
    probability: 0.6,
    points: 10
  }
];

export const RewardsManager: React.FC = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState(DEFAULT_REWARDS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRewardChange = (index: number, field: keyof Reward, value: string) => {
    const newRewards = [...rewards];
    newRewards[index] = {
      ...newRewards[index],
      [field]: field === 'probability' ? parseFloat(value) : value
    };
    setRewards(newRewards);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const totalProbability = rewards.reduce((sum, reward) => sum + reward.probability, 0);
      if (Math.abs(totalProbability - 1) > 0.01) {
        throw new Error('La somme des probabilités doit être égale à 100%');
      }

      await updateDoc(doc(db, 'businesses', user.uid), {
        rewards
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Récompenses</h1>
          <p className="text-gray-600 mt-1">Configurez les 4 récompenses de votre jeu</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm">
          Récompenses enregistrées avec succès !
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Configuration des récompenses</h2>
          <p className="text-sm text-gray-500 mt-1">
            La somme des probabilités doit être égale à 100%
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            const isLastReward = index === rewards.length - 1;
            return (
              <div key={index} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titre de la récompense
                      </label>
                      <input
                        type="text"
                        value={reward.title}
                        onChange={(e) => handleRewardChange(index, 'title', e.target.value)}
                        disabled={isLastReward}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={reward.description}
                        onChange={(e) => handleRewardChange(index, 'description', e.target.value)}
                        disabled={isLastReward}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Probabilité (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={reward.probability * 100}
                        onChange={(e) => handleRewardChange(index, 'probability', (parseInt(e.target.value) / 100).toString())}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Points de fidélité
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={reward.points}
                        onChange={(e) => handleRewardChange(index, 'points', e.target.value)}
                        disabled={isLastReward}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};