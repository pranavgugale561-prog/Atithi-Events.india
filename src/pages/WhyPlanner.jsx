import Footer from '../components/Footer';

export default function WhyPlanner() {
  const reasons = [
    {
      title: 'Stress-Free Experience',
      desc: "Your wedding day shouldn't feel like a job. We handle the logistics, so you can focus on making memories with your family and partner.",
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
      desc: "Unexpected rain? Vendor delays? Power cuts? We have backup plans for our backup plans. We handle emergencies quietly and efficiently.",
    },
    {
      title: 'Design & Aesthetics',
      desc: 'We curate a cohesive look and feel for your wedding, transforming ordinary spaces into magical, cinematic experiences.',
    }
  ];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div className="text-center mb-16">
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          The Architect of Your Dreams
        </span>
        <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Why Hire an Event Planner?</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
          A wedding is a beautiful chaos. An event planner ensures it remains beautiful while taking the chaos entirely upon themselves.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        justifyContent: 'center'
      }}>
        {reasons.map((reason, i) => (
          <div
            key={i}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', borderLeft: '3px solid var(--accent-gold)' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              {reason.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {reason.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        className="glass"
        style={{ borderRadius: '32px', maxWidth: '1000px', margin: '6rem auto 0', padding: '4rem 2rem', textAlign: 'center' }}
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
      </div>
      <Footer />
    </div>
  );
}
