import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from '../assets/audio/bg-music.mp3';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // 1. Handle browser Autoplay policy
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Try to play on first interaction
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.warn("Autoplay still blocked:", err);
          });
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={bgMusic}
        loop
        preload="auto"
      />
      
      <div 
        style={{
          position: 'fixed',
          bottom: '180px', // High enough to clear everything
          right: '24px',
          zIndex: 9995, // Below Loader
        }}
      >
        <motion.button
          onClick={togglePlay}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass"
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isPlaying ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${isPlaying ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: isPlaying ? 'var(--accent-gold)' : 'var(--text-muted)',
            cursor: 'pointer',
            boxShadow: isPlaying ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'none',
          }}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="on"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
              >
                <Volume2 size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="off"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
              >
                <VolumeX size={20} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated sound waves when playing */}
          {isPlaying && (
            <div style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              display: 'flex',
              gap: '2px',
              alignItems: 'flex-end',
              height: '10px'
            }}>
              {[0.5, 0.8, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [2, 10, 2] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay }}
                  style={{ width: '2px', background: 'var(--accent-gold)', borderRadius: '1px' }}
                />
              ))}
            </div>
          )}
        </motion.button>
      </div>
    </>
  );
}
