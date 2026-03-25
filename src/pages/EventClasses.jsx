import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import {
  Calculator, Target, MonitorPlay, Receipt, UtensilsCrossed, Monitor, ShieldAlert,
  Globe2, Landmark, GraduationCap, MessagesSquare, Scale, Users, FileQuestion, Sparkles, Send
} from 'lucide-react';

const MODULES = [
  { id: 1, icon: Calculator, title: 'Event Costing, Budgeting, and Planning', delay: 0 },
  { id: 2, icon: Target, title: 'Marketing Management', delay: 0.1 },
  { id: 3, icon: MonitorPlay, title: 'IT for Event Management', delay: 0.2 },
  { id: 4, icon: Receipt, title: 'Event Accounting', delay: 0.3 },
  { id: 5, icon: UtensilsCrossed, title: 'Event Production & Catering', delay: 0.4 },
  { id: 6, icon: Monitor, title: 'Event Creation, Graphics, Media & Advertising', delay: 0.5 },
  { id: 7, icon: ShieldAlert, title: 'Event Risk Management', delay: 0.6 },
  { id: 8, icon: Globe2, title: 'Cross-Cultural Management', delay: 0 },
  { id: 9, icon: Landmark, title: 'Event Finance and Taxation', delay: 0.1 },
  { id: 10, icon: GraduationCap, title: 'Principles of Event Management', delay: 0.2 },
  { id: 11, icon: MessagesSquare, title: 'Business Communication', delay: 0.3 },
  { id: 12, icon: Scale, title: 'Legal Aspects of Event Management', delay: 0.4 },
  { id: 13, icon: Users, title: 'Consumer Behavior', delay: 0.5 },
  { id: 14, icon: FileQuestion, title: 'Special Event Topics', delay: 0.6 },
  { id: 15, icon: Sparkles, title: 'Use of AI in Event Management', delay: 0.7, span: 'span-2' },
];

export default function EventClasses() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*New Event Management Course Enrollment*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n\nI am interested in joining the 3-month academy program!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918080531468?text=${encodedMessage}`, '_blank');
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <div className="page-container" style={{ paddingBottom: 60, position: 'relative', zIndex: 1 }}>
      {/* Hero Section */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--accent-gold)',
            borderRadius: 30,
            marginBottom: 24,
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)'
          }}>
            <Sparkles size={16} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
              ATITHI ACADEMY
            </span>
          </div>
          
          <div style={{
            marginBottom: '1.5rem',
            display: 'inline-block',
            padding: '6px 14px',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '8px',
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            Next Batch: April 2026
          </div>
          
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: 'var(--accent-gold)',
            lineHeight: 1.1,
            marginBottom: 24,
            fontWeight: 600,
            fontStyle: 'italic'
          }}>
            Master the Art of Event Management
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            Join our exclusive 3-month intensive syllabus designed to transform you from an enthusiast into a certified industry professional. Learn the exact blueprints behind awe-inspiring events.
          </p>
        </div>
      </section>

      {/* Curriculum Bento Grid */}
      <section className="section-container">
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <h2 className="section-title">The 3-Month Curriculum</h2>
          <p className="section-subtitle">15 comprehensive modules covering everything from deep-dive logistics to cutting-edge AI implementation.</p>
        </div>

        <div className="academy-bento-grid" style={{
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          {MODULES.map((mod) => (
            <motion.div
              key={mod.id}
              className={`glass-card ${mod.span ? 'span-2' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: mod.delay, duration: 0.5 }}
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}>
                <mod.icon size={22} color="var(--accent-gold)" />
              </div>
              <h3 style={{
                fontSize: '1.15rem',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.3
              }}>
                {mod.title}
              </h3>
              <div style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, rgba(212,175,55,0.2), transparent)',
                marginTop: 'auto'
              }}></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enrollment Section */}
      <section style={{ padding: '80px 24px', maxWidth: 600, margin: '0 auto' }}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ padding: 'clamp(32px, 5vw, 48px)', textAlign: 'center' }}
        >
          <GraduationCap size={48} color="var(--accent-gold)" style={{ margin: '0 auto 24px' }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: 'var(--accent-gold)',
            marginBottom: 16,
            fontWeight: 500
          }}>
            Secure Your Seat
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
            Submit your details below and our academy director will contact you via WhatsApp to discuss enrollment and batch availability.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: '16px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
            <input
              type="tel"
              name="phone"
              placeholder="WhatsApp Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                padding: '16px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: '16px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s',
                marginBottom: 16
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '16px',
                borderRadius: 12,
                background: 'var(--accent-gold)',
                color: '#000',
                border: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.25)'
              }}
            >
              <Send size={20} />
              Enroll via WhatsApp
            </motion.button>
          </form>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
