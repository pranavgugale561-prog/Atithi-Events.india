import Footer from '../components/Footer';

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
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div className="text-center mb-16">
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Freezing Moments in Time
        </span>
        <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Wedding Photography &amp; Films</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Long after the mandap is taken down and the music fades, your photos and films are the only tangible memories of your magical day.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {services.map((service, i) => (
          <div
            key={i}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              {service.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Professional Gallery Showcase */}
      <div style={{ marginBottom: '6rem' }}>
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Portfolio Showcase
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto' }}></div>
        </div>

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
            <div
              key={i}
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
            </div>
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
