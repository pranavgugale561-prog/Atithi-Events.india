// ─── Firebase Configuration ────────────────────────────────────────────────
// Replace these placeholder values with your actual Firebase project config.
// Get them from: Firebase Console → Project Settings → Your apps → Web app → SDK setup
//
// IMPORTANT: These values are safe to include in frontend code — Firebase security
// is enforced by Firestore/Auth rules, not by hiding the config.
// ──────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID",
  measurementId: "REPLACE_WITH_YOUR_MEASUREMENT_ID"
};

// Check if config is still placeholder (not yet configured)
const isConfigured = !firebaseConfig.apiKey.startsWith('REPLACE');

let app = null;
let analytics = null;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    console.log('[Firebase] Analytics initialized ✓');
  } catch (e) {
    console.warn('[Firebase] Failed to initialize:', e.message);
  }
} else {
  console.log('[Firebase] Pending configuration — analytics disabled until credentials are added to src/firebase.js');
}

/**
 * Log a custom event to Firebase Analytics.
 * @param {string} eventName - Event name (e.g. 'page_view', 'service_click')
 * @param {object} params - Optional extra parameters
 */
export function trackEvent(eventName, params = {}) {
  if (!analytics) return; // silently no-op if not configured
  try {
    logEvent(analytics, eventName, params);
  } catch (e) {
    console.warn('[Firebase Analytics]', e.message);
  }
}

export { analytics };
export default app;
