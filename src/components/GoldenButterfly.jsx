import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const BUTTERFLY_SVG = (
  <svg viewBox="0 0 100 100" width="30" height="30">
    {/* Body */}
    <ellipse cx="50" cy="50" rx="3" ry="12" fill="#8a6d1e" />
    {/* Wings - Left */}
    <motion.path
      d="M50 50 Q10 10 10 50 Q10 90 50 60"
      fill="url(#goldGradient)"
      animate={{ rotateY: [0, 60, 0] }}
      transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
      style={{ originX: "50px", transformOrigin: "left" }}
    />
    {/* Wings - Right */}
    <motion.path
      d="M50 50 Q90 10 90 50 Q90 90 50 60"
      fill="url(#goldGradient)"
      animate={{ rotateY: [0, -60, 0] }}
      transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
      style={{ originX: "50px", transformOrigin: "right" }}
    />
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#b8860b" />
      </linearGradient>
    </defs>
  </svg>
);

export default function GoldenButterfly() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isSitting, setIsSitting] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const lastTargetRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const findNewTarget = () => {
      // Find interactive elements to "perch" on
      const targets = document.querySelectorAll('.btn-squishy, .nav-link, .glass-card, .mobile-nav-item, h2.section-title');
      if (targets.length === 0) return null;
      
      // Filter out hidden or small elements
      const visibleTargets = Array.from(targets).filter(t => {
        const rect = t.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.top > 0 && rect.top < window.innerHeight;
      });

      if (visibleTargets.length === 0) return null;
      
      let newTarget;
      do {
        newTarget = visibleTargets[Math.floor(Math.random() * visibleTargets.length)];
      } while (newTarget === lastTargetRef.current && visibleTargets.length > 1);
      
      lastTargetRef.current = newTarget;
      return newTarget.getBoundingClientRect();
    };

    const flyTo = async (targetRect) => {
      setIsSitting(false);
      
      const startX = position.x;
      const startY = position.y;
      
      // Calculate a "random" path point for organic feel
      const midX = (startX + targetRect.left) / 2 + (Math.random() - 0.5) * 200;
      const midY = (startY + targetRect.top) / 2 - 150;

      // Rotate towards destination
      const angle = Math.atan2(targetRect.top - startY, targetRect.left - startX) * (180 / Math.PI);
      setRotation(angle + 90);

      await controls.start({
        x: [startX, midX, targetRect.left + targetRect.width / 2],
        y: [startY, midY, targetRect.top],
        transition: { 
          duration: 2.5 + Math.random(), 
          ease: "easeInOut",
          times: [0, 0.4, 1]
        }
      });

      setIsSitting(true);
      setPosition({ x: targetRect.left + targetRect.width / 2, y: targetRect.top });
      // Gentle flutter when sitting
      setRotation(Math.random() * 360);
    };

    const cycle = async () => {
      // Small delay initially
      await new Promise(r => setTimeout(r, 2000));
      
      while (mountedRef.current) {
        const target = findNewTarget();
        if (target) {
          await flyTo(target);
          // Sit for a while
          if (mountedRef.current) {
            await new Promise(r => setTimeout(r, 4000 + Math.random() * 8000));
          }
        } else {
          // If no targets content ourselves with center or random orbit
          if (mountedRef.current) {
            await controls.start({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: { duration: 5 }
            });
            await new Promise(r => setTimeout(r, 2000));
          }
        }
      }
    };

    cycle();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <motion.div
      animate={controls}
      initial={{ x: -100, y: -100 }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))',
      }}
    >
      <motion.div
        animate={{ 
          rotate: rotation,
          scale: isSitting ? 0.8 : 1.2,
          y: isSitting ? 0 : [0, -10, 0]
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Butterfly Wings with faster flapping when flying */}
        <div style={{ transform: `scale(${isSitting ? 0.7 : 1})` }}>
          <svg viewBox="0 0 100 100" width="40" height="40" style={{ overflow: 'visible' }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7ad" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#8a6d1e" />
              </linearGradient>
            </defs>
            
            {/* Left Wing */}
            <motion.path
              d="M50 50 C20 10 5 30 5 50 C5 70 20 90 50 60"
              fill="url(#goldGrad)"
              animate={{ 
                rotateY: isSitting ? [0, 45, 0] : [0, 75, 0],
              }}
              transition={{ 
                duration: isSitting ? 0.8 : 0.15, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ originX: "50px" }}
            />
            
            {/* Right Wing */}
            <motion.path
              d="M50 50 C80 10 95 30 95 50 C95 70 80 90 50 60"
              fill="url(#goldGrad)"
              animate={{ 
                rotateY: isSitting ? [0, -45, 0] : [0, -75, 0],
              }}
              transition={{ 
                duration: isSitting ? 0.8 : 0.15, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ originX: "50px" }}
            />
            
            {/* Body */}
            <ellipse cx="50" cy="52" rx="2" ry="10" fill="#4a3710" filter="url(#glow)" />
            {/* Antennae */}
            <path d="M48 42 Q45 35 40 32" fill="none" stroke="#d4af37" strokeWidth="0.5" />
            <path d="M52 42 Q55 35 60 32" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
