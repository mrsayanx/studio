
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, getDoc, query, orderBy, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { initialServices, initialPricingPlans, initialYouTubeVideos, Service, PricingPlan, YouTubeVideo } from './services';

// --- Helper function to seed initial data and return it ---
async function seedAndFetch<T>(
  collectionRef: any, 
  initialData: any[], 
  idField?: string, 
  orderByField?: string,
  sortFn?: (a: T, b: T) => number
): Promise<T[]> {
    const batch = writeBatch(db);
    initialData.forEach((item) => {
        const docRef = idField ? doc(collectionRef, item[idField]) : doc(collectionRef); 
        batch.set(docRef, item);
    });
    await batch.commit();

    // After seeding, fetch the data again to ensure consistency
    const q = orderByField ? query(collectionRef, orderBy(orderByField)) : collectionRef;
    const newSnapshot = await getDocs(q);
    const data = newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    
    if (sortFn) {
        return data.sort(sortFn);
    }
    return data;
}


// --- Service Functions ---

export async function getServices(): Promise<Service[]> {
  try {
    const q = query(servicesCollection, orderBy("title"));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log("Services collection is empty, seeding initial data...");
      return await seedAndFetch<Service>(servicesCollection, initialServices, undefined, "title");
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  } catch (error) {
    console.error("Error fetching services: ", error);
    return [];
  }
}

export async function addService(service: Omit<Service, 'id'>): Promise<string | null> {
    try {
        const docRef = await addDoc(servicesCollection, service);
        return docRef.id;
    } catch (error) {
        console.error("Error adding service: ", error);
        return null;
    }
}

export async function updateService(serviceId: string, serviceData: Partial<Service>): Promise<boolean> {
  try {
    const serviceRef = doc(db, 'services', serviceId);
    await setDoc(serviceRef, serviceData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating service: ", error);
    return false;
  }
}

export async function deleteService(serviceId: string): Promise<boolean> {
    try {
        const serviceRef = doc(db, 'services', serviceId);
        await deleteDoc(serviceRef);
        return true;
    } catch (error) {
        console.error("Error deleting service: ", error);
        return false;
    }
}


// --- Pricing Plan Functions ---
const pricingSort = (a: PricingPlan, b: PricingPlan) => (a.id === 'basic' ? -1 : 1);

export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const snapshot = await getDocs(pricingCollection);
    
    if (snapshot.empty) {
      console.log("Pricing collection is empty, seeding initial data...");
      return await seedAndFetch<PricingPlan>(pricingCollection, initialPricingPlans, 'id', undefined, pricingSort);
    }
    
    return snapshot.docs.map(doc => doc.data() as PricingPlan).sort(pricingSort);
  } catch (error) {
    console.error("Error fetching pricing plans: ", error);
    return [];
  }
}

export async function updatePricingPlan(planId: string, planData: Partial<PricingPlan>): Promise<boolean> {
  try {
    const planRef = doc(db, 'pricing', planId);
    await setDoc(planRef, planData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating pricing plan: ", error);
    return false;
  }
}


// --- YouTube Video Functions ---

export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const snapshot = await getDocs(youtubeCollection);

    if (snapshot.empty) {
      console.log("YouTube collection is empty, seeding initial data...");
      return await seedAndFetch<YouTubeVideo>(youtubeCollection, initialYouTubeVideos);
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as YouTubeVideo));
  } catch (error) {
    console.error("Error fetching YouTube videos: ", error);
    return [];
  }
}

export async function updateYouTubeVideo(videoId: string, videoData: Partial<YouTubeVideo>): Promise<boolean> {
    try {
        const videoRef = doc(db, 'youtube', videoId);
        await setDoc(videoRef, videoData, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating youtube video: ", error);
        return false;
    }
}
