import { Camera, Video, Plane, Heart, Focus, PlaySquare, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function Photography() {
  const services = [
    { icon: Focus, title: 'Candid Photography', desc: 'Capturing the unscripted, raw emotions of your special day.' },
    { icon: Video, title: 'Cinematic Videography', desc: 'High-quality, movie-style wedding films that tell your unique love story.' },
    { icon: Plane, title: 'Drone Shoots', desc: 'Breathtaking aerial views of your venue, baraat, and couple portraits.' },
    { icon: Heart, title: 'Pre-Wedding Shoots', desc: 'Thematic, conceptualized shoots to celebrate your bond before the big day.' },
    { icon: Camera, title: 'Traditional Photography', desc: 'Ensuring every ritual, guest, and family member is beautifully documented.' },
    { icon: PlaySquare, title: 'Same Day Edit Reels', desc: 'Instant short films and reels delivered on the same day to share with the world.' }
  ];

  const galleryImages = [
    { img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop', title: 'Golden Hour Portraits', category: 'Candid' },
    { img: 'https://images.unsplash.com/photo-1583939000240-690b17172314?q=80&w=1000&auto=format&fit=crop', title: 'Emotional Noir', category: 'Black & White' },
    { img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop', title: 'Grand Venue Vistas', category: 'Drone' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Cinematic Hero Header */}
      <div style={{ 
        position: 'relative', 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '6rem 2rem 4rem 2rem',
        borderBottom: '1px solid rgba(212,175,55,0.1)'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 40%, var(--bg-primary) 100%)'
        }} />

        <div className="animate-in" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.25em', fontSize: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '24px' }}
          >
            <Star size={14} /> Freezing Moments in Time <Star size={14} />
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              color: '#fff', 
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            Wedding Photography <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>&amp; Films</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '750px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}
          >
            Long after the mandap is taken down and the music fades, your photos and films are the only tangible memories of your magical day.
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem', position: 'relative', zIndex: 1 }}>
        
        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem',
          marginBottom: '7rem'
        }}>
          {services.map((service, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(212,175,55,0.08)' }}
              key={i}
              className="glass"
              style={{
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                textAlign: 'center',
                border: '1px solid rgba(212,175,55,0.15)',
                borderTop: '1px solid rgba(212,175,55,0.4)',
                background: 'linear-gradient(180deg, rgba(20,20,15,0.8) 0%, rgba(10,10,10,0.9) 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', top: -50, left: -50,
                width: 150, height: 150, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
              }} />
              
              <div style={{
                width: 64, height: 64, margin: '0 auto 2rem', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(212,175,55,0.3)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
              }}>
                <service.icon size={28} color="var(--accent-gold)" />
              </div>
              
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '1rem', lineHeight: 1.2 }}>
                {service.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Professional Gallery Showcase */}
        <div style={{ marginBottom: '6rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center" 
            style={{ marginBottom: '4rem' }}
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1rem', fontStyle: 'italic' }}>
              Portfolio Showcase
            </h2>
            <div style={{ width: '80px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto', opacity: 0.6 }}></div>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem',
          }}>
            {galleryImages.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                key={i}
                className="glass gallery-card"
                style={{ padding: '0.8rem', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <div style={{
                  height: '450px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                    pointerEvents: 'none'
                  }}>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{item.category}</span>
                    <h4 style={{ color: '#fff', fontSize: '1.6rem', margin: '0.5rem 0 0 0', fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
