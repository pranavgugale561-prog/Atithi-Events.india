import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import JourneyCarousel from '../components/JourneyCarousel';
import ServiceSection from '../components/ServiceSection';
import MoodBoard from '../components/MoodBoard';
import Footer from '../components/Footer';

function DiscoverSection() {
  const features = [
    { title: 'Cinematic Photography', desc: 'Explore our cinematic wedding films, drone shoots, and candid memories.', link: '/photography', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop' },
    { title: 'Shaadi BTS & Social Media', desc: 'Instant viral reels and raw, unfiltered joy straight to your feed.', link: '/shaadi-bts', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop' },
    { title: 'The Event Academy', desc: 'Join our professional event planning and management masterclasses.', link: '/academy', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop' },
    { title: 'Why Hire a Planner?', desc: 'Discover how we turn chaos into a seamless, stress-free celebration.', link: '/why-planner', img: 'https://images.unsplash.com/photo-1543329729-eb741005ca65?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <section className="section-container" style={{ padding: 'clamp(40px, 8vw, 80px) 24px' }}>
      <div className="text-center mb-12">
        <h2 className="section-title">Discover the Magic</h2>
        <p className="section-subtitle">Delve deeper into how we craft your perfect day.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
        {features.map((feat, i) => (
          <Link to={feat.link} key={i} style={{ textDecoration: 'none' }}>
            <motion.div
              className="glass"
              whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(212,175,55,0.2)' }}
              style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', border: '1px solid var(--glass-border)' }}
            >
              <div style={{ height: 200, backgroundImage: `url(${feat.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', fontFamily: "'Cormorant Garamond', serif" }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{feat.desc}</p>
                <span style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Explore →
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <JourneyCarousel />
      <section id="timeline" style={{ position: 'relative', zIndex: 10, padding: 'clamp(40px, 8vw, 80px) 24px' }}>
        <Link to="/timeline" style={{ textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ scale: 1.01, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ 
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              background: 'var(--bg-primary)'
            }}
            onMouseOver={(e) => {
              const bg = e.currentTarget.querySelector('.journey-bg');
              if(bg) bg.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              const bg = e.currentTarget.querySelector('.journey-bg');
              if(bg) bg.style.transform = 'scale(1)';
            }}
          >
            {/* Cinematic Background Image */}
            <div 
              className="journey-bg"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4,
                transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }} 
            />

            {/* Gradient Overlay for Depth & Text Readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(6,5,10,0.95) 0%, rgba(6,5,10,0.3) 50%, rgba(6,5,10,0.95) 100%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(6,5,10,0.9) 0%, transparent 50%, rgba(6,5,10,0.4) 100%)',
            }} />

            {/* Rich Typography Content */}
            <div style={{ position: 'relative', zIndex: 2, padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              <span style={{ 
                color: 'var(--accent-gold)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.25em', 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                display: 'block', 
                marginBottom: '16px' 
              }}>
                Explore The Itinerary
              </span>
              
              <h2 style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
                color: '#fff', 
                marginBottom: '1rem', 
                lineHeight: 1.1, 
                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                fontStyle: 'italic'
              }}>
                Our Journey
              </h2>
              
              <div style={{ width: '80px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto 1.5rem auto', opacity: 0.7 }} />
              
              <p style={{ 
                color: 'rgba(255,255,255,0.85)', 
                fontSize: '1.1rem', 
                margin: '0 auto', 
                lineHeight: 1.6 
              }}>
                Discover the step-by-step chronology of your celebration. A meticulously crafted timeline ensuring every unforgettable moment unfolds perfectly.
              </p>
              
              <div style={{ 
                marginTop: '2.5rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '12px', 
                color: 'var(--accent-gold)', 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                border: '1px solid var(--accent-gold)',
                padding: '12px 32px',
                borderRadius: '100px',
                background: 'rgba(212,175,55,0.05)'
              }}>
                View Full Timeline 
                <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                  →
                </motion.span>
              </div>
            </div>
          </motion.div>
        </Link>
      </section>
      <div id="services">
        <ServiceSection />
      </div>
      <DiscoverSection />
      <div id="mood-board">
        <MoodBoard />
      </div>

      <Footer />
    </>
  );
}
