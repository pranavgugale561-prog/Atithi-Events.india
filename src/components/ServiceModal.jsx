import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Check, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function ServiceModal({ service, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(service.id);

  const images = service.images || [];
  const hasImages = images.length > 0;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!inCart) {
      addToCart(service);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass"
          style={{
            width: '100%',
            maxWidth: 600,
            borderRadius: 24,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh',
            boxShadow: '0 24px 64px rgba(212,175,55,0.2)',
            border: '1px solid var(--accent-gold)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--glass-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              {service.category}
            </span>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: 8, borderRadius: '50%', cursor: 'pointer', display: 'flex' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {/* Image Gallery */}
            {hasImages ? (
              <div className="modal-gallery-container" style={{ position: 'relative', width: '100%', background: '#000' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </AnimatePresence>
                
                {images.length > 1 && (
                  <>
                    <button onClick={handlePrev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', padding: 8, borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={handleNext} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', padding: 8, borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Dots */}
                    <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
                      {images.map((_, i) => (
                        <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === currentImageIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ width: '100%', height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', color: 'var(--text-muted)' }}>
                <ImageIcon size={48} style={{ opacity: 0.3, marginBottom: 12 }} />
                <span style={{ fontSize: '0.9rem' }}>No images available for this service</span>
              </div>
            )}

            {/* Content & Action */}
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
                {service.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                {service.description}
              </p>
              
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '16px',
                  borderRadius: 16,
                  border: inCart ? '1px solid var(--accent-gold)' : 'none',
                  background: inCart ? 'rgba(212, 175, 55, 0.1)' : 'var(--btn-primary-bg)',
                  color: inCart ? 'var(--accent-gold)' : 'var(--btn-primary-text)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: inCart ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
                disabled={inCart}
              >
                {inCart ? (
                  <>
                    <Check size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
