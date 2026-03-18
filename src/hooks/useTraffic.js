import { useEffect, useState } from 'react';
import { logActivity } from '../utils/activityLog';
import { trackEvent, getDB } from '../firebase';

async function syncTrafficToFirestore(traffic) {
  try {
    const db = await getDB();
    if (!db) return;

    const { doc, setDoc, serverTimestamp, increment } = await import('firebase/firestore');
    const statsRef = doc(db, 'stats', 'traffic');
    const today = new Date().toISOString().slice(0, 10);

    // Sync global counters using increment to be safe with concurrent visitors
    await setDoc(statsRef, {
      totalViews: increment(1),
      uniqueVisitors: traffic.isNew ? increment(1) : increment(0),
      [`dailyViews.${today}`]: increment(1),
      lastUpdated: serverTimestamp(),
      activeSince: traffic.activeSince || new Date().toISOString()
    }, { merge: true });
  } catch (e) {
    console.warn('[TrafficSync] Failed to sync to Firestore:', e.message);
  }
}

export function useTraffic() {
  useEffect(() => {
    const traffic = JSON.parse(localStorage.getItem('atithi_traffic') || '{}');
    const today = new Date().toISOString().slice(0, 10);
    let isNewVisitor = false;

    if (!traffic.activeSince) traffic.activeSince = new Date().toISOString();
    if (!traffic.ipHits) traffic.ipHits = {};

    // Page views
    traffic.totalViews = (traffic.totalViews || 0) + 1;

    // Daily views
    if (!traffic.dailyViews) traffic.dailyViews = {};
    traffic.dailyViews[today] = (traffic.dailyViews[today] || 0) + 1;

    // Track hit from existing IP
    if (traffic.lastIp) {
      traffic.ipHits[traffic.lastIp] = (traffic.ipHits[traffic.lastIp] || 0) + 1;
    }

    // Unique visitors (session-based)
    if (!sessionStorage.getItem('atithi_visited')) {
      isNewVisitor = true;
      traffic.uniqueVisitors = (traffic.uniqueVisitors || 0) + 1;
      sessionStorage.setItem('atithi_visited', 'true');
      
      trackEvent('new_visitor', { timestamp: new Date().toISOString() });

      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          const ip = data.ip || 'Unknown IP';
          const loc = data.city ? `${data.city}, ${data.country_name}` : 'Unknown Location';
          traffic.lastIp = ip;
          localStorage.setItem('atithi_last_ip', ip);
          localStorage.setItem('atithi_last_loc', loc);
          traffic.ipHits[ip] = (traffic.ipHits[ip] || 0) + 1;
          localStorage.setItem('atithi_traffic', JSON.stringify(traffic));
          logActivity('visit', `New visitor arrived from ${loc}`, { ip });
          trackEvent('visitor_location', { city: data.city || 'Unknown', country: data.country_name || 'Unknown', ip });
        })
        .catch(() => {
          logActivity('visit', 'New visitor arrived (IP tracker failed)');
        });
    }

    // Session start
    traffic.lastVisit = new Date().toISOString();
    const sessionStart = Date.now();

    localStorage.setItem('atithi_traffic', JSON.stringify(traffic));
    
    // Sync to global Firestore stats
    syncTrafficToFirestore({ ...traffic, isNew: isNewVisitor });

    // ── Real-time Session Heartbeat ────────────────────────────────────────
    // Each browser tab gets a unique session ID. We write/update a Firestore
    // doc so the admin can see who is actively on the site right now.
    let sessionDocRef = null;
    let heartbeatInterval = null;

    const startHeartbeat = async () => {
      try {
        const db = await getDB();
        if (!db) return;

        const { collection, doc, setDoc, deleteDoc, serverTimestamp } = await import('firebase/firestore');
        // Generate a random session ID for this tab
        const sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionDocRef = doc(collection(db, 'sessions'), sessionId);

        const ua = navigator.userAgent;
        const page = window.location.pathname;
        const ip = localStorage.getItem('atithi_last_ip') || 'Unknown';

        const writeHeartbeat = () =>
          setDoc(sessionDocRef, {
            heartbeat: serverTimestamp(),
            page,
            ip,
            device: ua,
            startedAt: new Date().toISOString(),
          }, { merge: true }).catch(() => {});

        await writeHeartbeat();
        // Keep the session alive every 30 seconds
        heartbeatInterval = setInterval(writeHeartbeat, 30_000);

        // Remove session when the user navigates away
        window.addEventListener('beforeunload', () => {
          deleteDoc(sessionDocRef).catch(() => {});
        });
      } catch (e) {
        console.warn('[Session] Heartbeat failed to start:', e.message);
      }
    };

    startHeartbeat();
    // ──────────────────────────────────────────────────────────────────────

    // Track session duration on unmount
    return () => {
      const duration = Math.round((Date.now() - sessionStart) / 1000);
      const t = JSON.parse(localStorage.getItem('atithi_traffic') || '{}');
      const sessions = t.sessionDurations || [];
      sessions.push(duration);
      if (sessions.length > 100) sessions.shift();
      t.sessionDurations = sessions;
      t.avgDuration = Math.round(sessions.reduce((a, b) => a + b, 0) / sessions.length);
      localStorage.setItem('atithi_traffic', JSON.stringify(t));
      trackEvent('session_end', { duration_seconds: duration });

      // Clean up heartbeat
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (sessionDocRef) {
        import('firebase/firestore').then(({ deleteDoc }) => deleteDoc(sessionDocRef).catch(() => {}));
      }
    };
  }, []);
}

export function getTrafficData() {
  const local = JSON.parse(localStorage.getItem('atithi_traffic') || '{"totalViews":0,"uniqueVisitors":0,"avgDuration":0,"dailyViews":{}}');
  return local;
}

/**
 * Fetch global traffic stats from Firestore.
 */
export async function getGlobalTrafficData() {
  try {
    const db = await getDB();
    if (!db) return null;

    const { doc, getDoc } = await import('firebase/firestore');
    const statsRef = doc(db, 'stats', 'traffic');
    const snap = await getDoc(statsRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (e) {
    console.error('[Traffic] Failed to fetch global stats:', e);
  }
  return null;
}

/**
 * React hook for real-time active session count + detail list.
 * Sessions are considered "active" if their heartbeat is within the last 90 seconds.
 * Returns { count, sessions } — updates instantly via Firestore onSnapshot.
 */
export function useActiveSessions() {
  const [state, setState] = useState({ count: 0, sessions: [] });

  useEffect(() => {
    let unsubscribe = null;

    const subscribe = async () => {
      try {
        const db = await getDB();
        if (!db) return;

        const { collection, onSnapshot, query } = await import('firebase/firestore');
        const sessionsRef = collection(db, 'sessions');
        const q = query(sessionsRef);

        unsubscribe = onSnapshot(q, (snapshot) => {
          const now = Date.now();
          const ALIVE_WINDOW_MS = 90_000; // 90 seconds (3 heartbeats)

          const activeSessions = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(s => {
              if (!s.heartbeat) return false;
              // Firestore Timestamp → millis
              const hbMs = s.heartbeat.toMillis ? s.heartbeat.toMillis() : Date.parse(s.heartbeat);
              return (now - hbMs) < ALIVE_WINDOW_MS;
            });

          setState({ count: activeSessions.length, sessions: activeSessions });
        });
      } catch (e) {
        console.warn('[ActiveSessions] Subscription failed:', e.message);
      }
    };

    subscribe();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  return state;
}
