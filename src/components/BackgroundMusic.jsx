import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from '../assets/audio/bg-music.mp3';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // 1. Attempt to play on mount (since loader interaction unlocks audio)
  useEffect(() => {
    if (hasInteracted) return;

    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(err => {
          console.warn("[BackgroundMusic] Autoplay blocked, waiting for interaction:", err);
        });
      }
    };

    // Try immediately
    playAudio();

    // Also keep listeners as fallback
    const handleFirstInteraction = () => {
      if (!hasInteracted) playAudio();
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
          bottom: '100px', // Above mobile nav
          left: '24px',   // Safe on left side
          zIndex: 9995,
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


        </motion.button>
      </div>
    </>
  );
}
