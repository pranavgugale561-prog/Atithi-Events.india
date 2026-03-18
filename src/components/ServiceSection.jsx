import { useState, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { getServices } from '../utils/services';
import { useCart } from './CartContext';
import ServiceModal from './ServiceModal';
import {
  Hotel, Truck, Instagram, Palette, ChefHat, Camera, Music, MapPin,
  Briefcase, Star, Gem, Flower2, PartyPopper, Gift, ShoppingCart, Check,
  Hash, FileText, Video, Image, MessageCircle, Phone, Radio, Film,
  HardDrive, CalendarClock, Wallet, Shield, Monitor, Users, HeartPulse,
  ShoppingBag, Car, Presentation, ShieldCheck, Scissors, Home, Box,
  CircleSlashed, CircleDashed, Crown, Wind, CloudRain, Cloud, ArrowUpCircle,
  CarFront, Drum, Mic, Smile, Flame, TreePine, Shirt, PenTool, LayoutGrid,
  Crosshair, Circle
} from 'lucide-react';

const ICON_MAP = {
  hotel: Hotel,
  truck: Truck,
  instagram: Instagram,
  palette: Palette,
  chefHat: ChefHat,
  camera: Camera,
  music: Music,
  mapPin: MapPin,
  briefcase: Briefcase,
  star: Star,
  gem: Gem,
  flower: Flower2,
  party: PartyPopper,
  gift: Gift,
  hash: Hash,
  fileText: FileText,
  video: Video,
  image: Image,
  messageCircle: MessageCircle,
  phone: Phone,
  radio: Radio,
  film: Film,
  hardDrive: HardDrive,
  calendarClock: CalendarClock,
  wallet: Wallet,
  shield: Shield,
  monitor: Monitor,
  users: Users,
  heartPulse: HeartPulse,
  shoppingBag: ShoppingBag,
  car: Car,
  easel: Presentation,
  shieldCheck: ShieldCheck,
  scissors: Scissors,
  home: Home,
  box: Box,
  flower2: Flower2,
  circleSlashed: CircleSlashed,
  circleDashed: CircleDashed,
  crown: Crown,
  wind: Wind,
  cloudRain: CloudRain,
  cloud: Cloud,
  arrowUpCircle: ArrowUpCircle,
  carFront: CarFront,
  drum: Drum,
  mic: Mic,
  smile: Smile,
  flame: Flame,
  treePine: TreePine,
  shirt: Shirt,
  penTool: PenTool,
  layoutGrid: LayoutGrid,
  crosshair: Crosshair,
  circle: Circle,
};

function GlassCard({ service, index, onSelect }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [shadow, setShadow] = useState('0 8px 32px var(--glass-shadow)');
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(service.id);
  const images = service.images || [];
  const hasImages = images.length > 0;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;
    x.set(dx * 8);
    y.set(dy * 8);
    const shadowX = -dx * 20;
    const shadowY = -dy * 20;
    setShadow(`${shadowX}px ${shadowY}px 40px var(--glass-shadow)`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setShadow('0 8px 32px var(--glass-shadow)');
  };

  const Icon = ICON_MAP[service.icon] || Star;

  return (
    <motion.div
      className={`glass-card ${service.span || ''}`}
      onClick={() => onSelect(service)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: hasImages ? '0' : 'clamp(24px, 3vw, 36px)',
        paddingBottom: hasImages ? 'clamp(24px, 3vw, 36px)' : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: shadow,
        rotateX: y,
        rotateY: x,
        transformPerspective: 800,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -10,
        backgroundColor: 'rgba(212, 175, 55, 0.08)',
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ 
        delay: (index % 4) * 0.1, 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Image thumbnail strip */}
      {hasImages && (
        <div style={{
          display: 'flex',
          gap: 3,
          position: 'relative',
          height: 120,
          overflow: 'hidden',
          borderRadius: '24px 24px 0 0',
        }}>
          {images.slice(0, 3).map((src, i) => (
            <img key={i} src={src} alt="" style={{
              flex: i === 0 ? 2 : 1,
              objectFit: 'cover',
              height: '100%',
              minWidth: 0,
              filter: 'brightness(0.82)',
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.9) 100%)',
          }} />
          <span style={{
            position: 'absolute', bottom: 8, right: 10,
            fontSize: '0.68rem', fontWeight: 600, color: '#fff',
            background: 'rgba(212,175,55,0.85)', padding: '2px 8px',
            borderRadius: 20, backdropFilter: 'blur(4px)',
          }}>📷 {images.length} photo{images.length > 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Card content — padded separately when images exist */}
      <div style={{ padding: hasImages ? 'clamp(16px, 2vw, 24px)' : '0', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
      <motion.div 
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: 'var(--glass-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--glass-border)',
          transition: 'all 0.3s ease'
        }}
      >
        <Icon size={24} color="var(--accent-gold)" />
      </motion.div>

      <h3 style={{
        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500,
        color: 'var(--text-primary)',
      }}>
        {service.title}
      </h3>

      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
      }}>
        {service.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 8,
          background: 'var(--glass-bg)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontWeight: 500,
          border: '1px solid var(--glass-border)',
        }}>
          {service.category}
        </span>

        <motion.button
          onClick={(e) => { e.stopPropagation(); addToCart(service); }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}
          whileTap={{ scale: 0.9 }}
          animate={inCart ? { scale: [1, 1.2, 1] } : {}}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: inCart ? '8px 16px' : '8px 16px',
            borderRadius: 12,
            border: inCart ? '1px solid var(--accent-gold)' : '1px solid var(--glass-border)',
            background: inCart
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(184, 134, 11, 0.1))'
              : 'var(--glass-bg)',
            color: inCart ? 'var(--accent-gold)' : 'var(--text-secondary)',
            cursor: inCart ? 'default' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
          disabled={inCart}
        >
          {inCart ? (
            <>
              <Check size={14} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
      </div>{/* end inner padding div */}
    </motion.div>
  );
}

export default function ServiceSection() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setServices(getServices());

    const handleStorageChange = () => setServices(getServices());
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('services-updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('services-updated', handleStorageChange);
    };
  }, []);

  // Group services by category
  const categories = {};
  services.forEach(s => {
    if (!categories[s.category]) categories[s.category] = [];
    categories[s.category].push(s);
  });

  const categoryLabels = {
    'Digital': { title: 'Digital Experiences', subtitle: 'Curated digital invitations, websites, and social media magic.' },
    'Event Management': { title: 'Event Orchestration', subtitle: 'Flawless execution, seamless logistics, and worry-free planning.' },
    'Home Events': { title: 'Home Events & Prep', subtitle: 'Premium hospitality, security, and traditional prep for home-based ceremonies.' },
    'Décor & Rituals': { title: 'Décor & Ritual Artifacts', subtitle: 'Stunning aesthetics and authentic ritual settings for your sacred moments.' },
    'Entertainment': { title: 'Entertainment & Magic', subtitle: 'Spectacular entries, booming beats, and mesmerizing guest experiences.' },
    'Merchandise & Extras': { title: 'Interactive & Unique', subtitle: 'Memorable keepsakes and engaging guest activities.' },
    'Live Outlets': { title: 'Food & Live Counters', subtitle: 'Nostalgic treats and vibrant live stalls that keep the fun going.' }
  };

  const categoryList = ['All', ...Object.keys(categoryLabels)];
  const filteredCategories = Object.entries(categories).filter(([catKey]) => activeCategory === 'All' || catKey === activeCategory);

  let globalIndex = 0;

  return (
    <section id="services" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 className="section-title" style={{ fontStyle: 'italic' }}>
          Our Signature Services
        </h2>
        <p className="section-subtitle">
          Every celebration deserves an architect. We bring vision, precision,
          and effortless elegance to every detail.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="category-scroll-container"
        style={{ 
          display: 'flex', 
          gap: 12, 
          justifyContent: 'center', 
          marginBottom: 48,
          padding: '4px 0'
        }}
      >
        {categoryList.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            style={{
              padding: '10px 20px',
              borderRadius: 30,
              border: activeCategory === cat ? '1px solid var(--accent-gold)' : '1px solid var(--glass-border)',
              background: activeCategory === cat ? 'var(--accent-gold)' : 'var(--glass-bg)',
              color: activeCategory === cat ? '#000' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.3s ease',
              boxShadow: activeCategory === cat ? '0 4px 16px rgba(212, 175, 55, 0.3)' : 'none',
              flexShrink: 0
            }}
          >
            {categoryLabels[cat]?.title || cat}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="popLayout">
        {filteredCategories.map(([catKey, catServices]) => {
          const label = categoryLabels[catKey] || { title: catKey, subtitle: '' };
          return (
            <motion.div 
              key={catKey} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: 64 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  color: 'var(--accent-gold)',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  marginBottom: 8,
                }}>
                  {label.title}
                </h3>
                {label.subtitle && (
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    maxWidth: 500,
                    lineHeight: 1.5,
                    margin: '0 auto'
                  }}>
                    {label.subtitle}
                  </p>
                )}
              </motion.div>

              <div className="bento-grid">
                {catServices.map(service => {
                  const i = globalIndex++;
                  return <GlassCard key={service.id} service={service} index={i} onSelect={setSelectedService} />;
                })}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
}
