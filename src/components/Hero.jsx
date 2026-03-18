import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollSpeed } from '../hooks/useScrollSpeed';
import { ArrowDown, Heart } from 'lucide-react';

// SVG Floral elements
const FloralPetal = ({ style, delay = 0 }) => (
  <motion.svg
    viewBox="0 0 80 120"
    style={{ position: 'absolute', width: 'clamp(40px, 8vw, 80px)', ...style }}
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 0.6, scale: 1 }}
    transition={{ duration: 1.2, delay, ease: 'easeOut' }}
  >
    <ellipse cx="40" cy="60" rx="25" ry="50" fill="var(--accent-rose)" opacity="0.5" />
    <ellipse cx="40" cy="60" rx="15" ry="35" fill="var(--accent-coral)" opacity="0.3" />
    <circle cx="40" cy="60" r="6" fill="var(--accent-gold)" opacity="0.6" />
  </motion.svg>
);

const FloralLeaf = ({ style, delay = 0 }) => (
  <motion.svg
    viewBox="0 0 60 100"
    style={{ position: 'absolute', width: 'clamp(30px, 6vw, 60px)', ...style }}
    initial={{ opacity: 0, rotate: -30 }}
    whileInView={{ opacity: 0.5, rotate: 0 }}
    transition={{ duration: 1.5, delay, ease: 'easeOut' }}
  >
    <path
      d="M30 5 C10 30 5 70 30 95 C55 70 50 30 30 5Z"
      fill="var(--accent-gold)"
      opacity="0.35"
    />
    <path
      d="M30 15 L30 85"
      stroke="var(--accent-gold)"
      strokeWidth="1"
      opacity="0.4"
      fill="none"
    />
  </motion.svg>
);

const FloralRing = ({ style, delay = 0 }) => (
  <motion.svg
    viewBox="0 0 80 80"
    style={{ position: 'absolute', width: 'clamp(35px, 6vw, 65px)', ...style }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 0.4, scale: 1 }}
    transition={{ duration: 1, delay, type: 'spring', stiffness: 100 }}
  >
    <circle cx="40" cy="40" r="30" stroke="var(--accent-gold)" strokeWidth="3" fill="none" opacity="0.5" />
    <circle cx="40" cy="10" r="6" fill="var(--accent-coral)" opacity="0.5" />
  </motion.svg>
);

export default function Hero() {
  const containerRef = useRef(null);
  const scrollSpeed = useScrollSpeed();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Kinetic typography: skew based on scroll speed
  const skewFactor = Math.min(scrollSpeed * 0.15, 8);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
        zIndex: 1,
      }}
    >
      {/* Floating Florals — Left Side */}
      <motion.div style={{ y: y1, rotate: rotate1 }}>
        <FloralPetal style={{ top: '15%', left: '5%' }} delay={0.2} />
      </motion.div>
      <motion.div style={{ y: y2, rotate: rotate2 }}>
        <FloralLeaf style={{ top: '35%', left: '8%' }} delay={0.4} />
      </motion.div>
      <motion.div style={{ y: y3 }}>
        <FloralPetal style={{ top: '60%', left: '3%' }} delay={0.6} />
      </motion.div>
      <motion.div style={{ y: y1 }}>
        <FloralRing style={{ top: '25%', left: '12%' }} delay={0.3} />
      </motion.div>

      {/* Floating Florals — Right Side */}
      <motion.div style={{ y: y2, rotate: rotate1 }}>
        <FloralPetal style={{ top: '12%', right: '6%' }} delay={0.3} />
      </motion.div>
      <motion.div style={{ y: y1, rotate: rotate2 }}>
        <FloralLeaf style={{ top: '45%', right: '4%' }} delay={0.5} />
      </motion.div>
      <motion.div style={{ y: y3 }}>
        <FloralRing style={{ top: '55%', right: '10%' }} delay={0.4} />
      </motion.div>
      <motion.div style={{ y: y2 }}>
        <FloralPetal style={{ top: '70%', right: '7%' }} delay={0.7} />
      </motion.div>

      {/* Top corners */}
      <motion.div style={{ y: y1 }}>
        <FloralLeaf style={{ top: '5%', left: '20%' }} delay={0.1} />
      </motion.div>
      <motion.div style={{ y: y2 }}>
        <FloralLeaf style={{ top: '8%', right: '18%' }} delay={0.2} />
      </motion.div>

      {/* Center Content */}
      <motion.div
        style={{
          textAlign: 'center',
          zIndex: 2,
          maxWidth: '800px',
          padding: '0 24px',
          scale,
          opacity: textOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24,
          }}
        >
          <Heart size={16} color="var(--accent-coral)" fill="var(--accent-coral)" />
          <span style={{
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 500,
          }}>
            2026 Wedding Season
          </span>
          <Heart size={16} color="var(--accent-coral)" fill="var(--accent-coral)" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: 24,
            transform: `skewX(${-skewFactor}deg) scaleY(${1 + scrollSpeed * 0.001})`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          Crafting Your
          <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-coral))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontStyle: 'italic',
          }}>
            Main Character
          </span>
          <br />
          Moment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 500,
            margin: '0 auto 40px',
          }}
        >
          Where every detail is a love letter, every moment is cinematic,
          and your wedding becomes the story everyone remembers.
        </motion.p>

        {/* Space for buttons removed as per user request */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={24} color="var(--text-muted)" />
      </motion.div>
    </section>
  );
}
