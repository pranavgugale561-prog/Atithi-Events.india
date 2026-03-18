import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, Flower2, Building, Music, Camera, UtensilsCrossed, Heart, Sparkles, Wand2 } from 'lucide-react';

const MOOD_ITEMS = [
  { id: 'rings', icon: Gem, label: 'Rings', emoji: '💍' },
  { id: 'flowers', icon: Flower2, label: 'Florals', emoji: '🌸' },
  { id: 'venue', icon: Building, label: 'Venue', emoji: '🏛️' },
  { id: 'music', icon: Music, label: 'Music', emoji: '🎵' },
  { id: 'photo', icon: Camera, label: 'Photography', emoji: '📷' },
  { id: 'food', icon: UtensilsCrossed, label: 'Culinary', emoji: '🍽️' },
  { id: 'romance', icon: Heart, label: 'Romance', emoji: '💕' },
  { id: 'sparkle', icon: Sparkles, label: 'Glamour', emoji: '✨' },
];

const THEME_MAP = {
  'rings+flowers': { name: 'Garden Romance', palette: ['#f5e6d3', '#d4a574', '#8fbc8f', '#dda0dd'] },
  'rings+venue': { name: 'Royal Elegance', palette: ['#2c1810', '#c9a96e', '#f5f0eb', '#8b4513'] },
  'flowers+venue': { name: 'Botanical Estate', palette: ['#355e3b', '#f5f0eb', '#daa520', '#90ee90'] },
  'music+sparkle': { name: 'Midnight Gala', palette: ['#1a1a2e', '#e040fb', '#ffd700', '#ff6b8a'] },
  'food+romance': { name: 'Tuscan Love Affair', palette: ['#8b4513', '#faf0e6', '#cd853f', '#dc143c'] },
  'photo+sparkle': { name: 'Cinematic Dream', palette: ['#0d0d0d', '#c9a96e', '#f5f0eb', '#ff6b6b'] },
  'flowers+romance': { name: 'Blush & Bloom', palette: ['#fce4ec', '#e8a0bf', '#c9a96e', '#fff5f5'] },
  'venue+sparkle': { name: 'Crystal Palace', palette: ['#f0f8ff', '#c0c0c0', '#ffd700', '#e6e6fa'] },
  default: { name: 'Bespoke Luxe', palette: ['#f5f0eb', '#c9a96e', '#ff6b6b', '#e8a0bf'] },
};

function getThemeSuggestion(items) {
  if (items.length < 2) return null;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const key = `${items[i]}+${items[j]}`;
      const reverseKey = `${items[j]}+${items[i]}`;
      if (THEME_MAP[key]) return THEME_MAP[key];
      if (THEME_MAP[reverseKey]) return THEME_MAP[reverseKey];
    }
  }
  return THEME_MAP.default;
}

export default function MoodBoard() {
  const [vibeBox, setVibeBox] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId && !vibeBox.includes(itemId)) {
      setVibeBox(prev => [...prev, itemId]);
    }
  };

  const handleTapAdd = (itemId) => {
    if (vibeBox.includes(itemId)) {
      setVibeBox(prev => prev.filter(i => i !== itemId));
    } else {
      setVibeBox(prev => [...prev, itemId]);
    }
    setSuggestion(null);
  };

  const removeFromBox = (itemId) => {
    setVibeBox(prev => prev.filter(i => i !== itemId));
    setSuggestion(null);
  };

  const analyzeVibe = () => {
    setIsAnalyzing(true);
    setSuggestion(null);
    setTimeout(() => {
      const result = getThemeSuggestion(vibeBox);
      setSuggestion(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  const resetBoard = () => {
    setVibeBox([]);
    setSuggestion(null);
  };

  return (
    <section id="mood-board" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title" style={{ fontStyle: 'italic' }}>
          Build Your Vibe
        </h2>
        <p className="section-subtitle">
          Drag your dream elements into the Vibe Box. Our AI stylist will
          suggest the perfect wedding theme for you.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}
        className="mood-board-grid"
      >
        {/* Available Items */}
        <div>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Your Elements
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {MOOD_ITEMS.map(item => {
              const inBox = vibeBox.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  className={`mood-item ${inBox ? 'in-box' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => handleTapAdd(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                  <span>{item.label}</span>
                  {inBox && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)' }}>✓ Added</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Vibe Box */}
        <div>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Your Vibe Box
          </h4>
          <div
            className={`vibe-box ${dragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <AnimatePresence mode="popLayout">
              {vibeBox.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}
                >
                  Drag elements here or tap to add
                </motion.p>
              ) : (
                vibeBox.map(itemId => {
                  const item = MOOD_ITEMS.find(m => m.id === itemId);
                  if (!item) return null;
                  return (
                    <motion.div
                      key={itemId}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="mood-item in-box"
                      onClick={() => removeFromBox(itemId)}
                      whileHover={{ scale: 1.05 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                      <span>{item.label}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>✕ remove</span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {vibeBox.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 20, display: 'flex', gap: 12 }}
            >
              <button className="btn-squishy" onClick={analyzeVibe} disabled={isAnalyzing}>
                <Wand2 size={18} />
                {isAnalyzing ? 'Analyzing...' : 'Reveal My Theme'}
              </button>
              <button className="btn-outline" onClick={resetBoard}>Reset</button>
            </motion.div>
          )}

          {/* Theme Suggestion */}
          <AnimatePresence>
            {suggestion && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass-card"
                style={{ marginTop: 24, padding: 28, textAlign: 'center' }}
              >
                <Sparkles size={24} color="var(--accent-gold)" style={{ marginBottom: 12 }} />
                <h3 style={{
                  fontSize: '1.8rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  color: 'var(--text-primary)',
                  marginBottom: 8,
                }}>
                  {suggestion.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>
                  Your signature palette:
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  {suggestion.palette.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: color,
                        border: '2px solid var(--glass-border)',
                        boxShadow: `0 4px 12px ${color}40`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mood-board-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
