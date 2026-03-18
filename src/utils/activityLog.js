import { getDB } from '../firebase';

/**
 * Log an administrative or visitor activity to Firestore.
 */
export async function logActivity(type, detail, metadata = {}) {
  try {
    const db = await getDB();
    if (!db) return;

    const { collection, addDoc } = await import('firebase/firestore');
    const coll = collection(db, 'activity');

    // Auto-grab IP and Device if not provided
    const lastIp = localStorage.getItem('atithi_last_ip') || 'Unknown';
    const ua = navigator.userAgent;

    await addDoc(coll, {
      type,
      detail,
      ip: metadata.ip || lastIp,
      device: metadata.device || ua,
      ...metadata,
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
    
    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (indexError) {
      console.warn('[ActivityLog] Sorted fetch failed, falling back to unsorted:', indexError.message);
      // Fallback: Fetch without sorting (might require manual sort in JS)
      const fallbackQ = query(coll, limit(100));
      const snapshot = await getDocs(fallbackQ);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort manually in memory as a last resort
      return data.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
    }
  } catch (e) {
    console.error('[ActivityLog] Critical fetch failure:', e);
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
