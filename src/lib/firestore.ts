
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, getDoc, query, orderBy, writeBatch, CollectionReference } from 'firebase/firestore';
import { db } from './firebase';
import { initialServices, initialPricingPlans, initialYouTubeVideos, Service, PricingPlan, YouTubeVideo } from './services';

// --- Collection References ---
const servicesCollection = collection(db, 'services') as CollectionReference<Omit<Service, 'id'>>;
const pricingCollection = collection(db, 'pricing') as CollectionReference<Omit<PricingPlan, 'id'>>;
const youtubeCollection = collection(db, 'youtube') as CollectionReference<Omit<YouTubeVideo, 'id'>>;

// --- Helper function to seed initial data and return it ---
async function seedAndFetch<T extends { id: string }>(
  collectionRef: CollectionReference<any>, 
  initialData: Omit<T, 'id'>[],
  idField?: keyof T,
  sortFn?: (a: T, b: T) => number
): Promise<T[]> {
    const batch = writeBatch(db);
    const newDocs: T[] = [];

    initialData.forEach((itemData) => {
        let docRef;
        let id;

        if (idField && (itemData as any)[idField]) {
            id = (itemData as any)[idField];
            docRef = doc(collectionRef, id);
        } else {
            // Firestore will auto-generate an ID
            docRef = doc(collectionRef);
            id = docRef.id;
        }
        
        batch.set(docRef, itemData);
        newDocs.push({ id, ...itemData } as T);
    });

    await batch.commit();

    // After seeding, return the data we just created
    if (sortFn) {
        return newDocs.sort(sortFn);
    }
    return newDocs;
}

// --- Service Functions ---
export async function getServices(): Promise<Service[]> {
  try {
    const q = query(servicesCollection, orderBy("title"));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log("Services collection is empty, seeding initial data...");
      const sortedData = await seedAndFetch<Service>(servicesCollection, initialServices);
      return sortedData.sort((a,b) => a.title.localeCompare(b.title));
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
const pricingSort = (a: PricingPlan, b: PricingPlan): number => {
    if (a.id === 'basic') return -1;
    if (b.id === 'basic') return 1;
    return 0;
};

export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const snapshot = await getDocs(pricingCollection);
    
    if (snapshot.empty) {
      console.log("Pricing collection is empty, seeding initial data...");
      return await seedAndFetch<PricingPlan>(pricingCollection, initialPricingPlans, 'id', pricingSort);
    }
    
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PricingPlan));
    return data.sort(pricingSort);
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
       // Firestore will auto-generate IDs for videos
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
