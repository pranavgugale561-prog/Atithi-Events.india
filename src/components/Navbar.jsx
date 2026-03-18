import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const primaryLinks = [
  { label: 'Home', to: '/' },
  { label: 'Timeline', to: '/timeline' },
  { label: 'Services', to: '/#services' },
  { label: 'Catering & PRO', to: '/catering-pro' },
  { label: 'Photography', to: '/photography' },
];

const moreLinks = [
  { label: 'Shaadi BTS', to: '/why-social-media' },
  { label: 'Why Planner?', to: '/why-planner' },
  { label: 'Academy', to: '/classes' },
  { label: 'Mood Board', to: '/#mood-board' },
];

const allLinks = [...primaryLinks, ...moreLinks];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const moreRef = useRef(null);

  // Close all menus when route changes
  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname, location.hash]);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNavClick = (to) => {
    if (to.startsWith('/#') && location.pathname === '/') {
      const id = to.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
        setMoreOpen(false);
      }
    }
    // Standard links will be handled by Link + useEffect route change listener
  };

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <motion.nav
        className="glass glass-nav"
        style={{
          position: 'fixed',
          top: 14,
          left: '50%',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'fit-content',
          maxWidth: 'calc(100% - 32px)',
          borderRadius: '18px',
          padding: '0 16px',
          height: '60px',
          gap: 8,
        }}
        initial={{ y: -70, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="Atithi Events"
            className="nav-logo-img"
          />
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="desktop-nav-links">
          {primaryLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => {
                if (link.to.startsWith('/#') && location.pathname === '/') {
                  e.preventDefault();
                  handleNavClick(link.to);
                }
              }}
              className="nav-link"
              style={{
                color: isActive(link.to) ? 'var(--accent-gold)' : 'var(--text-secondary)',
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div ref={moreRef} style={{ position: 'relative' }}>
            <button
              className="nav-link nav-more-btn"
              onClick={() => setMoreOpen(!moreOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: moreOpen ? 'var(--accent-gold)' : 'var(--text-secondary)',
              }}
            >
              More <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="glass"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    minWidth: 180,
                    padding: '10px 8px',
                    borderRadius: 14,
                    zIndex: 1001,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {moreLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={(e) => {
                        if (link.to.startsWith('/#') && location.pathname === '/') {
                          e.preventDefault();
                          handleNavClick(link.to);
                        }
                      }}
                      style={{
                        display: 'block',
                        padding: '9px 14px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: isActive(link.to) ? 'var(--accent-gold)' : 'var(--text-secondary)',
                        borderRadius: 10,
                        transition: 'background 0.2s, color 0.2s',
                        letterSpacing: '0.01em',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                        e.currentTarget.style.color = 'var(--accent-gold)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = isActive(link.to) ? 'var(--accent-gold)' : 'var(--text-secondary)';
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/admin/login" className="btn-squishy" style={{ padding: '8px 20px', fontSize: '0.78rem', marginLeft: 8 }}>
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{
              position: 'fixed',
              top: 84,
              left: 16,
              right: 16,
              zIndex: 998,
              padding: '16px',
              borderRadius: '18px',
            }}
            className="glass"
          >
            {allLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => {
                  if (link.to.startsWith('/#') && location.pathname === '/') {
                    e.preventDefault();
                    handleNavClick(link.to);
                  }
                }}
                style={{
                  display: 'block',
                  padding: '11px 12px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: isActive(link.to) ? 'var(--accent-gold)' : 'var(--text-primary)',
                  borderBottom: '1px solid var(--glass-border)',
                  borderRadius: 10,
                  transition: 'background 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                marginTop: 10,
                padding: '11px 12px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                borderRadius: 10,
              }}
            >
              Admin Panel
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .glass-nav { }
        .nav-logo-img {
          height: 46px;
          width: auto;
          object-fit: contain;
          border-radius: 10px;
        }
        .nav-link {
          padding: 6px 12px;
          font-size: 0.82rem;
          font-weight: 500;
          border-radius: 10px;
          letter-spacing: 0.02em;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover {
          background: rgba(212,175,55,0.1);
          color: var(--accent-gold) !important;
        }
        .nav-more-btn {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 10px;
          transition: background 0.2s, color 0.2s;
        }
        .nav-more-btn:hover {
          background: rgba(212,175,55,0.1);
          color: var(--accent-gold) !important;
        }

        @media (max-width: 900px) {
          .desktop-nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 768px) {
          .glass-nav { padding: 0 14px !important; }
          .nav-logo-img { height: 40px; }
        }
      `}</style>
    </>
  );
}
