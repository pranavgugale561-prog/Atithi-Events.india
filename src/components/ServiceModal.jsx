import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Check, Share2, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from './CartContext';
import { shareItem } from '../utils/shareUtils';

export default function ServiceModal({ service, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(service.id);

  const images = service.images || [];
  const hasImages = images.length > 0;

  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!inCart) {
      addToCart(service);
    }
  };

  return createPortal(
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
          backdropFilter: 'blur(12px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[1000px] flex flex-col md:flex-row relative"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: 24,
            overflow: 'hidden',
            maxHeight: '90vh',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Floating Close Button */}
          <button 
            onClick={onClose} 
            style={{ 
              position: 'absolute', top: 20, right: 20, zIndex: 10, 
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', 
              border: '1px solid rgba(255,255,255,0.15)', color: '#fff', 
              padding: 10, borderRadius: '50%', cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212,175,55,0.8)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            <X size={20} />
          </button>

          <div className="no-scrollbar service-modal-layout" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
            
            {/* Immersive Hero Header */}
            {hasImages ? (
              <div 
                className="service-modal-image-container shrink-0" 
                style={{ background: 'var(--bg-primary)' }}
              >
                
                {/* Crisp Foreground Image - Full Bleed */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                  >
                    {(() => {
                      const url = images[currentImageIndex];
                      const isVideo = url.split('?')[0].toLowerCase().match(/\.(mp4|webm|mov)$/) || url.includes('video%2F');
                      return isVideo ? (
                        <video src={url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} autoPlay loop muted playsInline />
                      ) : (
                        <>
                          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)', opacity: 0.4, transform: 'scale(1.1)' }} />
                          <img src={url} style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>

                {/* Gradient overlay for smooth transition to content */}
                <div className="md:hidden" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, var(--glass-bg) 0%, transparent 100%)', zIndex: 1 }} />
              </div>
            ) : (
              /* Fallback Header */
              <div className="service-modal-image-container shrink-0" style={{ height: 120, background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(6,5,10,1))', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <ImageIcon size={48} style={{ opacity: 0.1, color: 'var(--accent-gold)' }} />
              </div>
            )}

            {/* Content & Action */}
            <div className="service-modal-text-container my-auto" style={{ gap: 16 }}>
              <div>
                <span style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>
                  {service.category}
                </span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff', marginTop: 6, lineHeight: 1.1 }}>
                  {service.title}
                </h2>
              </div>
              
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '600px', margin: '0 auto' }}>
                {service.description}
              </p>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                  {images.map((img, i) => {
                    const isVideo = img.split('?')[0].toLowerCase().match(/\.(mp4|webm|mov)$/) || img.includes('video%2F');
                    return (
                      <motion.div
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: i === currentImageIndex ? '2px solid var(--accent-gold)' : '2px solid rgba(255,255,255,0.1)',
                          opacity: i === currentImageIndex ? 1 : 0.6,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {isVideo ? (
                          <video src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted playsInline />
                        ) : (
                          <img src={img} alt={`Thumbnail ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
              
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 100,
                  border: inCart ? '1px solid var(--accent-gold)' : 'none',
                  background: inCart ? 'rgba(212, 175, 55, 0.1)' : 'linear-gradient(135deg, #d4af37, #f3e5ab)',
                  color: inCart ? 'var(--accent-gold)' : '#000',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: inCart ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: inCart ? 'none' : '0 8px 24px rgba(212,175,55,0.3)',
                }}
                disabled={inCart}
                onMouseOver={(e) => { if(!inCart) e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)' }}
                onMouseOut={(e) => { if(!inCart) e.currentTarget.style.transform = 'translateY(0) scale(1)' }}
              >
                {inCart ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
