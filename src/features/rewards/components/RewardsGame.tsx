import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { REWARDS } from '../constants';
import { RewardCard } from './RewardCard';
import { EmailForm } from './EmailForm';
import { useRewardSelection } from '../hooks/useRewardSelection';
import { updateReviewStatus } from '../../../services/user';

export const RewardsGame: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'email' | 'review'>('email');
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const {
    isSpinning,
    highlightedIndex,
    selectedReward,
    error,
    spinRewards
  } = useRewardSelection();

  useEffect(() => {
    if (isRedirecting && document.visibilityState === 'visible') {
      setIsRedirecting(false);
      spinRewards(email, true);
      setShowModal(false);
    }
  }, [document.visibilityState, isRedirecting]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep('review');
  };

  const handleReview = async () => {
    try {
      await updateReviewStatus(email);
      setHasReviewed(true);
      setIsRedirecting(true);
      
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && isRedirecting) {
          setIsRedirecting(false);
          spinRewards(email, true);
          setShowModal(false);
        }
      }, { once: true });

      window.open('https://google.com/maps', '_blank');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'avis:', error);
      setIsRedirecting(false);
    }
  };

  const handleSkip = () => {
    spinRewards(email, false);
    setShowModal(false);
  };

  if (selectedReward) {
    const Icon = selectedReward.icon;
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-4">
<<<<<<< HEAD
          <div className="mx-auto mb-4 text-purple-600 transform scale-150">
            <Icon className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold">{selectedReward.title}</h2>
          <p className="text-gray-600">{selectedReward.description}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-purple-700">+{selectedReward.points} points de fidélité !</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
=======
          <div className="flex flex-col items-center gap-4">
            <div className="text-purple-600">
              <Icon className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold">{selectedReward.title}</h2>
            <p className="text-gray-600">{selectedReward.description}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-purple-700">+{selectedReward.points} points de fidélité !</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
>>>>>>> d617146 (Mise à jour de la loterie avec les nouvelles récompenses)
            Vérifiez votre boîte mail pour recevoir votre récompense !
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
<<<<<<< HEAD
      <h1 className="text-2xl font-bold text-center mb-2">
        Tentez votre chance ! 🎉
      </h1>
      <p className="text-gray-600 text-center mb-6 text-sm">
        Gagnez une récompense exclusive instantanément
      </p>
=======
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          Tentez votre chance !
          <span className="inline-block">🎉</span>
        </h1>
        <p className="text-gray-600 text-sm">
          Gagnez une récompense exclusive instantanément
        </p>
      </div>
>>>>>>> d617146 (Mise à jour de la loterie avec les nouvelles récompenses)

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3 mb-6">
        {REWARDS.map((reward, index) => (
          <RewardCard
            key={index}
            reward={reward}
            isHighlighted={highlightedIndex === index}
            isSpinning={isSpinning}
          />
        ))}
      </div>

      {!showModal && !isSpinning && (
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
        >
          Participer
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-[highlight_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalStep === 'email' ? 'Entrez votre email pour récupérer votre récompense' : 'Doublez vos chances !'}
              </h3>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setModalStep('email');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {modalStep === 'email' ? (
              <EmailForm
                email={email}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
              />
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <Star className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-6 text-sm">
                    Laissez un avis sur Google pour multiplier vos chances de gagner une meilleure récompense !
                  </p>
                </div>
                <button
                  onClick={handleReview}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 mb-2 text-sm"
                >
                  Laisser un avis
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full bg-gray-100 text-gray-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  Passer cette étape
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};