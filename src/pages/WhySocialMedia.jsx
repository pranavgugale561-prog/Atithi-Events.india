import { Smartphone, Instagram, Send, Play } from 'lucide-react';
import Footer from '../components/Footer';

export default function WhySocialMedia() {
  const valueProps = [
    { title: 'The Unfiltered Reality', desc: 'Mainstream wedding videos are beautiful, but BTS reels capture the raw, unfiltered madness and joy.' },
    { title: 'Instant Sharing', desc: 'No need to wait 3 months for the wedding film. Get your reels within 24 hours to share with friends and family.' },
    { title: 'The Digital Wedding Album', desc: 'Your personalized hashtag becomes a living, breathing digital album curated by a professional social media manager.' },
    { title: 'Relieving Your Friends', desc: "Let your friends enjoy the Sangeet rather than holding their phones all night. We'll handle the content." },
    { title: 'Viral Potential', desc: 'From coordinated family dances to emotional first looks, we edit your videos to trending audio tracks.' }
  ];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="text-center mb-16">
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Trending Your Love Story
        </span>
        <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Why Shaadi BTS &amp; Social Media?</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
          In the age of Instagram and TikTok, your wedding deserves its own digital premiere.
          Our Shaadi BTS team ensures every laugh, fumble, and tear goes straight to your feed.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        justifyContent: 'center'
      }}>
        {valueProps.map((prop, i) => (
          <div
            key={i}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', borderBottom: '2px solid var(--accent-gold)' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              #{prop.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {prop.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Reel Showcase */}
      <div style={{ marginTop: '6rem', marginBottom: '6rem' }}>
        <div
          className="glass"
          style={{ borderRadius: '32px', padding: '4rem 2rem', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem' }}
        >
          {/* Phone Frame Mockup */}
          <div style={{
            width: '280px',
            height: '560px',
            background: '#000',
            borderRadius: '40px',
            border: '8px solid #1a1a1a',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, #121212, #2a2a2a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={48} color="var(--accent-gold)" />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ width: '60%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
              <div style={{ width: '40%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              From Camera to Feed in 24 Hours
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              We don't just record; we curate. Our on-site editors turn raw moments into viral-ready reels before your Sangeet even ends. No more waiting months to share your joy.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Smartphone, text: 'iPhone 15 Pro Max / 16 Pro Shoots' },
                { icon: Instagram, text: 'Custom Trending Audio Curation' },
                { icon: Send, text: 'Instant WhatsApp Previews' }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent-gold)', fontWeight: 500 }}>
                  <item.icon size={20} />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="glass"
        style={{ borderRadius: '32px', padding: '4rem 2rem', textAlign: 'center', border: '1px solid rgba(212,175,55,0.2)' }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Don't let your wedding memories stay stuck on a hard drive.
        </h2>
        <p style={{ color: 'var(--accent-gold)', marginBottom: '2rem', fontStyle: 'italic', fontSize: '1.2rem' }}>
          Book our BTS &amp; Social Media Management package today.
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
      </div>
      <Footer />
    </div>
  );
}
