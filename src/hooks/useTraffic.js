import { useEffect } from 'react';
import { logActivity } from '../utils/activityLog';
import { trackEvent } from '../firebase';

export function useTraffic() {
  useEffect(() => {
    const traffic = JSON.parse(localStorage.getItem('atithi_traffic') || '{}');
    const today = new Date().toISOString().slice(0, 10);

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
      traffic.uniqueVisitors = (traffic.uniqueVisitors || 0) + 1;
      sessionStorage.setItem('atithi_visited', 'true');
      
      // Track new unique visit in Firebase
      trackEvent('new_visitor', { timestamp: new Date().toISOString() });

      // Async fetch IP and log
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          const ip = data.ip || 'Unknown IP';
          const loc = data.city ? `${data.city}, ${data.country_name}` : 'Unknown Location';
          traffic.lastIp = ip;
          traffic.ipHits[ip] = (traffic.ipHits[ip] || 0) + 1;
          localStorage.setItem('atithi_traffic', JSON.stringify(traffic));
          logActivity('visit', `New visitor arrived from ${loc} (IP: ${ip})`);
          // Track location in Firebase
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
      // Log session duration to Firebase
      trackEvent('session_end', { duration_seconds: duration });
    };
  }, []);
}

export function getTrafficData() {
  return JSON.parse(localStorage.getItem('atithi_traffic') || '{"totalViews":0,"uniqueVisitors":0,"avgDuration":0,"dailyViews":{}}');
}
