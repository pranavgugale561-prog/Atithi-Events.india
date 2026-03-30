import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { Palette, Sparkles, Loader } from 'lucide-react';
import { getActivities } from '../utils/services';

export default function ActivityZone() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (e) {
        console.error('Failed to fetch activities:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Group by category
  const categoriesMap = new Map();
  activities.forEach(act => {
    const cat = act.category || "General";
    if (!categoriesMap.has(cat)) categoriesMap.set(cat, []);
    categoriesMap.get(cat).push(act);
  });
  
  // Convert to array of objects { category, items }
  const groupedData = Array.from(categoriesMap.entries()).map(([cat, items]) => ({
    category: cat,
    items: items
  }));

  return (
    <div className="page-container" style={{ paddingBottom: 60, position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }} className="animate-in">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--accent-gold)',
            borderRadius: 30,
            marginBottom: 24,
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)'
          }}>
            <Palette size={16} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
              CREATIVE EXPERIENCES
            </span>
          </div>
          
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: 'var(--accent-gold)',
            lineHeight: 1.1,
            marginBottom: 24,
            fontWeight: 600,
            fontStyle: 'italic'
          }}>
            The Activity Zone
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            Engage your guests with interactive, hands-on, and delightful experiences across art, beauty, science, and food.
          </p>
        </div>
      </section>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60, paddingBottom: 100 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>
              <Loader size={32} color="var(--accent-gold)" />
            </motion.div>
          </div>
        ) : (
          <section className="section-container" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem', padding: '0 24px' }}>
            {groupedData.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '40px' }}>Loading or no activities available.</p>
            ) : groupedData.map((categoryObj, idx) => (
              <div key={idx}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  color: 'var(--accent-gold)',
                  marginBottom: '2rem',
                  borderBottom: '1px solid rgba(212,175,55,0.3)',
                  paddingBottom: '0.5rem'
                }}>
                  {categoryObj.category}
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.2rem'
                }}>
                  {categoryObj.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.id || itemIdx}
                      className="glass-card element-hover"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ delay: (itemIdx % 10) * 0.03, duration: 0.4 }}
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'default'
                      }}
                    >
                      {item.images && item.images.length > 0 ? (
                        <img 
                          src={item.images[0]} 
                          alt={item.title} 
                          style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, flexShrink: 0, border: '1px solid rgba(212,175,55,0.2)' }} 
                        />
                      ) : (
                        <div style={{ width: 44, height: 44, background: 'rgba(212,175,55,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Sparkles size={20} color="var(--accent-gold)" style={{ opacity: 0.8 }} />
                        </div>
                      )}
                      
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.title}
                        </h3>
                        {item.description && (
                          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
