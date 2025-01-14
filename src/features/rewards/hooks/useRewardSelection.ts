import { useState } from 'react';
import { REWARDS } from '../constants';
import { handleUserScan, saveRewardForUser } from '../../../services/user';

export const useRewardSelection = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRewardSelection = async (email: string, hasReviewed: boolean) => {
    try {
      // Vérifie si l'utilisateur peut jouer
      const scanResult = await handleUserScan(email, 'default_business');
      
      if (!scanResult.canPlay) {
        setError(scanResult.message);
        return null;
      }

      const random = Math.random();
      let cumulativeProbability = 0;
      
      const selectedReward = REWARDS.find(reward => {
        cumulativeProbability += hasReviewed ? reward.probability * 1.5 : reward.probability;
        return random <= cumulativeProbability;
      });

      if (selectedReward) {
        await saveRewardForUser(email, selectedReward.id, selectedReward.points);
        return selectedReward;
      }

      return REWARDS[REWARDS.length - 1];
    } catch (err) {
      console.error('Error processing reward:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
      return null;
    }
  };

  const spinRewards = async (email: string, hasReviewed: boolean) => {
    setIsSpinning(true);
    setError(null);
    
    const finalReward = await handleRewardSelection(email, hasReviewed);
    if (!finalReward) {
      setIsSpinning(false);
      return;
    }

    const finalIndex = REWARDS.findIndex(r => r.title === finalReward?.title);
    
    let currentInterval = 0;
    let speed = 100;
    const maxIntervals = 20;
    const acceleration = 1.1;
    
    const spinOnce = () => {
      setHighlightedIndex(prev => (prev + 1) % REWARDS.length);
      currentInterval++;

      if (currentInterval < maxIntervals) {
        setTimeout(() => {
          if (currentInterval === maxIntervals - 1) {
            setHighlightedIndex(finalIndex);
            setSelectedReward(finalReward);
            setIsSpinning(false);
          } else {
            spinOnce();
          }
        }, speed * Math.pow(acceleration, currentInterval));
      }
    };

    spinOnce();
  };

  return {
    isSpinning,
    highlightedIndex,
    selectedReward,
    error,
    spinRewards
  };
};