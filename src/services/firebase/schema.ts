// Schéma des collections Firebase
export interface Business {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  email: string;
  createdAt: Date;
  settings: {
    rewardProbabilities: {
      firstPrize: number;
      secondPrize: number;
      thirdPrize: number;
      defaultPrize: number;
    };
    pointsPerScan: number; // Fixé à 10
  };
}

export interface Reward {
  id: string;
  businessId: string;
  title: string;
  description: string;
  probability: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Participation {
  id: string;
  businessId: string;
  userId: string;
  email: string;
  rewardId: string;
  rewardTitle: string;
  rewardDescription: string;
  points: number;
  hasReviewed: boolean;
  createdAt: Date;
}

export interface LoyaltyTier {
  id: string;
  businessId: string;
  pointsRequired: number;
  reward: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  totalScans: number;
  totalParticipations: number;
  totalReviews: number;
}

export interface LoyaltyPoints {
  userId: string;
  businessId: string;
  points: number;
  lastUpdated: Date;
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  rating: number;
  comment: string;
  googleReviewId: string;
  createdAt: Date;
  replied: boolean;
}