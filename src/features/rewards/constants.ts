import { UtensilsCrossed, Beer, Gift, XCircle } from 'lucide-react';
import { Reward } from './types';

export const REWARDS: Reward[] = [
  {
    id: 'reward_1',
    icon: UtensilsCrossed,
    title: "-30% sur votre prochain repas",
    description: "Valable sur l'ensemble de la carte",
    probability: 0.1,
    points: 10
  },
  {
    id: 'reward_2',
    icon: Beer,
    title: "1 bière gratuite",
    description: "Au choix parmi notre sélection pression",
    probability: 0.15,
    points: 10
  },
  {
    id: 'reward_3',
    icon: Gift,
    title: "Une surprise offerte",
    description: "À découvrir sur place",
    probability: 0.15,
    points: 10
  },
  {
    id: 'reward_4',
    icon: XCircle,
    title: "10 points de fidélité",
    description: "Continuez à jouer pour gagner plus !",
    probability: 0.6,
    points: 10
  }
];