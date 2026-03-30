import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543329729-eb741005ca65?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop'
];

export default function JourneyCarousel() {
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
            duration: 30, // adjust speed
            ease: 'linear',
          },
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div key={index} style={{ paddingRight: '1.5rem' }}>
            <div
              style={{
                width: '280px',
                height: '200px',
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                flexShrink: 0
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
