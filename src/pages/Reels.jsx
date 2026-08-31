import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import Footer from '../components/Footer';
import { getReels } from '../utils/services';

export default function Reels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchReels = async () => {
      try {
        const data = await getReels();
        // Fallback to the requested test reel if the database is empty
        if (!data || data.length === 0) {
          setReels([
            { id: 'C3wkd8MrDa2', title: 'Atithi Cinematic Reel' }
          ]);
        } else {
          setReels(data);
        }
      } catch (err) {
        console.error(err);
        setReels([{ id: 'C3wkd8MrDa2', title: 'Atithi Cinematic Reel' }]);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  return (
    <div className="page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', flexShrink: 0 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }} className="animate-in">
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            color: 'var(--accent-gold)',
            lineHeight: 1.1,
            marginBottom: 24,
            fontWeight: 600,
            fontStyle: 'italic'
          }}>
            Instagram Reels
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            Experience the magic, behind-the-scenes, and cinematic moments of our events in motion.
          </p>
        </div>
      </section>

      {/* Reels Grid */}
      <section style={{ flex: 1, padding: '0 24px 100px 24px', display: 'flex', justifyContent: 'center' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            <Loader className="spin" size={48} color="var(--accent-gold)" />
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', 
            gap: '2rem', 
            maxWidth: 1200, 
            width: '100%',
            justifyItems: 'center'
          }}>
            {reels.map((reel, idx) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                style={{
                  width: '100%',
                  maxWidth: 400,
                  background: 'linear-gradient(145deg, rgba(20,20,15,0.95) 0%, rgba(5,5,5,0.98) 100%)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ padding: 16, borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                  <h3 style={{ margin: 0, color: 'var(--accent-gold)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}>
                    {reel.title}
                  </h3>
                </div>
                <div style={{ position: 'relative', width: '100%', height: 600, background: '#000' }}>
                  <iframe
                    src={"https://www.instagram.com/reel/" + reel.id + "/embed"}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    scrolling="no"
                    allowTransparency="true"
                    allow="encrypted-media"
                  />
                </div>
              </motion.div>
            ))}
            {reels.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.5)', gridColumn: '1 / -1', textAlign: 'center' }}>
                No reels available right now. Check back later!
              </p>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
