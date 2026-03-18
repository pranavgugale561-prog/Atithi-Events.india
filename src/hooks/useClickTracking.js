import { useEffect } from 'react';
import { logActivity } from '../utils/activityLog';

// Elements we consider meaningful to track
const TRACKED_TAGS = new Set(['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA']);

// Labels/text to skip (too generic or spammy)
const SKIP_LABELS = new Set(['', 'x', '×', '✕', 'close', '...']);

/**
 * Walk up the DOM from the clicked element to find the nearest trackable element.
 * Returns an object with { tag, label, href, page } or null if nothing meaningful.
 */
function getTrackTarget(target) {
  let el = target;
  for (let i = 0; i < 6 && el && el !== document.body; i++) {
    const tag = el.tagName;

    if (TRACKED_TAGS.has(tag) || el.getAttribute('data-track')) {
      // Extract meaningful label
      let label =
        el.getAttribute('data-track') ||
        el.getAttribute('aria-label') ||
        el.getAttribute('placeholder') ||
        el.innerText?.trim()?.slice(0, 60) ||
        el.getAttribute('title') ||
        '';

      label = label.replace(/\s+/g, ' ').trim();

      if (SKIP_LABELS.has(label.toLowerCase())) {
        el = el.parentElement;
        continue;
      }

      return {
        tag,
        label: label || `${tag} element`,
        href: el.href || null,
        type: el.type || null,
      };
    }

    el = el.parentElement;
  }
  return null;
}

// Simple debounce so rapid double-taps only log once
let lastLog = '';
let lastLogTime = 0;

/**
 * Global click/tap tracker. Call once at the App level (not on admin pages).
 * Logs meaningful interactions (button clicks, link taps, form interactions)
 * to the Firestore activity log with the current page path.
 */
export function useClickTracking() {
  useEffect(() => {
    const handleClick = (e) => {
      const result = getTrackTarget(e.target);
      if (!result) return;

      const page = window.location.pathname;
      const detail = `Tapped "${result.label}" on ${page}`;

      // Deduplicate: skip if same action within 2 seconds
      const now = Date.now();
      if (detail === lastLog && now - lastLogTime < 2000) return;
      lastLog = detail;
      lastLogTime = now;

      // Log asynchronously — don't await, never block the UI
      logActivity('tap', detail, {
        element: result.tag,
        label: result.label,
        href: result.href || undefined,
        page,
      }).catch(() => {});
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
