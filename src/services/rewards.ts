import { 
  collection,
  addDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Reward {
  userId: string;
  email: string;
  rewardTitle: string;
  rewardDescription: string;
  claimed: boolean;
  createdAt: Timestamp;
}

export const saveReward = async (reward: Omit<Reward, 'createdAt'>) => {
  try {
    console.log('Saving reward:', reward);
    const rewardsRef = collection(db, 'rewards');
    console.log('Collection reference created');
    
    const docRef = await addDoc(rewardsRef, {
      ...reward,
      createdAt: Timestamp.now(),
    });
    
    console.log('Reward saved successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Detailed error saving reward:', error);
    throw error;
  }
};