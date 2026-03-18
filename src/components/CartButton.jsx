import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart, clearCart, sendCartToWhatsApp } = useCart();

  useEffect(() => {
    const handler = () => setOpen(prev => !prev);
    window.addEventListener('toggle-cart', handler);
    return () => window.removeEventListener('toggle-cart', handler);
  }, []);

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        className="cart-float-btn"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <motion.span
            className="cart-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={cart.length}
          >
            {cart.length}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Panel Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 199,
              }}
            />

            {/* Panel */}
            <motion.div
              className="cart-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="cart-panel-header">
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                }}>
                  Your Selection
                </h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: 4,
                      }}
                      title="Clear all"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      padding: 4,
                    }}
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="cart-panel-body">
                {cart.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: 'var(--text-muted)',
                  }}>
                    <ShoppingCart size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                    <p style={{ fontSize: '0.95rem' }}>No services selected yet</p>
                    <p style={{ fontSize: '0.8rem', marginTop: 8 }}>
                      Browse our services and tap "Add to Cart"
                    </p>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: 4,
                        }}>
                          {item.title}
                        </p>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--accent-gold)',
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid rgba(212, 175, 55, 0.2)',
                        }}>
                          {item.category}
                        </span>
                      </div>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="cart-panel-footer">
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: 12,
                    textAlign: 'center',
                  }}>
                    {cart.length} service{cart.length > 1 ? 's' : ''} selected
                  </p>
                  <button
                    className="whatsapp-btn"
                    onClick={() => {
                      sendCartToWhatsApp();
                      setOpen(false);
                    }}
                  >
                    <MessageCircle size={20} />
                    Share on WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
