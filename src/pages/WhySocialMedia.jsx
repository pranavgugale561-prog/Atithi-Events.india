import { Smartphone, Instagram, Send, Play, Heart, Star, Camera } from 'lucide-react';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function WhySocialMedia() {
  const valueProps = [
    { title: 'The Unfiltered Reality', desc: 'Mainstream wedding videos are beautiful, but BTS reels capture the raw, unfiltered madness and joy.', icon: Camera },
    { title: 'Instant Sharing', desc: 'No need to wait 3 months for the wedding film. Get your reels within 24 hours to share with friends and family.', icon: Send },
    { title: 'The Digital Wedding Album', desc: 'Your personalized hashtag becomes a living, breathing digital album curated by a professional social media manager.', icon: Heart },
    { title: 'Relieving Your Friends', desc: "Let your friends enjoy the Sangeet rather than holding their phones all night. We'll handle the content.", icon: Star },
    { title: 'Viral Potential', desc: 'From coordinated family dances to emotional first looks, we edit your videos to trending audio tracks.', icon: Instagram }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      
      {/* Premium Background Blurs */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)', zIndex: -1, filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', top: '60%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', zIndex: -1, filter: 'blur(80px)' }}></div>

      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.2em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Trending Your Love Story
        </span>
        <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)', textShadow: '0 2px 10px rgba(212,175,55,0.2)' }}>Why Shaadi BTS?</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
          In the age of Instagram and TikTok, your wedding deserves its own digital premiere.
          Our BTS team ensures every laugh, fumble, and tear goes straight to your feed.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          justifyContent: 'center'
        }}
      >
        {valueProps.map((prop, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'var(--accent-gold)' }}
            className="glass"
            style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', borderBottom: '3px solid var(--accent-gold)', transition: 'all 0.3s ease', cursor: 'default' }}
          >
            <div style={{ background: 'rgba(212,175,55,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <prop.icon color="var(--accent-gold)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              {prop.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
              {prop.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Reel Showcase */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ marginTop: '8rem', marginBottom: '8rem' }}
      >
        <div
          className="glass"
          style={{ borderRadius: '40px', padding: '4rem', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', background: 'linear-gradient(145deg, rgba(30,30,30,0.6) 0%, rgba(10,10,10,0.8) 100%)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}
        >
          {/* Phone Frame Mockup */}
          <motion.div 
            whileHover={{ rotate: [-1, 1, 0], scale: 1.02 }}
            transition={{ duration: 0.5 }}
            style={{
              width: '300px',
              height: '600px',
              background: '#000',
              borderRadius: '45px',
              border: '10px solid #1a1a1a',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 25px 60px rgba(212,175,55,0.15)',
              margin: '0 auto'
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, #121212, #2a2a2a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Play size={56} color="var(--accent-gold)" style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.5))' }} />
              </motion.div>
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
          </motion.div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              From Camera to Feed <br/><span style={{ color: 'var(--accent-gold)' }}>in 24 Hours</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              We don't just record; we curate. Our on-site editors turn raw moments into viral-ready reels before your Sangeet even ends. No more waiting months to share your joy.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { icon: Smartphone, text: 'Shot on iPhone 15 Pro Max / 16 Pro' },
                { icon: Instagram, text: 'Custom Trending Audio Curation' },
                { icon: Send, text: 'Instant WhatsApp Previews' }
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', fontSize: '1.1rem', letterSpacing: '0.5px' }}
                >
                  <div style={{ background: 'rgba(212,175,55,0.2)', padding: '10px', borderRadius: '50%' }}>
                    <item.icon size={22} color="var(--accent-gold)" />
                  </div>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Photos & Reel Gallery */}
      <div style={{ marginTop: '8rem', marginBottom: '8rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            A Glimpse of the Magic
          </h2>
          <p style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontStyle: 'italic' }}>
            Real moments, captured just for you.
          </p>
        </motion.div>

        {/* Photos Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '6rem'
          }}
        >
          {[
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800'
          ].map((img, i) => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              key={i} 
              style={{ borderRadius: '20px', overflow: 'hidden', height: '350px', boxShadow: '0 15px 30px rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.1)' }}
            >
              <img 
                src={img} 
                alt={`Shaadi BTS ${i + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram Reel Embed */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass" 
          style={{
            maxWidth: '450px',
            margin: '0 auto',
            borderRadius: '32px',
            padding: '2.5rem',
            textAlign: 'center',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <Instagram color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontFamily: "'Cormorant Garamond', serif", margin: 0 }}>Featured Reel</h3>
          </div>
          <div style={{ position: 'relative', paddingBottom: '177.77%', height: 0, overflow: 'hidden', borderRadius: '20px', background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
            <iframe
              src="https://www.instagram.com/reel/C8_zJ5jPM6V/embed" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              scrolling="no"
              allowtransparency="true"
            ></iframe>
          </div>
          <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Follow us for more unfiltered moments.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass"
        style={{ borderRadius: '40px', padding: '5rem 3rem', textAlign: 'center', border: '1px solid rgba(212,175,55,0.4)', background: 'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 70%)' }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Don't let your memories stay stuck on a hard drive.
        </h2>
        <p style={{ color: 'var(--accent-gold)', marginBottom: '3rem', fontStyle: 'italic', fontSize: '1.3rem' }}>
          Book our BTS &amp; Social Media Management package today.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-gold)', color: '#000' }}
          whileTap={{ scale: 0.95 }}
          href="/#services" 
          style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: 'transparent',
            color: 'var(--accent-gold)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '40px',
            fontWeight: 600,
            fontSize: '1.1rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
        >
          Explore Services
        </motion.a>
      </motion.div>
      
      <Footer />
    </div>
  );
}
