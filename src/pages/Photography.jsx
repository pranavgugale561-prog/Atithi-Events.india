import { motion } from 'framer-motion';

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
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
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
      
      {/* Placeholder for Photo Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="glass"
        style={{ borderRadius: '24px', padding: '4rem 2rem', textAlign: 'center', border: '1px dashed var(--accent-gold)' }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Portfolio Showcase
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          "Photographs are a return ticket to a moment otherwise gone."
        </p>
        <div style={{ marginTop: '2rem', color: 'var(--accent-gold)' }}>
          [ Client Galleries & Drone Footage Reels Will Be Displayed Here ]
        </div>
      </motion.div>
    </div>
  );
}
