import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceSection from '../components/ServiceSection';
import MoodBoard from '../components/MoodBoard';

function DiscoverSection() {
  const features = [
    { title: 'Cinematic Photography', desc: 'Explore our cinematic wedding films, drone shoots, and candid memories.', link: '/photography', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop' },
    { title: 'Shaadi BTS & Social Media', desc: 'Instant viral reels and raw, unfiltered joy straight to your feed.', link: '/why-social-media', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop' },
    { title: 'The Event Academy', desc: 'Join our professional event planning and management masterclasses.', link: '/classes', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop' },
    { title: 'Why Hire a Planner?', desc: 'Discover how we turn chaos into a seamless, stress-free celebration.', link: '/why-planner', img: 'https://images.unsplash.com/photo-1543329729-eb741005ca65?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <section className="section-container" style={{ padding: '4rem 24px' }}>
      <div className="text-center mb-12">
        <h2 className="section-title">Discover the Magic</h2>
        <p className="section-subtitle">Delve deeper into how we craft your perfect day.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
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
      <section id="timeline">
        <Link to="/timeline" style={{ textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass" 
            style={{ 
              margin: '2rem 24px', 
              padding: '3rem', 
              textAlign: 'center',
              border: '1px solid var(--accent-gold)',
              cursor: 'pointer'
            }}
          >
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Process Timeline</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Step-by-step journey of your celebration →</p>
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

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '48px 24px 32px',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 48,
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.6rem',
          color: 'var(--text-primary)',
          marginBottom: 8,
          fontWeight: 400,
        }}>
          Atithi Events
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
          Where every celebration becomes a masterpiece.
        </p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 20 }}>
          {['Instagram', 'Pinterest', 'WhatsApp', 'Email'].map(link => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-coral)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {link}
            </a>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          © 2026 Atithi Events. Crafted with love.
        </p>
      </footer>
    </>
  );
}
