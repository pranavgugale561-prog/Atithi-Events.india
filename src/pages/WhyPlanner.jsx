import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Heart, Wallet, Clock, Shield, Sparkles } from 'lucide-react';

export default function WhyPlanner() {
  const reasons = [
    {
      title: 'Stress-Free Experience',
      desc: "Your wedding day shouldn't feel like a job. We handle the logistics, so you can focus on making memories with your family and partner.",
      icon: Heart
    },
    {
      title: 'Optimized Budget Management',
      desc: 'We know the market. We negotiate with vendors, prevent hidden costs, and ensure you get the absolute best value for every rupee spent.',
      icon: Wallet
    },
    {
      title: 'Flawless Execution',
      desc: 'From the Baraat arrival to the Vidaai, timing is everything. Our team ensures every ritual and event flows seamlessly without delays.',
      icon: Clock
    },
    {
      title: 'Crisis Management',
      desc: "Unexpected rain? Vendor delays? Power cuts? We have backup plans for our backup plans. We handle emergencies quietly and efficiently.",
      icon: Shield
    },
    {
      title: 'Design & Aesthetics',
      desc: 'We curate a cohesive look and feel for your wedding, transforming ordinary spaces into magical, cinematic experiences.',
      icon: Sparkles
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      
      {/* Premium Background Blurs */}
      <div style={{ position: 'absolute', top: '5%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)', zIndex: -1, filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', top: '70%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', zIndex: -1, filter: 'blur(80px)' }}></div>

      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.2em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          The Architect of Your Dreams
        </span>
        <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)', textShadow: '0 2px 10px rgba(212,175,55,0.2)' }}>
          Why Hire an Event Planner?
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
          A wedding is a beautiful chaos. An event planner ensures it remains beautiful while taking the chaos entirely upon themselves.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          justifyContent: 'center',
          marginBottom: '6rem'
        }}
      >
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'var(--accent-gold)' }}
            className="glass"
            style={{ 
              padding: '2.5rem', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.05)', 
              borderLeft: '4px solid var(--accent-gold)', 
              transition: 'all 0.3s ease', 
              cursor: 'default' 
            }}
          >
            <div style={{ background: 'rgba(212,175,55,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <reason.icon color="var(--accent-gold)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              {reason.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
              {reason.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass"
        style={{ 
          borderRadius: '40px', 
          maxWidth: '1000px', 
          margin: '0 auto', 
          padding: '5rem 3rem', 
          textAlign: 'center', 
          border: '1px solid rgba(212,175,55,0.4)', 
          background: 'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 70%)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
        }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Ready to be a guest at your own wedding?
        </h2>
        <p style={{ color: 'var(--accent-gold)', marginBottom: '3rem', fontStyle: 'italic', fontSize: '1.3rem' }}>
          Let our expert team of 13 handle the heavy lifting while you enjoy the magic.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-gold)', color: '#000' }}
          whileTap={{ scale: 0.95 }}
          href="/#contact" 
          style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: 'transparent',
            color: 'var(--accent-gold)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '40px',
            fontWeight: 600,
            fontSize: '1.1rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
        >
          Let's Plan Together
        </motion.a>
      </motion.div>
      
      <Footer />
    </div>
  );
}
