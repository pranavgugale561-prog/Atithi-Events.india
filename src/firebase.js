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

// Lazy async init — won't block render or cause build errors
async function initFirebase() {
  if (!isConfigured) {
    console.log('[Firebase] Add your credentials to src/firebase.js to enable Analytics.');
    return;
  }
  try {
    const { initializeApp } = await import('firebase/app');
    const { getAnalytics } = await import('firebase/analytics');
    const app = initializeApp(firebaseConfig);
    _analytics = getAnalytics(app);
    console.log('[Firebase] Analytics initialized ✓');
  } catch (e) {
    console.warn('[Firebase] Init failed:', e.message);
  }
}

// Initialize on module load (non-blocking)
initFirebase();

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
