import { motion } from 'framer-motion';

export default function WhySocialMedia() {
  const valueProps = [
    { title: 'The Unfiltered Reality', desc: 'Mainstream wedding videos are beautiful, but BTS reels capture the raw, unfiltered madness and joy.' },
    { title: 'Instant Sharing', desc: 'No need to wait 3 months for the wedding film. Get your reels within 24 hours to share with friends and family.' },
    { title: 'The Digital Wedding Album', desc: 'Your personalized hashtag becomes a living, breathing digital album curated by a professional social media manager.' },
    { title: 'Relieving Your Friends', desc: 'Let your friends enjoy the Sangeet rather than holding their phones all night. We\'ll handle the content.' },
    { title: 'Viral Potential', desc: 'From coordinated family dances to emotional first looks, we edit your videos to trending audio tracks.' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Trending Your Love Story
        </span>
        <h1 className="section-title mt-4 mb-6">Why Shaadi BTS & Social Media?</h1>
        <p className="text-muted max-w-[700px] mx-auto" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          In the age of Instagram and TikTok, your wedding deserves its own digital premiere. 
          Our Shaadi BTS team ensures every laugh, fumble, and tear goes straight to your feed.
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem',
        justifyContent: 'center' 
      }}>
        {valueProps.map((prop, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', borderBottom: '2px solid var(--accent-gold)' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              #{prop.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {prop.desc}
            </p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 flex flex-col items-center justify-center glass py-16 px-8"
        style={{ borderRadius: '32px', textAlign: 'center' }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Don't let your wedding memories stay stuck on a hard drive.
        </h2>
        <p style={{ color: 'var(--accent-gold)', marginBottom: '2rem', fontStyle: 'italic', fontSize: '1.2rem' }}>
          Book our BTS & Social Media Management package today.
        </p>
        <a href="/#services" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: 'transparent',
          color: 'var(--accent-gold)',
          border: '1px solid var(--accent-gold)',
          borderRadius: '30px',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Explore Services
        </a>
      </motion.div>
    </div>
  );
}
