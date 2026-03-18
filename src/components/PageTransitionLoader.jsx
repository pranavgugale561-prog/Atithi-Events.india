import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTransitionLoader
 * A cinematic golden bar + flash overlay that plays every time the route changes.
 * Eliminates the "stuck" feeling between pages.
 */
export default function PageTransitionLoader() {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // Kill previous
    clearTimeout(timerRef.current);
    setProgress(0);
    setTransitioning(true);

    // Fast fill: 0→80% in 200ms, then stall, then 100% after content loads
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 8;
      if (p >= 85) {
        p = 85;
        clearInterval(interval);
      }
      setProgress(p);
    }, 40);

    // Complete bar after a short delay (simulates page mount)
    timerRef.current = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setTransitioning(false);
        setProgress(0);
      }, 350);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {transitioning && (
        <>
          {/* Slim top progress bar */}
          <motion.div
            key="bar"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              zIndex: 999999,
              background: 'rgba(0,0,0,0.1)',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #d4af37, #ffd700, #ffe566, #ffd700, #d4af37)',
                backgroundSize: '200% 100%',
                borderRadius: '0 2px 2px 0',
                boxShadow: '0 0 12px rgba(212,175,55,0.8), 0 0 24px rgba(255,215,0,0.4)',
              }}
              animate={{
                width: `${progress}%`,
                backgroundPosition: ['0% 50%', '200% 50%'],
              }}
              transition={{
                width: { duration: 0.15, ease: 'easeOut' },
                backgroundPosition: { duration: 1.2, repeat: Infinity, ease: 'linear' },
              }}
            />
          </motion.div>

          {/* Subtle dark flash overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000',
              zIndex: 99998,
              pointerEvents: 'none',
            }}
          />

          {/* Center glyph pulse */}
          <motion.div
            key="glyph"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1.1, 1.4] }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              pointerEvents: 'none',
            }}
          >
            <span style={{
              fontSize: '3rem',
              color: '#ffd700',
              textShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(212,175,55,0.5)',
            }}>
              ✦
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
