import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Send, Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function AboutContact() {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
      window.scrollTo(0, 0); // Instant reset to Hero
    }, 1500);
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/atithi.events/' },
    { icon: MessageCircle, label: 'WhatsApp', url: 'https://wa.me/918080531468' },
    { icon: Mail, label: 'Email', url: 'mailto:atithievents@gmail.com' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
      {/* 1. Hero: Our Story */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.15em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Crafting Your Main Character Moment
        </span>
        <h1 className="section-title mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Our Story</h1>
        <p className="text-secondary max-w-[800px] mx-auto" style={{ fontSize: '1.2rem', lineHeight: 1.8, fontStyle: 'italic' }}>
          "Where Plans Align & Movements Define. At Atithi Events, we don't just plan weddings; we manage magic. Our mission is to handle every single detail so your only job is to live your cinematic moment."
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        {/* Left Col: Contact Info & Address */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--accent-gold)' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#fff', marginBottom: '1.5rem' }}>Meet the Vision</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-coral))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Sparkles size={30} style={{ margin: '0 auto' }} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Pranav Gugale</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--accent-gold)', letterSpacing: '0.1em' }}>CREATIVE DIRECTOR</p>
              </div>
            </div>

            <hr style={{ border: '0.5px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <MapPin color="var(--accent-gold)" size={24} style={{ flexShrink: 0 }} />
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Flat No. 3, Chetna Apartment,<br />
                  Behind Goodwill Medical, Maniknagar,<br />
                  Ahilyanagar, Maharashtra 414001
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone color="var(--accent-gold)" size={20} />
                <a href="tel:+918080531468" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+91 80805 31468</a>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail color="var(--accent-gold)" size={20} />
                <a href="mailto:atithievents@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>atithievents@gmail.com</a>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Col: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#fff', marginBottom: '0.5rem' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>Send us a message and we'll reply within 24 hours.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>NAME</label>
                  <input required type="text" className="input-luxury" placeholder="Your name" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>EVENT TYPE</label>
                  <input type="text" className="input-luxury" placeholder="Wedding, Birthday, etc." style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>PHONE / WHATSAPP</label>
                <input required type="tel" className="input-luxury" placeholder="+91 XXXX XXX XXX" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>YOUR MESSAGE</label>
                <textarea required rows={4} placeholder="Tell us about your dream celebration..." style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', resize: 'none' }}></textarea>
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="btn-squishy"
                style={{
                  marginTop: '1rem',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  fontSize: '1rem',
                  background: formState === 'sent' ? '#4BB543' : ''
                }}
              >
                {formState === 'idle' && <><Send size={18} /> Send Message</>}
                {formState === 'sending' && <>Sending...</>}
                {formState === 'sent' && <>Successfully Sent! <Heart size={18} /></>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Google Maps Shortcut */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '4rem', textAlign: 'center' }}
      >
        <a
          href="https://share.google/lRXYoAZyz78XmISIX"
          target="_blank"
          rel="noreferrer"
          className="glass"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.2rem 2.5rem',
            borderRadius: '100px',
            textDecoration: 'none',
            color: '#fff',
            border: '1px solid rgba(212,175,55,0.3)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
        >
          <MapPin size={20} color="var(--accent-gold)" />
          <span>Open Studio Location in Google Maps</span>
        </a>
      </motion.div>
      <Footer />
    </div>
  );
}
