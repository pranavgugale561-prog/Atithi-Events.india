import { ChefHat, Users, GlassWater, Crown, Sparkles, Star, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import Footer from '../components/Footer';

export default function CateringPRO() {
  const features = [
    {
      icon: Crown,
      title: 'Premium PRO Girls Team',
      desc: 'Highly trained professionals for VIP guest handling, elegant welcomes, and seamless crowd coordination.'
    },
    {
      icon: ChefHat,
      title: 'Catering Management',
      desc: 'Flawless execution of food service, ensuring every dish is presented beautifully and served at the perfect temperature.'
    },
    {
      icon: GlassWater,
      title: 'Table Hosting',
      desc: 'Dedicated table hosts to attend to your special guests, managing their every need with grace and efficiency.'
    },
    {
      icon: Users,
      title: 'Guest Experience',
      desc: 'From seating arrangements to personalized service, we ensure your guests feel like absolute royalty.'
    }
  ];

  const cardDelays = ['animate-in-delay-2', 'animate-in-delay-2', 'animate-in-delay-3', 'animate-in-delay-3'];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      {/* Header Section */}
      <div className="text-center mb-16 animate-in">
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Star size={14} /> The Ultimate Luxury Experience <Star size={14} />
        </span>
        <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Catering Management <br />&amp; Premium PRO Girls</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Elevate your event with world-class hospitality. From flawless catering execution to our elite team of PRO Girls ensuring every guest feels like royalty, we handle the intricacies of premium service.
        </p>
      </div>

      {/* Feature Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '5rem'
      }}>
        {features.map((feature, i) => (
          <div
            key={i}
            className={`glass ${cardDelays[i]}`}
            style={{
              padding: '2.5rem',
              borderRadius: '20px',
              textAlign: 'center',
              borderTop: '1px solid rgba(212,175,55,0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 120, height: 120, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
            }} />
            <div style={{
              width: 64, height: 64, margin: '0 auto 1.5rem', borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(212,175,55,0.2)'
            }}>
              <feature.icon size={28} color="var(--accent-gold)" />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>
              {feature.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Visual Showcase / Promise */}
      <div
        className="glass animate-in-delay-4"
        style={{
          borderRadius: '24px',
          padding: '4rem 2rem',
          textAlign: 'center',
          border: '1px solid rgba(212,175,55,0.3)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(212,175,55,0.02) 100%)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '5rem'
        }}
      >
        <Sparkles size={40} color="var(--accent-gold)" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          Impeccable Service, Delivered.
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Our catering management isn't just about serving food; it's about choreographing a culinary experience. Paired with our trained PRO Girls who manage VVIPs, navigate crowds, and ensure smooth table hosting, your event transforms into an elite, stress-free celebration.
        </p>
      </div>

      {/* Service Standards */}
      <div style={{ marginBottom: '5rem' }}>
        <h2 className="section-title text-center mb-12 animate-in-delay-4" style={{ fontSize: '2rem' }}>Our Standards of Excellence</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { icon: CheckCircle2, title: 'Hygiene First', desc: 'Strict adherence to premium health and safety protocols.' },
            { icon: ShieldCheck, title: 'Trained Staff', desc: 'All PRO girls and servers undergo rigorous hospitality training.' },
            { icon: Heart, title: 'Personalized Care', desc: 'Anticipating guest needs before they even ask.' }
          ].map((std, i) => (
            <div
              key={i}
              className={`glass animate-in-delay-${i + 3}`}
              style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center' }}
            >
              <std.icon size={24} color="var(--accent-gold)" />
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{std.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{std.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
