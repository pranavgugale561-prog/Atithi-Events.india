import { motion } from 'framer-motion';

export default function WhyPlanner() {
  const reasons = [
    {
      title: 'Stress-Free Experience',
      desc: 'Your wedding day shouldn\'t feel like a job. We handle the logistics, so you can focus on making memories with your family and partner.',
    },
    {
      title: 'Optimized Budget Management',
      desc: 'We know the market. We negotiate with vendors, prevent hidden costs, and ensure you get the absolute best value for every rupee spent.',
    },
    {
      title: 'Flawless Execution',
      desc: 'From the Baraat arrival to the Vidaai, timing is everything. Our team ensures every ritual and event flows seamlessly without delays.',
    },
    {
      title: 'Crisis Management',
      desc: 'Unexpected rain? Vendor delays? Power cuts? We have backup plans for our backup plans. We handle emergencies quietly and efficiently.',
    },
    {
      title: 'Design & Aesthetics',
      desc: 'We curate a cohesive look and feel for your wedding, transforming ordinary spaces into magical, cinematic experiences.',
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          The Architect of Your Dreams
        </span>
        <h1 className="section-title mt-4 mb-6">Why Hire an Event Planner?</h1>
        <p className="text-muted max-w-[700px] mx-auto" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          A wedding is a beautiful chaos. An event planner ensures it remains beautiful while taking the chaos entirely upon themselves.
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem',
        justifyContent: 'center' 
      }}>
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', borderLeft: '3px solid var(--accent-gold)' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              {reason.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {reason.desc}
            </p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 glass py-16 px-8 flex flex-col items-center justify-center text-center mx-auto w-full"
        style={{ borderRadius: '32px', maxWidth: '1000px' }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
          Ready to be a guest at your own wedding?
        </h2>
        <p style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Let our expert team of 13 handle the heavy lifting while you enjoy the magic.</p>
        <a href="/" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-text)',
          borderRadius: '30px',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Let's Plan Together
        </a>
      </motion.div>
    </div>
  );
}
