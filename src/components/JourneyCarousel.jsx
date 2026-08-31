
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getJourneyImages } from '../utils/services';

export default function JourneyCarousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getJourneyImages().then(res => setImages(res.map(i => i.url)));
  }, []);

  if (images.length === 0) return null;

  const duplicatedImages = [...images, ...images]; // To allow seamless loop

  return (
    <div style={{ 
      overflow: 'hidden', 
      width: '100%', 
      display: 'flex', 
      padding: '2rem 0',
      background: 'rgba(0,0,0,0.3)',
      marginTop: '1rem',
      marginBottom: '1rem',
      borderTop: '1px solid var(--accent-gold)',
      borderBottom: '1px solid var(--accent-gold)',
    }}>
      <motion.div
        style={{ display: 'flex', width: 'max-content' }}
        animate={{ x: ['-50%', '0%'] }} // left to right movement
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: images.length * 5, // dynamic speed based on length
            ease: 'linear',
          },
        }}
      >
        {duplicatedImages.map((src, index) => {
          const isVideo = typeof src === 'string' && (src.match(/\.(mp4|webm|mov)$/i) || src.includes('video%2F'));
          
          return (
            <div key={index} style={{ paddingRight: '1.5rem' }}>
              <div
                style={{
                  width: '280px',
                  height: '200px',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  flexShrink: 0,
                  overflow: 'hidden',
                  background: 'var(--bg-card)'
                }}
              >
                {isVideo ? (
                  <video src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay loop muted playsInline />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
