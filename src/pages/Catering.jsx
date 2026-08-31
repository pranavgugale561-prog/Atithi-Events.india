import { ChefHat, Users, GlassWater, Crown, Sparkles, Star, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function Catering() {
  const features = [
    {
      icon: Crown,
      title: 'Elite PRO Ambassadors',
      desc: 'Highly trained professionals for VIP guest handling, elegant welcomes, and seamless crowd coordination.'
    },
    {
      icon: ChefHat,
      title: 'Culinary Management',
      desc: 'Flawless execution of food service, ensuring every dish is presented beautifully and served at the perfect temperature.'
    },
    {
      icon: GlassWater,
      title: 'White-Glove Table Hosting',
      desc: 'Dedicated table hosts to attend to your special guests, managing their every need with grace and unmatched efficiency.'
    },
    {
      icon: Users,
      title: 'Bespoke Guest Experience',
      desc: 'From personalized seating arrangements to anticipatory service, we ensure your guests feel like absolute royalty.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Cinematic Hero Header */}
      <div style={{ 
        position: 'relative', 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '6rem 2rem 4rem 2rem',
        borderBottom: '1px solid rgba(212,175,55,0.1)'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 40%, var(--bg-primary) 100%)'
        }} />

        <div className="animate-in" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.25em', fontSize: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '24px' }}
          >
            <Star size={14} /> The Ultimate Luxury Experience <Star size={14} />
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              color: '#fff', 
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            Catering
            
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '750px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}
          >
            Elevate your event with world-class hospitality. From flawless catering execution to our elite team of PRO Girls ensuring every guest feels like royalty, we handle the intricacies of premium service.
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem', position: 'relative', zIndex: 1 }}>
        
        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '6rem'
        }}>
          {features.map((feature, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(212,175,55,0.08)' }}
              key={i}
              className="glass"
              style={{
                padding: '3rem 2rem',
                borderRadius: '24px',
                textAlign: 'center',
                border: '1px solid rgba(212,175,55,0.15)',
                borderTop: '1px solid rgba(212,175,55,0.4)',
                background: 'linear-gradient(180deg, rgba(20,20,15,0.8) 0%, rgba(10,10,10,0.9) 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', top: -50, right: -50,
                width: 150, height: 150, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
              }} />
              
              <div style={{
                width: 72, height: 72, margin: '0 auto 2rem', borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(212,175,55,0.3)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
              }}>
                <feature.icon size={32} color="var(--accent-gold)" />
              </div>
              
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Showcase / Promise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass"
          style={{
            borderRadius: '32px',
            padding: '5rem 3rem',
            textAlign: 'center',
            border: '1px solid rgba(212,175,55,0.2)',
            background: 'linear-gradient(180deg, rgba(212,175,55,0.03) 0%, rgba(6,5,10,0.8) 100%)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '6rem'
          }}
        >
          <Sparkles size={48} color="var(--accent-gold)" style={{ margin: '0 auto 2rem', opacity: 0.6 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--accent-gold)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
            Impeccable Service, Delivered.
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto 2rem auto', opacity: 0.5 }} />
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Our catering management isn't just about serving food; it's about choreographing a culinary experience. Paired with our trained PRO Girls who manage VVIPs, navigate crowds, and ensure smooth table hosting, your event transforms into an elite, stress-free celebration.
          </p>
        </motion.div>

        {/* Service Standards */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(2rem, 3vw, 2.8rem)', 
            textAlign: 'center', 
            color: '#fff', 
            marginBottom: '3rem' 
          }}>
            Our Standards of Excellence
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: CheckCircle2, title: 'Hygiene First', desc: 'Strict adherence to premium health and safety protocols.' },
              { icon: ShieldCheck, title: 'Trained Staff', desc: 'All PRO girls and servers undergo rigorous hospitality training.' },
              { icon: Heart, title: 'Personalized Care', desc: 'Anticipating guest needs before they even ask.' }
            ].map((std, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                key={i}
                className="glass"
                style={{ 
                  padding: '2rem', 
                  borderRadius: '20px', 
                  display: 'flex', 
                  gap: '1.5rem', 
                  alignItems: 'flex-start',
                  background: 'rgba(20,20,15,0.4)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ padding: '12px', background: 'rgba(212,175,55,0.1)', borderRadius: '12px' }}>
                  <std.icon size={28} color="var(--accent-gold)" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.4rem', fontWeight: 600 }}>{std.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{std.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
