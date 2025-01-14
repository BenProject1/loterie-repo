import { 
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  increment,
  Timestamp,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../firebase';

interface User {
  email: string;
  businessId: string;
  points: number;
  totalPlays: number;
  lastPlayed: Timestamp;
  hasLeftReview: boolean;
  claimedRewards: string[];
  createdAt: Timestamp;
  reviewedAt?: Timestamp;
}

// Vérifie si l'utilisateur peut jouer en fonction de son dernier scan et de son avis
const canUserPlay = (userData: User): { canPlay: boolean; message: string } => {
  const now = Timestamp.now();

  // Si l'utilisateur vient de laisser un avis (dans les 10 dernières minutes)
  if (userData.reviewedAt) {
    const timeSinceReview = (now.seconds - userData.reviewedAt.seconds) / 60; // en minutes
    if (timeSinceReview <= 10) {
      return { canPlay: true, message: 'Merci pour votre avis !' };
    }
  }

  // Sinon, vérifier la règle des 24h
  const timeSinceLastPlay = (now.seconds - userData.lastPlayed.seconds) / 3600; // en heures
  if (timeSinceLastPlay < 24) {
    return { 
      canPlay: false, 
      message: 'Vous devez attendre 24h entre chaque participation.' 
    };
  }

  return { canPlay: true, message: 'Vous pouvez jouer !' };
};

// Crée ou met à jour un utilisateur lors d'un scan
export const handleUserScan = async (email: string, businessId: string): Promise<{
  canPlay: boolean;
  message: string;
  points?: number;
}> => {
  try {
    const userRef = doc(db, 'users', email);
    const userDoc = await getDoc(userRef);

    // Nouvel utilisateur
    if (!userDoc.exists()) {
      const newUser: User = {
        email,
        businessId,
        points: 0,
        totalPlays: 0,
        lastPlayed: Timestamp.now(),
        hasLeftReview: false,
        claimedRewards: [],
        createdAt: Timestamp.now()
      };

      await setDoc(userRef, newUser);
      return {
        canPlay: true,
        message: 'Bienvenue ! Vous pouvez maintenant jouer.',
        points: 0
      };
    }

    // Utilisateur existant
    const userData = userDoc.data() as User;
    const playStatus = canUserPlay(userData);
    
    if (!playStatus.canPlay) {
      return {
        canPlay: false,
        message: playStatus.message,
        points: userData.points
      };
    }

    // Mise à jour des points et du timestamp
    const updatedPoints = userData.points + 10; // 10 points par scan
    await updateDoc(userRef, {
      points: updatedPoints,
      lastPlayed: Timestamp.now()
    });

    return {
      canPlay: true,
      message: playStatus.message,
      points: updatedPoints
    };
  } catch (error) {
    console.error('Erreur lors de la gestion du scan:', error);
    throw new Error('Une erreur est survenue lors du scan');
  }
};

// Enregistre une récompense gagnée
export const saveRewardForUser = async (
  email: string,
  rewardId: string,
  points: number
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', email);
    
    await updateDoc(userRef, {
      totalPlays: increment(1),
      points: increment(10), // Toujours ajouter 10 points, quelle que soit la récompense
      claimedRewards: arrayUnion(rewardId),
      lastPlayed: Timestamp.now()
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la récompense:', error);
    throw new Error('Une erreur est survenue lors de la sauvegarde de la récompense');
  }
};

// Met à jour le statut de l'avis Google
export const updateReviewStatus = async (
  email: string,
  bonusPoints: number = 10 // Changé à 10 points au lieu de 50
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', email);
    const userDoc = await getDoc(userRef);

    // Si l'utilisateur n'existe pas, on le crée d'abord
    if (!userDoc.exists()) {
      const newUser: User = {
        email,
        businessId: 'default_business',
        points: bonusPoints,
        totalPlays: 0,
        lastPlayed: Timestamp.now(),
        hasLeftReview: true,
        claimedRewards: [],
        createdAt: Timestamp.now(),
        reviewedAt: Timestamp.now()
      };
      await setDoc(userRef, newUser);
    } else {
      // Si l'utilisateur existe, on met à jour son statut
      await updateDoc(userRef, {
        hasLeftReview: true,
        points: increment(10), // Changé à 10 points au lieu de bonusPoints
        reviewedAt: Timestamp.now()
      });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de l\'avis:', error);
    throw new Error('Une erreur est survenue lors de la mise à jour du statut de l\'avis');
  }
};