import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Golden dust particles
function GoldenParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
      opacity: Math.random() * 0.6 + 0.2,
    })), []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}), rgba(255,215,0,0))`,
            boxShadow: `0 0 ${p.size * 2}px rgba(212,175,55,${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -60 - Math.random() * 80, -120 - Math.random() * 60],
            x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
            opacity: [0, p.opacity, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// Ornamental divider
function OrnamentDivider({ progress }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
      <motion.div
        style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--accent-gold))', flex: 1 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 12,
          height: 12,
          border: '1px solid var(--accent-gold)',
          transform: 'rotate(45deg)',
          opacity: 0.7,
        }}
      />
      <motion.div
        style={{ height: 1, background: 'linear-gradient(90deg, var(--accent-gold), transparent)', flex: 1 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </div>
  );
}

const TAGLINES = [
  'Curating your dream celebration…',
  'Setting the stage for magic…',
  'Every detail, perfected…',
  'Your story, our craft…',
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasShown, setHasShown] = useState(false);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setShowEnter(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  useEffect(() => {
    if (sessionStorage.getItem('atithi_loaded')) {
      setIsVisible(false);
      onComplete?.();
      return;
    }
    setHasShown(true);

    const progressDuration = 5400; // Progress bar takes 5.4s
    const startTime = performance.now();
    let animationFrame;

    const finish = () => {
      cancelAnimationFrame(animationFrame);
      setIsReady(true);
      // We wait for the "Begin Experience" click to call setIsVisible(false)
    };

    // Safety timeout — if rAF stalls, still show Enter button after 6s
    const safetyTimeout = setTimeout(finish, 6000);

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / progressDuration) * 100, 100);
      setProgress(newProgress);

      if (elapsed < progressDuration) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        // Instead of automatic finish, we'll wait for user or just a tiny delay
        // But for "Automatic Music", we need a CLICK.
        // So we transition to a "Ready" state.
        setIsReady(true);
        clearTimeout(safetyTimeout);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  // Cycle taglines
  useEffect(() => {
    if (!hasShown) return;
    const t = setInterval(() => setTaglineIdx(i => (i + 1) % TAGLINES.length), 2200);
    return () => clearInterval(t);
  }, [hasShown]);

  if (!hasShown && !isVisible) return null;

  const brandName = 'Atithi';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ flexDirection: 'column', zIndex: 1000000 }}
        >
          <GoldenParticles />

          {/* Central spinner ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'relative', width: 140, height: 140, marginBottom: 32 }}
          >
            {/* Outer rotating ring */}
            <svg
              viewBox="0 0 140 140"
              fill="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <circle
                cx="70" cy="70" r="64"
                stroke="rgba(212,175,55,0.1)"
                strokeWidth="1"
                fill="none"
              />
              <motion.circle
                cx="70" cy="70" r="64"
                stroke="url(#goldGrad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="402.12"
                strokeDashoffset={402.12 * (1 - progress / 100)}
                style={{ filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.5))' }}
              />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="140" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner pulsing glow */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 20,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Sparkle star icon */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.div>

            {/* Orbiting dot */}
            <motion.div
              style={{
                position: 'absolute',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#ffd700',
                boxShadow: '0 0 16px rgba(255,215,0,0.8), 0 0 32px rgba(212,175,55,0.4)',
                top: 2,
                left: '50%',
                marginLeft: -3,
                transformOrigin: '3px 68px',
              }}
              animate={{ rotate: progress * 3.6 }}
              transition={{ duration: 0 }}
            />
          </motion.div>

          {/* Brand Logo */}
          <motion.div
            style={{ marginBottom: 4 }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <img 
              src="/logo.png" 
              alt="Atithi Events" 
              style={{
                height: '120px',
                objectFit: 'contain',
                borderRadius: '20px',
                boxShadow: '0 0 30px rgba(212,175,55,0.3)'
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{
              fontSize: '0.7rem',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            Events & Celebrations
          </motion.p>

          <OrnamentDivider progress={progress} />

          {/* Rotating tagline */}
          <div style={{ height: 24, overflow: 'hidden', position: 'relative', width: 280, textAlign: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIdx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '0.03em',
                }}
              >
                {TAGLINES[taglineIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <AnimatePresence mode="wait">
            {!showEnter ? (
              <motion.div
                key="progress"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{
                  width: 200,
                  height: 2,
                  background: 'rgba(212,175,55,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  marginTop: 24,
                }}>
                  <motion.div
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--accent-gold), #ffd700, var(--accent-gold))',
                      borderRadius: 2,
                      width: `${progress}%`,
                      boxShadow: '0 0 10px rgba(212,175,55,0.5)',
                    }}
                  />
                </div>
                <motion.p
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    fontVariantNumeric: 'tabular-nums',
                    marginTop: 10,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                  animate={{ opacity: [0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                >
                  {Math.round(progress)}%
                </motion.p>
              </motion.div>
            ) : (
              <motion.button
                key="enter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // The audio listener in BackgroundMusic.jsx will catch this click!
                  const finish = () => {
                    setIsVisible(false);
                    sessionStorage.setItem('atithi_loaded', 'true');
                    onComplete?.();
                  };
                  finish();
                }}
                className="btn-squishy"
                style={{
                  marginTop: 24,
                  padding: '12px 36px',
                  fontSize: '0.9rem',
                  background: 'var(--accent-gold)',
                  color: '#000',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Begin Experience
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
