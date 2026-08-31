import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useScrollSpeed } from '../hooks/useScrollSpeed';
import { ArrowDown, Heart } from 'lucide-react';
import { getHeroImages } from '../utils/services';

// Premium Bokeh and Sparkle elements
const GoldenOrb = ({ style, delay = 0, size = 100 }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0) 70%)',
      filter: 'blur(8px)',
      ...style
    }}
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const StarSparkle = ({ style, delay = 0, size = 24 }) => (
  <motion.svg
    viewBox="0 0 24 24"
    style={{ position: 'absolute', width: size, filter: 'drop-shadow(0px 0px 4px rgba(212,175,55,0.8))', ...style }}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    whileInView={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5], rotate: [0, 90, 180] }}
    transition={{ duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5Z" fill="var(--accent-gold)" opacity="0.9" />
  </motion.svg>
);

export default function Hero() {
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    getHeroImages().then(res => setImages(res));
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 5000); // 5 seconds per image
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const scrollSpeed = useScrollSpeed();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
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
      {/* Background Hero Banner Slider */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            key={currentIndex}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: '-20%',
              zIndex: 0,
              y: parallaxY,
              backgroundImage: `url("${isMobile && images[currentIndex]?.mobileUrl ? images[currentIndex]?.mobileUrl : images[currentIndex]?.url}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
            }}
          />
        )}
      </AnimatePresence>
      {/* Floating Elements — Left Side */}
      <motion.div style={{ y: y1, rotate: rotate1 }}>
        <GoldenOrb style={{ top: '15%', left: '5%' }} size={120} delay={0.2} />
      </motion.div>
      <motion.div style={{ y: y2, rotate: rotate2 }}>
        <StarSparkle style={{ top: '35%', left: '8%' }} size={32} delay={0.4} />
      </motion.div>
      <motion.div style={{ y: y3 }}>
        <GoldenOrb style={{ top: '60%', left: '3%' }} size={80} delay={0.6} />
      </motion.div>
      <motion.div style={{ y: y1 }}>
        <StarSparkle style={{ top: '25%', left: '12%' }} size={40} delay={0.3} />
      </motion.div>

      {/* Floating Elements — Right Side */}
      <motion.div style={{ y: y2, rotate: rotate1 }}>
        <GoldenOrb style={{ top: '12%', right: '6%' }} size={140} delay={0.3} />
      </motion.div>
      <motion.div style={{ y: y1, rotate: rotate2 }}>
        <StarSparkle style={{ top: '45%', right: '4%' }} size={24} delay={0.5} />
      </motion.div>
      <motion.div style={{ y: y3 }}>
        <GoldenOrb style={{ top: '55%', right: '10%' }} size={100} delay={0.4} />
      </motion.div>
      <motion.div style={{ y: y2 }}>
        <StarSparkle style={{ top: '70%', right: '7%' }} size={36} delay={0.7} />
      </motion.div>

      {/* Top corners */}
      <motion.div style={{ y: y1 }}>
        <GoldenOrb style={{ top: '5%', left: '20%' }} size={160} delay={0.1} />
      </motion.div>
      <motion.div style={{ y: y2 }}>
        <StarSparkle style={{ top: '8%', right: '18%' }} size={28} delay={0.2} />
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
