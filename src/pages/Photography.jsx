import { motion } from 'framer-motion';
import { Camera, Film, Wind, Heart, Star, Sparkles, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import BackgroundMusic from '../components/BackgroundMusic';

export default function Photography() {
  const services = [
    { title: 'Candid Photography', desc: 'Capturing the unscripted, raw emotions of your special day.' },
    { title: 'Cinematic Videography', desc: 'High-quality, movie-style wedding films that tell your unique love story.' },
    { title: 'Drone Shoots', desc: 'Breathtaking aerial views of your venue, baraat, and couple portraits.' },
    { title: 'Pre-Wedding Shoots', desc: 'Thematic, conceptualized shoots to celebrate your bond before the big day.' },
    { title: 'Traditional Photography', desc: 'Ensuring every ritual, guest, and family member is beautifully documented.' },
    { title: 'Same Day Edit Reels', desc: 'Instant short films and reels delivered on the same day to share with the world.' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Freezing Moments in Time
        </span>
        <h1 className="section-title mt-4 mb-6">Wedding Photography & Films</h1>
        <p className="text-muted max-w-[700px] mx-auto" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          Long after the mandap is taken down and the music fades, your photos and films are the only tangible memories of your magical day.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              {service.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
      
      {/* Professional Gallery Showcase */}
      <div className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Portfolio Showcase
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto' }}></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { img: '/assets/photography/shot1.png', title: 'Golden Hour Portraits', category: 'Candid' },
            { img: '/assets/photography/shot2.png', title: 'Emotional Noir', category: 'Black & White' },
            { img: '/assets/photography/shot3.png', title: 'Grand Venue Vistas', category: 'Drone' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass"
              style={{ padding: '0.8rem', borderRadius: '20px', overflow: 'hidden' }}
            >
              <div style={{ 
                height: '400px', 
                borderRadius: '14px', 
                overflow: 'hidden', 
                position: 'relative' 
              }}>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }}
                className="gallery-overlay"
                >
                  <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.category}</span>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', margin: '0.3rem 0', fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .glass:hover .gallery-overlay { opacity: 1 !important; }
      `}</style>
      <Footer />
    </div>
  );
}
