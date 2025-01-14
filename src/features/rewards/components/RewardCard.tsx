import React from 'react';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  isHighlighted: boolean;
  isSpinning: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, isHighlighted, isSpinning }) => {
  const Icon = reward.icon;
  
  return (
    <div 
      className={`p-4 bg-white border border-gray-100 rounded-xl transition-all duration-300 ${
        isHighlighted 
          ? 'ring-2 ring-purple-500 shadow-lg scale-105' 
          : isSpinning 
            ? 'opacity-50' 
            : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3">
<<<<<<< HEAD
        <div className="text-purple-600">
=======
        <div className="flex-shrink-0 text-purple-600">
>>>>>>> d617146 (Mise à jour de la loterie avec les nouvelles récompenses)
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{reward.title}</h3>
          <p className="text-sm text-gray-500">{reward.description}</p>
        </div>
      </div>
    </div>
  );
};