import { getDB } from '../firebase';

/**
 * Log an administrative or visitor activity to Firestore.
 */
export async function logActivity(type, detail) {
  try {
    const db = await getDB();
    if (!db) return;

    const { collection, addDoc } = await import('firebase/firestore');
    const coll = collection(db, 'activity');

    await addDoc(coll, {
      type,
      detail,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('[ActivityLog] Failed to log:', e.message);
  }
}

/**
 * Retrieve the latest 100 activity entries from Firestore.
 */
export async function getActivityLog() {
  try {
    const db = await getDB();
    if (!db) return [];

    const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore');
    const coll = collection(db, 'activity');
    const q = query(coll, orderBy('timestamp', 'desc'), limit(100));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e) {
    console.error('[ActivityLog] Fetch failed:', e);
    return [];
  }
}

/**
 * Clear activity logs from Firestore.
 */
export async function clearActivityLog() {
  try {
    const db = await getDB();
    if (!db) return;

    const { collection, getDocs, deleteDoc, doc, writeBatch } = await import('firebase/firestore');
    const coll = collection(db, 'activity');
    const snapshot = await getDocs(coll);
    
    if (snapshot.empty) return;

    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => {
      batch.delete(d.ref);
    });
    
    await batch.commit();
  } catch (e) {
    console.error('[ActivityLog] Clear failed:', e);
  }
}
