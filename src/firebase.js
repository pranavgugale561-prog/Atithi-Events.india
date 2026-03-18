// ─── Firebase Configuration ────────────────────────────────────────────────
// Real credentials provided by the user.
// ──────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "AIzaSyADTgZtNIctiOIbrk7yJU6CQ_hiQozNau4",
  authDomain: "atithieventswebsite.firebaseapp.com",
  projectId: "atithieventswebsite",
  storageBucket: "atithieventswebsite.firebasestorage.app",
  messagingSenderId: "477796251482",
  appId: "1:477796251482:web:7de53a5a798f9a333ce563",
  measurementId: "G-RHRTWER6Q0"
};

// Check if config is still placeholder
const isConfigured = !firebaseConfig.apiKey.startsWith('REPLACE');

let _analytics = null;
let _db = null;

// Lazy async init — won't block render or cause build errors
async function initFirebase() {
  if (!isConfigured) {
    console.log('[Firebase] Add your credentials to src/firebase.js to enable Analytics & Firestore.');
    return;
  }
  try {
    const { initializeApp } = await import('firebase/app');
    const { getAnalytics } = await import('firebase/analytics');
    const { getFirestore } = await import('firebase/firestore');
    
    const app = initializeApp(firebaseConfig);
    _analytics = getAnalytics(app);
    _db = getFirestore(app);
    
    console.log('[Firebase] Initialized ✓ (Analytics + Firestore)');
  } catch (e) {
    console.warn('[Firebase] Init failed:', e.message);
  }
}

// Initialize on module load (non-blocking)
initFirebase();

/**
 * Get the Firestore database instance.
 * Ensures Firebase is initialized first.
 */
export async function getDB() {
  if (!_db && isConfigured) {
    const { initializeApp, getApp, getApps } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    _db = getFirestore(app);
  }
  return _db;
}

/**
 * Log a custom event to Firebase Analytics.
 * No-op if Firebase is not yet configured or initialized.
 */
export async function trackEvent(eventName, params = {}) {
  if (!_analytics) return;
  try {
    const { logEvent } = await import('firebase/analytics');
    logEvent(_analytics, eventName, params);
  } catch (e) {
    console.warn('[Firebase Analytics]', e.message);
  }
}
