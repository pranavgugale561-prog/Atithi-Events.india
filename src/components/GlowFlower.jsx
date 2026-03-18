import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FLOWER_VARIANTS = [
  // 1. Simple Bloom
  (color) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="10" fill={color} />
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <ellipse key={deg} cx="50" cy="30" rx="8" ry="20" fill={color} style={{ transform: `rotate(${deg}deg)`, transformOrigin: '50% 50%' }} />
      ))}
    </svg>
  ),
  // 2. Leafy Sprout
  (color) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 90 Q50 50 50 10" stroke={color} strokeWidth="4" fill="none" />
      <path d="M50 60 Q20 40 10 60" fill={color} />
      <path d="M50 50 Q80 30 90 50" fill={color} />
      <path d="M50 30 Q30 10 20 30" fill={color} />
    </svg>
  ),
  // 3. Star Flower
  (color) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <path key={deg} d="M50 50 L50 10 L45 50 Z" fill={color} style={{ transform: `rotate(${deg}deg)`, transformOrigin: '50% 50%' }} />
      ))}
      <circle cx="50" cy="50" r="8" fill="#fff" />
    </svg>
  ),
  // 4. Bell Flower
  (color) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 90 Q50 60 70 40" stroke={color} strokeWidth="2" fill="none" />
      <path d="M70 40 Q85 30 70 10 Q55 30 70 40" fill={color} />
      <path d="M50 90 Q50 70 30 50" stroke={color} strokeWidth="2" fill="none" />
      <path d="M30 50 Q15 40 30 20 Q45 40 30 50" fill={color} />
    </svg>
  )
];

export default function GlowFlower({ x, y, onComplete }) {
  const [variantIndex] = useState(() => Math.floor(Math.random() * FLOWER_VARIANTS.length));
  const [rotation] = useState(() => Math.random() * 360);
  const [size] = useState(() => 20 + Math.random() * 20);
  
  useEffect(() => {
    const timer = setTimeout(onComplete, 60000); // Live for 1 minute
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: [0, 1, 1, 0] }}
      transition={{ 
        scale: { duration: 1.5, ease: "easeOut" },
        opacity: { times: [0, 0.1, 0.9, 1], duration: 60 } 
      }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        pointerEvents: 'none',
        zIndex: 9998,
        filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.6))',
      }}
    >
      {FLOWER_VARIANTS[variantIndex]("#d4af37")}
    </motion.div>
  );
}
