
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, getDoc, query, orderBy, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { initialServices, initialPricingPlans, initialYouTubeVideos, Service, PricingPlan, YouTubeVideo } from './services';

// Collection references
const servicesCollection = collection(db, 'services');
const pricingCollection = collection(db, 'pricing');
const youtubeCollection = collection(db, 'youtube');

// --- Service Functions ---

export async function getServices(): Promise<Service[]> {
  try {
    const q = query(servicesCollection, orderBy("title"));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log("Services collection is empty, seeding initial data...");
      const batch = writeBatch(db);
      initialServices.forEach((service) => {
        const docRef = doc(servicesCollection); // Automatically generate new ID
        batch.set(docRef, service);
      });
      await batch.commit();
      
      const newSnapshot = await getDocs(q);
      return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
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

export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const snapshot = await getDocs(pricingCollection);
    
    if (snapshot.empty) {
      console.log("Pricing collection is empty, seeding initial data...");
      const batch = writeBatch(db);
      initialPricingPlans.forEach((plan) => {
        const docRef = doc(db, 'pricing', plan.id);
        batch.set(docRef, plan);
      });
      await batch.commit();

       const newSnapshot = await getDocs(pricingCollection);
       return newSnapshot.docs.map(doc => doc.data() as PricingPlan).sort((a, b) => a.id === 'basic' ? -1 : 1);
    }
    
    return snapshot.docs.map(doc => doc.data() as PricingPlan).sort((a, b) => a.id === 'basic' ? -1 : 1);
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
      const batch = writeBatch(db);
      initialYouTubeVideos.forEach((video) => {
        const docRef = doc(youtubeCollection); // Automatically generate new ID
        batch.set(docRef, video);
      });
      await batch.commit();

      const newSnapshot = await getDocs(youtubeCollection);
      return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as YouTubeVideo));
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
