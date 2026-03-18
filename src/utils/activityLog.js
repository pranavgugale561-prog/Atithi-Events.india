const STORAGE_KEY = 'atithi_activity_log';

export function logActivity(type, detail) {
  const log = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  log.unshift({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    type,
    detail,
    timestamp: new Date().toISOString(),
  });
  // Keep last 200 entries
  if (log.length > 200) log.length = 200;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

export function getActivityLog() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function clearActivityLog() {
  localStorage.setItem(STORAGE_KEY, '[]');
}
