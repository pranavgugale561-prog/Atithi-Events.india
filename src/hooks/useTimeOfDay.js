import { useEffect } from 'react';

export function useTimeOfDay() {
  useEffect(() => {
    // Always use the dark gold theme
    document.documentElement.removeAttribute('data-theme');
  }, []);

  return 'dark';
}
