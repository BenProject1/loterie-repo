import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Medal, Search, Plus, Trash2, Save } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';

interface LoyaltyTier {
  points: number;
  reward: string;
}

const DEFAULT_TIERS: LoyaltyTier[] = [
  { points: 50, reward: "-10% sur la commande" },
  { points: 100, reward: "1 café offert" },
  { points: 200, reward: "1 repas gratuit" }
];

export const LoyaltyProgram: React.FC = () => {
  const { user } = useAuth();
  const [tiers, setTiers] = useState<LoyaltyTier[]>(DEFAULT_TIERS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAddTier = () => {
    setTiers([...tiers, { points: 0, reward: "" }]);
  };

  const handleRemoveTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const handleTierChange = (index: number, field: keyof LoyaltyTier, value: string | number) => {
    const newTiers = [...tiers];
    newTiers[index] = {
      ...newTiers[index],
      [field]: field === 'points' ? parseInt(value as string) : value
    };
    setTiers(newTiers);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateDoc(doc(db, 'businesses', user.uid), {
        loyaltyTiers: tiers
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
          <h1 className="text-2xl font-bold text-gray-900">Programme de Fidélité</h1>
          <p className="text-gray-600 mt-1">Gérez votre programme de fidélité et vos clients fidèles</p>
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
          Programme de fidélité enregistré avec succès !
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Points par scan</h2>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-600">Chaque scan = 10 points</p>
            <p className="text-xs text-purple-500 mt-1">Cette valeur est fixe et ne peut pas être modifiée</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-600">Clients fidèles</p>
              <p className="text-2xl font-semibold text-purple-700 mt-1">423</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-600">Points distribués</p>
              <p className="text-2xl font-semibold text-purple-700 mt-1">12,450</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Paliers de récompenses</h2>
            <button
              onClick={handleAddTier}
              className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter un palier
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {tiers.map((tier, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Points requis
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={tier.points}
                        onChange={(e) => handleTierChange(index, 'points', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Récompense
                      </label>
                      <input
                        type="text"
                        value={tier.reward}
                        onChange={(e) => handleTierChange(index, 'reward', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Ex: -10% sur la commande"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTier(index)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};