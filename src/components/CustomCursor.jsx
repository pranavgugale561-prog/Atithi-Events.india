import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const [isTouch, setIsTouch] = useState(false);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.glass-card') || 
        target.closest('.interactive') ||
        target.style.cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999999 }}>
      {/* Main Cursor Dot */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-gold)',
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          boxShadow: '0 0 10px var(--accent-gold)',
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
        }}
      />

      {/* Lagging Ring */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid var(--accent-gold)',
          x: cursorX.get() - 16,
          y: cursorY.get() - 16,
          opacity: 0.5,
        }}
        animate={{
          scale: isHovering ? 2 : (isClicking ? 0.9 : 1),
          opacity: isHovering ? 0.8 : 0.5,
          borderWidth: isHovering ? '2px' : '1px',
        }}
      />

      {/* Click Ripple Effect (simplified) */}
      {isClicking && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          style={{
            position: 'absolute',
            left: mousePos.x - 16,
            top: mousePos.y - 16,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'var(--accent-gold)',
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
}
