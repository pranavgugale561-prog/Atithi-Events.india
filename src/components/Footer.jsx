import { Instagram, Mail, MessageCircle, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/atithi.events/' },
    { icon: MessageCircle, label: 'WhatsApp', url: 'https://wa.me/918080531468' },
    { icon: Mail, label: 'Email', url: 'mailto:atithievents@gmail.com' },
  ];

  return (
    <footer style={{
      textAlign: 'center',
      padding: '60px 24px 40px',
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(10, 10, 10, 0.5)',
      marginTop: 40,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.8rem',
          color: 'var(--text-primary)',
          marginBottom: 12,
          fontWeight: 400,
          letterSpacing: '0.1em'
        }}>
          Atithi Events
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6, maxWidth: 400, margin: '0 auto 24px' }}>
          Where Plans Align & Movements Define. <br />
          Crafting your main character moments.
        </p>
        
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 32 }}>
          {socialLinks.map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid rgba(212, 175, 55, 0.2)',
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
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
              }}
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24 }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
            © {new Date().getFullYear()} Atithi Events. All rights reserved.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.05em' }}>
            All rights reserved by <strong style={{ color: '#fff' }}>Ivory Tech Solution</strong>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
