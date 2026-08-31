import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { Palette, Sparkles, Loader, X, ChevronLeft, ChevronRight, Play, Share2 } from 'lucide-react';
import { getActivities } from '../utils/services';
import { useCart } from '../components/CartContext';
import { shareItem } from '../utils/shareUtils';

export default function ActivityZone() {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openModal = (item) => {
    if (item.images && item.images.length > 0) {
      setSelectedItem(item);
      setCurrentImageIndex(0);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedItem && selectedItem.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedItem && selectedItem.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    }
  };

  // Group by category
  const categoriesMap = new Map();
  activities.forEach(act => {
    const cat = act.category || "General";
    if (!categoriesMap.has(cat)) categoriesMap.set(cat, []);
    categoriesMap.get(cat).push(act);
  });
  
  const groupedData = Array.from(categoriesMap.entries()).map(([cat, items]) => ({
    category: cat,
    items: items
  }));

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
          backgroundImage: 'url(https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 40%, var(--bg-primary) 100%)'
        }} />

        <div className="animate-in" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 30,
              marginBottom: 24,
            }}
          >
            <Palette size={16} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.1em' }}>
              CREATIVE EXPERIENCES
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', 
              color: '#fff', 
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            The Activity <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Zone</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.7 }}
          >
            Engage your guests with interactive, hands-on, and delightful experiences across art, beauty, science, and food.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'clamp(60px, 8vw, 100px)', paddingBottom: 100 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>
              <Loader size={48} color="var(--accent-gold)" />
            </motion.div>
          </div>
        ) : (
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem', padding: '5rem 24px' }}>
            {groupedData.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '40px' }}>Loading or no activities available.</p>
            ) : groupedData.map((categoryObj, idx) => (
              <div key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '3rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}>
                    {categoryObj.category}
                  </h2>
                  <div style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto', opacity: 0.5 }}></div>
                </motion.div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
                  gap: '2rem'
                }}>
                  {categoryObj.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.id || itemIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ delay: (itemIdx % 6) * 0.1, duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      onClick={() => openModal(item)}
                      style={{
                        position: 'relative',
                        height: 400,
                        borderRadius: 24,
                        overflow: 'hidden',
                        cursor: item.images && item.images.length > 0 ? 'pointer' : 'default',
                        border: '1px solid rgba(212,175,55,0.2)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        background: 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,1) 100%)'
                      }}
                    >
                      {item.images && item.images.length > 0 ? (
                        <>
                          {(() => {
                            const url = item.images[0];
                            const isVideo = url.split('?')[0].toLowerCase().match(/\.(mp4|webm|mov)$/) || url.includes('video%2F');
                            return isVideo ? (
                              <video src={url} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="gallery-img-hover" autoPlay loop muted playsInline />
                            ) : (
                              <img src={url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="gallery-img-hover" />
                            );
                          })()}
                          <div style={{
                            position: 'absolute', top: 16, right: 16,
                            background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: 20,
                            backdropFilter: 'blur(4px)', display: 'flex', gap: 6, alignItems: 'center'
                          }}>
                            <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{item.images.length}</span>
                            <Sparkles size={14} color="var(--accent-gold)" />
                          </div>
                        </>
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Palette size={64} color="var(--accent-gold)" style={{ opacity: 0.2 }} />
                        </div>
                      )}
                      
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '2rem'
                      }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif" }}>
                          {item.title}
                        </h3>
                        {item.description && (
                          <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.description}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInCart(item.id || item.title)) {
                                removeFromCart(item.id || item.title);
                              } else {
                                addToCart({ ...item, id: item.id || item.title });
                              }
                            }}
                            style={{
                              flex: 1,
                              padding: '8px 16px',
                              background: isInCart(item.id || item.title) ? 'transparent' : 'var(--accent-gold)',
                              color: isInCart(item.id || item.title) ? 'var(--accent-gold)' : '#000',
                              border: '1px solid var(--accent-gold)',
                              borderRadius: '20px',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {isInCart(item.id || item.title) ? 'Remove' : 'Add to Cart'}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              shareItem(item);
                            }}
                            style={{
                              padding: '8px',
                              background: 'rgba(255,255,255,0.1)',
                              color: '#fff',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '50%',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-gold)'; e.currentTarget.style.color = '#000'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                            title="Share"
                          >
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .gallery-img-hover { transition: transform 0.7s ease !important; }
        div:hover > .gallery-img-hover { transform: scale(1.08) !important; }
      `}</style>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute', top: 24, right: 24,
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: '#fff', padding: 12, borderRadius: '50%',
                cursor: 'pointer', zIndex: 10
              }}
            >
              <X size={24} />
            </button>

            <div style={{ position: 'relative', width: '100%', maxWidth: 1000, height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedItem.images.length > 1 && (
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute', left: 24,
                    background: 'rgba(255,255,255,0.1)', border: 'none',
                    color: '#fff', padding: 16, borderRadius: '50%',
                    cursor: 'pointer', zIndex: 10
                  }}
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              
              {(() => {
                const url = selectedItem.images[currentImageIndex];
                const isVideo = url.split('?')[0].toLowerCase().match(/\.(mp4|webm|mov)$/) || url.includes('video%2F');
                return isVideo ? (
                  <video src={url} style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} autoPlay controls playsInline onClick={(e) => e.stopPropagation()} />
                ) : (
                  <img src={url} alt={selectedItem.title} style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()} />
                );
              })()}

              {selectedItem.images.length > 1 && (
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute', right: 24,
                    background: 'rgba(255,255,255,0.1)', border: 'none',
                    color: '#fff', padding: 16, borderRadius: '50%',
                    cursor: 'pointer', zIndex: 10
                  }}
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>
            
            <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: 8 }}>{selectedItem.title}</h3>
              <p style={{ color: 'var(--accent-gold)', marginBottom: 16 }}>{currentImageIndex + 1} / {selectedItem.images.length}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInCart(selectedItem.id || selectedItem.title)) {
                      removeFromCart(selectedItem.id || selectedItem.title);
                    } else {
                      addToCart({ ...selectedItem, id: selectedItem.id || selectedItem.title });
                    }
                  }}
                  style={{
                    padding: '10px 24px',
                    background: isInCart(selectedItem.id || selectedItem.title) ? 'transparent' : 'var(--accent-gold)',
                    color: isInCart(selectedItem.id || selectedItem.title) ? 'var(--accent-gold)' : '#000',
                    border: '2px solid var(--accent-gold)',
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  {isInCart(selectedItem.id || selectedItem.title) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    shareItem(selectedItem);
                  }}
                  style={{
                    padding: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-gold)'; e.currentTarget.style.color = '#000'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
