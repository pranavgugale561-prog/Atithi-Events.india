import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasShown, setHasShown] = useState(false);

  // Mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid interaction
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  // Transform values for 3D tilt effect on the logo
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  // Background shifts
  const bgOrb1X = useTransform(smoothX, [-0.5, 0.5], ['-20%', '0%']);
  const bgOrb1Y = useTransform(smoothY, [-0.5, 0.5], ['-20%', '0%']);
  
  const bgOrb2X = useTransform(smoothX, [-0.5, 0.5], ['0%', '-20%']);
  const bgOrb2Y = useTransform(smoothY, [-0.5, 0.5], ['0%', '-20%']);

  useEffect(() => {
    if (sessionStorage.getItem('atithi_loaded')) {
      setIsVisible(false);
      onComplete?.();
      return;
    }
    setHasShown(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('atithi_loaded', 'true');
      
      // Wait for exit animation to complete before notifying parent
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }, 6000); // keep the page loader for 6s

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  if (!hasShown && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader-overlay"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050505',
            overflow: 'hidden',
            perspective: '1000px', // needed for 3D effects
          }}
        >
          {/* Live Interactive Background Elements */}
          <motion.div
            style={{
              position: 'absolute',
              width: '60vw',
              height: '60vw',
              background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
              top: '-10%',
              left: '-10%',
              borderRadius: '50%',
              filter: 'blur(60px)',
              x: bgOrb1X,
              y: bgOrb1Y,
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: '50vw',
              height: '50vw',
              background: 'radial-gradient(circle, rgba(184,134,11,0.15) 0%, rgba(0,0,0,0) 70%)',
              bottom: '-10%',
              right: '-10%',
              borderRadius: '50%',
              filter: 'blur(60px)',
              x: bgOrb2X,
              y: bgOrb2Y,
            }}
          />

          {/* Interactive Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ 
              position: 'relative', 
              zIndex: 10, 
              marginBottom: '2.5rem',
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: 'preserve-3d',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* White Backlight for Transparent Black Logos */}
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '320px',
                height: '160px',
                background: 'radial-gradient(ellipse, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0) 70%)',
                zIndex: -1,
                filter: 'blur(20px)',
                transform: 'translateZ(0px)',
              }}
            />
            <motion.img 
              src="/logo.png" 
              alt="Atithi Events" 
              animate={{ 
                filter: ['drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.4))', 'drop-shadow(0px 0px 30px rgba(212, 175, 55, 0.9))', 'drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.4))']
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                height: '240px',
                objectFit: 'contain',
                transform: 'translateZ(60px)', // Pushes logo forward in 3D space
              }}
            />
          </motion.div>
          
          {/* Premium Progress Loader */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
          >
            <div style={{
              width: '180px',
              height: '2px',
              background: 'rgba(212,175,55,0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '50%',
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)',
                  borderRadius: '2px'
                }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                marginTop: '1rem',
                fontFamily: '"Cormorant Garamond", serif',
                color: 'rgba(212, 175, 55, 0.8)',
                letterSpacing: '0.2em',
                fontSize: '0.85rem',
                textTransform: 'uppercase'
              }}
            >
              Curating Luxury
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
