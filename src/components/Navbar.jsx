import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Video, CalendarCheck, GraduationCap, Palette, Gamepad2, Mic2 } from 'lucide-react';

const primaryLinks = [
  { label: 'Timeline', to: '/timeline' },
  { label: 'Photography', to: '/photography' },
  { label: 'Catering', to: '/catering' },
  { label: 'Reels', to: '/reels' },
  { label: 'Contact', to: '/contact' },
];

const moreLinks = [
  { label: 'Shaadi BTS', to: '/shaadi-bts', icon: Video, desc: 'Unfiltered moments for your feed' },
  { label: 'Why Planner?', to: '/why-planner', icon: CalendarCheck, desc: 'The architects of your dreams' },
  { label: 'Academy', to: '/academy', icon: GraduationCap, desc: 'Master the art of event management' },
  { label: 'Mood Board', to: '/#mood-board', icon: Palette, desc: 'Curated aesthetics & inspiration' },
  { label: 'Activity Zone', to: '/activity-zone', icon: Gamepad2, desc: 'Interactive guest experiences' },
  { label: 'Artists & Ent.', to: '/artists', icon: Mic2, desc: 'World-class entertainment' },
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
                    top: 'calc(100% + 16px)',
                    right: -100,
                    width: 650,
                    padding: '24px',
                    borderRadius: 24,
                    zIndex: 1001,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    border: '1px solid rgba(212,175,55,0.2)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                    background: 'linear-gradient(145deg, rgba(20,20,15,0.95) 0%, rgba(5,5,5,0.98) 100%)',
                  }}
                >
                  <div style={{ gridColumn: '1 / -1', padding: '0 8px 8px 8px', borderBottom: '1px solid rgba(212,175,55,0.1)', marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--accent-gold)', fontStyle: 'italic' }}>Discover More</span>
                  </div>
                  {moreLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={(e) => {
                        if (link.to.startsWith('/#') && location.pathname === '/') {
                          e.preventDefault();
                          handleNavClick(link.to);
                        } else {
                          setMoreOpen(false);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 16,
                        padding: '16px',
                        textDecoration: 'none',
                        borderRadius: 16,
                        transition: 'all 0.3s ease',
                        border: '1px solid transparent',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                        e.currentTarget.style.border = '1px solid rgba(212,175,55,0.15)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.border = '1px solid transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{
                        padding: 12,
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.02))',
                        color: 'var(--accent-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(212,175,55,0.2)'
                      }}>
                        {link.icon && <link.icon size={22} />}
                      </div>
                      <div>
                        <div style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          color: isActive(link.to) ? 'var(--accent-gold)' : 'var(--text-primary)',
                          marginBottom: 4,
                          fontFamily: "'Cormorant Garamond', serif",
                          letterSpacing: '0.02em'
                        }}>
                          {link.label}
                        </div>
                        <div style={{
                          fontSize: '0.85rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.4
                        }}>
                          {link.desc}
                        </div>
                      </div>
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

        
      </motion.nav>

      

        <style>{`
          .glass-nav { }
          
          @keyframes logoRichGlow {
            0% {
              filter: drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.3)) brightness(1);
              transform: scale(1);
            }
            50% {
              filter: drop-shadow(0px 0px 20px rgba(212, 175, 55, 0.8)) brightness(1.15);
              transform: scale(1.04);
            }
            100% {
              filter: drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.3)) brightness(1);
              transform: scale(1);
            }
          }

          .nav-logo-img {
            height: 46px;
            width: auto;
            object-fit: contain;
            border-radius: 10px;
            animation: logoRichGlow 3.5s ease-in-out infinite;
            will-change: filter, transform;
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
          
        }
        @media (max-width: 768px) {
          .glass-nav { padding: 0 14px !important; }
          .nav-logo-img { height: 40px; }
        }
      `}</style>
    </>
  );
}
