import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Palette, Clock, ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from './CartContext';

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Services', path: '/#services' },
    { icon: Sparkles, label: 'PRO Girls', path: '/catering-pro' },
    { icon: ShoppingCart, label: 'Cart', action: 'cart', badge: cart.length },
    { icon: Palette, label: 'Vibe', path: '/#mood-board' },
  ];

  const handleClick = (item) => {
    if (item.action === 'cart') {
      window.dispatchEvent(new CustomEvent('toggle-cart'));
      return;
    }
    if (item.action === 'chat') {
      window.dispatchEvent(new CustomEvent('toggle-chat'));
      return;
    }
    if (item.path.startsWith('/#') && location.pathname === '/') {
      const id = item.path.replace('/#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <nav className="mobile-nav">
      {items.map(item => (
        <button
          key={item.label}
          className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => handleClick(item)}
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
        </button>
      ))}
    </nav>
  );
}
