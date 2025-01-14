import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Business {
  id: string;
  name: string;
  address: string;
  googleMapsUrl: string;
  qrCodeUrl: string;
  createdAt: Date;
  active: boolean;
  settings: {
    rewardProbabilities: {
      firstPrize: number;
      secondPrize: number;
      thirdPrize: number;
      defaultPrize: number;
    }
  }
}

export const createBusiness = async (businessData: Omit<Business, 'id' | 'createdAt'>) => {
  const businessesRef = collection(db, 'businesses');
  const newBusinessRef = doc(businessesRef);
  
  await setDoc(newBusinessRef, {
    ...businessData,
    id: newBusinessRef.id,
    createdAt: serverTimestamp(),
  });

  return newBusinessRef;
};

export const getBusiness = async (businessId: string) => {
  const businessRef = doc(db, 'businesses', businessId);
  const businessDoc = await getDoc(businessRef);
  
  if (!businessDoc.exists()) {
    throw new Error('Business not found');
  }

  return businessDoc.data() as Business;
};