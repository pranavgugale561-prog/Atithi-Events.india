import { useState, useEffect, useRef } from 'react';

export function useScrollSpeed() {
  const [speed, setSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const dy = Math.abs(window.scrollY - lastScrollY.current);
        const v = dy / dt;
        setSpeed(Math.min(v * 100, 100));
      }
      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return speed;
}
