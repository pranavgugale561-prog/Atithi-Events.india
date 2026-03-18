import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Upload, Check, Camera, User, Mail, Users, UtensilsCrossed } from 'lucide-react';
import { addRSVP } from '../utils/services';

// Simple QR Code SVG (pattern-based)
function QRCode({ url }) {
  const size = 160;
  const cells = 21;
  const cellSize = size / cells;

  // Generate a deterministic pattern from the URL
  const pattern = [];
  let seed = 0;
  for (let i = 0; i < url.length; i++) seed = ((seed << 5) - seed) + url.charCodeAt(i);

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      // Finder patterns (corners)
      const isFinderTL = r < 7 && c < 7;
      const isFinderTR = r < 7 && c >= cells - 7;
      const isFinderBL = r >= cells - 7 && c < 7;

      if (isFinderTL || isFinderTR || isFinderBL) {
        const ir = r % 7;
        const ic = c % 7;
        const isFilled = ir === 0 || ir === 6 || ic === 0 || ic === 6 ||
          (ir >= 2 && ir <= 4 && ic >= 2 && ic <= 4);
        if (isFilled) pattern.push({ r, c });
      } else {
        // Pseudo-random data pattern
        const hash = Math.sin(seed + r * 31 + c * 17) * 43758.5453;
        if (hash - Math.floor(hash) > 0.45) {
          pattern.push({ r, c });
        }
      }
    }
  }

  return (
    <div className="qr-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {pattern.map(({ r, c }, i) => (
          <rect
            key={i}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#2d1b14"
            rx={1}
          />
        ))}
      </svg>
    </div>
  );
}

export default function RSVP() {
  const [form, setForm] = useState({
    name: '', email: '', attending: true, meal: 'standard', plusOne: 0,
  });
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addRSVP(form);
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotos(prev => [...prev, { name: file.name, url: ev.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100 }}>
      <div className="section-container" style={{ maxWidth: 700 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h1 className="section-title" style={{ fontStyle: 'italic' }}>
            You're Invited
          </h1>
          <p className="section-subtitle" style={{ margin: '8px auto 0', maxWidth: 500 }}>
            RSVP to our celebration. Share the love by uploading your favorite photos to our shared gallery.
          </p>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <QRCode url={window.location.href} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 12 }}>
            <QrCode size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Scan to RSVP instantly
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="glass-card"
              style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* Name */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                  <User size={16} /> Full Name
                </label>
                <input
                  className="input-luxury"
                  placeholder="Your beautiful name"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                  <Mail size={16} /> Email
                </label>
                <input
                  className="input-luxury"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  required
                />
              </div>

              {/* Attending */}
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 500, display: 'block' }}>
                  Will you be joining us?
                </label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { value: true, label: 'Joyfully Accepting!' },
                    { value: false, label: 'Regretfully Declining' },
                  ].map(opt => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleChange('attending', opt.value)}
                      className={form.attending === opt.value ? 'btn-squishy' : 'btn-outline'}
                      style={{ flex: 1, fontSize: '0.85rem' }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {form.attending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  {/* Meal */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                      <UtensilsCrossed size={16} /> Meal Preference
                    </label>
                    <select
                      className="input-luxury"
                      value={form.meal}
                      onChange={e => handleChange('meal', e.target.value)}
                    >
                      <option value="standard">Standard</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="gluten-free">Gluten Free</option>
                    </select>
                  </div>

                  {/* Plus One */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                      <Users size={16} /> Plus Ones
                    </label>
                    <input
                      className="input-luxury"
                      type="number"
                      min="0"
                      max="5"
                      value={form.plusOne}
                      onChange={e => handleChange('plusOne', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </motion.div>
              )}

              <button type="submit" className="btn-squishy" style={{ width: '100%' }}>
                <Check size={18} />
                Submit RSVP
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{ padding: 48, textAlign: 'center' }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6 }}
              >
                <Check size={56} color="var(--accent-gold)" />
              </motion.div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem',
                marginTop: 16,
                color: 'var(--text-primary)',
              }}>
                {form.attending ? "We Can't Wait to See You!" : 'You Will Be Missed!'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: '0.95rem' }}>
                {form.attending
                  ? 'Your seat is reserved. Get ready for an unforgettable evening.'
                  : 'We understand. You\'ll be in our hearts.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo Gallery Upload */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ padding: 36, marginTop: 40, textAlign: 'center' }}
        >
          <Camera size={28} color="var(--accent-gold)" style={{ marginBottom: 12 }} />
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}>
            Shared Photo Gallery
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 20 }}>
            Upload your favorite moments — no app needed!
          </p>

          <label
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: 32,
              borderRadius: 16,
              border: '2px dashed var(--accent-gold)',
              cursor: 'pointer',
              transition: 'background 0.3s',
              background: 'var(--glass-bg)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-blush)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--glass-bg)'}
          >
            <Upload size={24} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Tap or drag photos here
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotos}
              style={{ display: 'none' }}
            />
          </label>

          {photos.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: 12,
              marginTop: 20,
            }}>
              {photos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '2px solid var(--glass-border)',
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
