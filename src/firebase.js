// ─── Firebase Configuration ────────────────────────────────────────────────
// Replace these placeholder values with your actual Firebase project config.
// Get them from: Firebase Console → Project Settings → Your apps → Web app → SDK setup
// ──────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID",
  measurementId: "REPLACE_WITH_YOUR_MEASUREMENT_ID"
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
