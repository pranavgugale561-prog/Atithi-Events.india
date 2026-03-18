import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'atithi2026') {
      localStorage.setItem('atithi_admin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password. Try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass-card"
        style={{ maxWidth: 420, width: '100%', padding: 40, textAlign: 'center' }}
      >
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          background: 'var(--glass-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: '1px solid var(--glass-border)',
        }}>
          <Lock size={28} color="var(--accent-gold)" />
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem',
          color: 'var(--text-primary)',
          marginBottom: 8,
        }}>
          Admin Access
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 28 }}>
          Enter your password to manage Atithi Events
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <input
              className="input-luxury"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 48 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#ef4444', fontSize: '0.85rem' }}
            >
              {error}
            </motion.p>
          )}

          <button type="submit" className="btn-squishy" style={{ width: '100%' }}>
            <Sparkles size={18} />
            Enter Dashboard
          </button>
        </form>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 20 }}>
          Hint: atithi2026
        </p>
      </motion.div>
    </div>
  );
}
