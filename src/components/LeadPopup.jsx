import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { addLead } from '../utils/services';

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '' });

  useEffect(() => {
    if (sessionStorage.getItem('atithi_lead_shown')) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem('atithi_lead_shown', 'true');
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addLead(form);
    setSubmitted(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="lead-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        >
          <motion.div
            className="lead-modal"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Compulsory Header Banner */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, 
              background: 'var(--accent-coral)', color: '#fff', 
              fontSize: '0.7rem', fontWeight: 600, padding: '4px 0', 
              textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase'
            }}>
              VIP Access Required
            </div>

            {!submitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart size={36} color="var(--accent-coral)" fill="var(--accent-coral)" style={{ marginBottom: 12 }} />
                  </motion.div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.8rem',
                    color: 'var(--text-primary)',
                    marginBottom: 8,
                  }}>
                    Let's Plan Your Dream Day
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Share your details and our curators will craft a personalized proposal just for you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input
                    className="input-luxury"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    required
                  />
                  <input
                    className="input-luxury"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    required
                  />
                  <input
                    className="input-luxury"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                  <input
                    className="input-luxury"
                    type="date"
                    placeholder="Expected Event Date"
                    value={form.eventDate}
                    onChange={e => handleChange('eventDate', e.target.value)}
                  />
                  <button type="submit" className="btn-squishy" style={{ width: '100%', marginTop: 4 }}>
                    <Sparkles size={18} />
                    Get My Personalized Proposal
                  </button>
                </form>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 16 }}>
                  No spam. Just beautiful wedding plans. 💐
                </p>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart size={48} color="var(--accent-coral)" fill="var(--accent-coral)" />
                </motion.div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginTop: 16,
                  marginBottom: 8,
                }}>
                  Thank You!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  We'll be in touch within 24 hours with your personalized proposal.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
