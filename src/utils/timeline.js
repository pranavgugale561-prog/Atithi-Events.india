import { getDB } from '../firebase';
import { logActivity } from './activityLog';

/**
 * Fetch all timeline events from Firestore, sorted exactly as provided.
 * Expected to be sorted manually by Admin (or by date).
 */
export async function getTimelineEvents() {
  try {
    const db = await getDB();
    if (!db) return [];

    const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
    const coll = collection(db, 'timeline');
    
    try {
      // First try to fetch sorted by date (newest first)
      const q = query(coll, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (indexError) {
      console.warn('[Timeline] Sorted fetch failed, falling back to unsorted fetch:', indexError.message);
      // Fallback: Fetch everything and sort in JS
      const snapshot = await getDocs(coll);
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      return data.sort((a, b) => {
        // Simple string comparison for 'Jan 24, 2025' style dates won't work perfectly,
        // but Date.parse handles standard strings well enough for fallback
        const da = Date.parse(a.date) || 0;
        const dbTime = Date.parse(b.date) || 0;
        return dbTime - da;
      });
    }
  } catch (error) {
    console.error('[Timeline] Fetch failed:', error.message);
    return [];
  }
}

/**
 * Add a new event to the timeline.
 */
export async function addTimelineEvent(eventData) {
  try {
    const db = await getDB();
    if (!db) return null;

    const { collection, addDoc } = await import('firebase/firestore');
    const coll = collection(db, 'timeline');
    const docRef = await addDoc(coll, {
      ...eventData,
      createdAt: new Date().toISOString()
    });

    await logActivity('service_add', `Added to Timeline: ${eventData.title}`);
    return { ...eventData, id: docRef.id };
  } catch (error) {
    console.error('[Timeline] Add failed:', error.message);
    throw error;
  }
}

/**
 * Delete a timeline event.
 */
export async function deleteTimelineEvent(id) {
  try {
    const db = await getDB();
    if (!db) return;

    const { doc, deleteDoc } = await import('firebase/firestore');
    const ref = doc(db, 'timeline', id);
    await deleteDoc(ref);

    await logActivity('service_delete', 'Deleted a Timeline event');
  } catch (error) {
    console.error('[Timeline] Delete failed:', error.message);
    throw error;
  }
}
