import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Menu, ShoppingCart, Sparkles, Phone, Video, CalendarCheck, GraduationCap, Palette, Gamepad2, Mic2, X } from 'lucide-react';
import { useCart } from './CartContext';

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Services', path: '/#services' },
    { icon: Sparkles, label: 'Catering', path: '/catering' },
    { icon: ShoppingCart, label: 'Cart', action: 'cart', badge: cart.length },
    { icon: Menu, label: 'More', action: 'more' },
    { icon: Phone, label: 'Contact', path: '/contact' },
  ];

  const moreLinks = [
    { label: 'Shaadi BTS', to: '/shaadi-bts', icon: Video, desc: 'Unfiltered moments for your feed' },
    { label: 'Why Planner?', to: '/why-planner', icon: CalendarCheck, desc: 'The architects of your dreams' },
    { label: 'Academy', to: '/academy', icon: GraduationCap, desc: 'Master the art of event management' },
    { label: 'Mood Board', to: '/#mood-board', icon: Palette, desc: 'Curated aesthetics & inspiration' },
    { label: 'Activity Zone', to: '/activity-zone', icon: Gamepad2, desc: 'Interactive guest experiences' },
    { label: 'Artists & Ent.', to: '/artists', icon: Mic2, desc: 'World-class entertainment' },
  ];

  const handleClick = (item) => {
    if (item.action === 'more') {
      setIsMoreOpen(prev => !prev);
      return;
    }
    
    setIsMoreOpen(false);

    if (item.action === 'cart') {
      window.dispatchEvent(new CustomEvent('toggle-cart'));
      return;
    }
    
    if (item.path && item.path.startsWith('/#') && location.pathname === '/') {
      const id = item.path.replace('/#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleMoreLink = (e, path) => {
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      setIsMoreOpen(false);
      const id = path.replace('/#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <>
      <AnimatePresence>
        {isMoreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 1999,
            }}
            onClick={() => setIsMoreOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: 100,
                left: 16,
                right: 16,
                background: 'rgba(15, 15, 15, 0.85)',
                backdropFilter: 'blur(30px) saturate(2)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: 24,
                padding: '24px 20px',
                maxHeight: '75vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: 12 }}>
                <h3 style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: '1.4rem', 
                  color: 'var(--accent-gold)', 
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  Discover More
                </h3>
                <button onClick={() => setIsMoreOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                {moreLinks.map(link => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={(e) => handleMoreLink(e, link.to)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: 12,
                      textDecoration: 'none',
                      borderRadius: 16,
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid transparent',
                      transition: 'background 0.3s'
                    }}
                  >
                    <div style={{
                      padding: 10,
                      borderRadius: 12,
                      background: 'rgba(212, 175, 55, 0.1)',
                      color: 'var(--accent-gold)',
                      display: 'flex'
                    }}>
                      <link.icon size={20} />
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem', marginBottom: 2 }}>
                        {link.label}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {link.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="mobile-nav" style={{ zIndex: 2000 }}>
        {items.map(item => (
          <motion.button
            key={item.label}
            className={`mobile-nav-item ${(isActive(item.path) || (item.action === 'more' && isMoreOpen)) ? 'active' : ''}`}
            onClick={() => handleClick(item)}
            whileTap={{ scale: 0.9, backgroundColor: 'rgba(212,175,55,0.1)' }}
            style={{ position: 'relative' }}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
            {item.badge > 0 && (
              <span style={{
                position: 'absolute',
                top: 2,
                right: 4,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#ff4444',
                color: 'white',
                fontSize: '0.55rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-primary)',
              }}>
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}
      </nav>
    </>
  );
}
