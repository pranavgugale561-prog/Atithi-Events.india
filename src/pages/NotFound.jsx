import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AlertCircle size={80} color="var(--accent-gold)" style={{ marginBottom: '2rem', opacity: 0.5 }} />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="section-title mb-4"
        style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1 }}
      >
        404
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '500px' }}
      >
        Oops! The page you're looking for has wandered off our timeline. Let's get you back to the celebration.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link to="/" className="btn-squishy" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '12px 32px' }}>
          <Home size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
