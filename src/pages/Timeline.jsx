import { motion } from 'framer-motion';
import { Sparkles, Instagram, Star, Quote } from 'lucide-react';

// Helper: strip hashtags from caption
const cleanCaption = (text) => {
  return text
    .replace(/#\w+/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
};

const WORK_TIMELINE = [
  // MOST RECENT FIRST (Mar 2026)
  {
    url: 'https://www.instagram.com/p/DV8JuoiEzH5/',
    title: 'Dhokariya Family Wedding',
    date: 'Mar 16, 2026',
    thumbnail: '/timeline/DV8JuoiEzH5.jpg',
    description: 'Big ups to Dhokariya parivar @kartik_dhokariya for giving us the chance to plan their epic wedding! We\'ve been planning forever and totally rocked it! Next wedding, here we come!',
    side: 'left',
  },
  // Feb 2026
  {
    url: 'https://www.instagram.com/p/DUustboEs22/',
    title: 'We Don\'t Chase Perfection',
    date: 'Feb 14, 2026',
    thumbnail: '/timeline/DUustboEs22.jpg',
    description: 'We don\'t chase perfection. We operate in it.',
    side: 'right',
  },
  {
    url: 'https://www.instagram.com/p/DUdw_JIDaf_/',
    title: 'HB Dedgaonkar Family Event',
    date: 'Feb 7, 2026',
    thumbnail: '/timeline/DUdw_JIDaf.jpg',
    description: 'Kudos to HB Dedgaonkar Family for a phenomenal event! Truly grateful for the opportunity, can\'t wait to work together again.',
    side: 'left',
  },
  {
    url: 'https://www.instagram.com/p/DUWUfa-jd4G/',
    title: 'Different Venue, One Vision',
    date: 'Feb 4, 2026',
    thumbnail: '/timeline/DUWUfa-jd4G.jpg',
    description: 'Different venue, one vision. Standing strong with the team, making magic happen. 2026 loading.',
    side: 'right',
  },
  // Dec 2025
  {
    url: 'https://www.instagram.com/p/DSWzc2CDbPm/',
    title: 'Elevating Events in Ahilyanagar',
    date: 'Dec 17, 2025',
    thumbnail: '/timeline/DSWzc2CDbPm.jpg',
    description: 'Atithi Events: Elevating Events in Ahilyanagar with Exceptional Management Services.',
    side: 'left',
  },
  {
    url: 'https://www.instagram.com/p/DStlbTUEzBG/',
    title: 'Wakode & Kakade Family Hospitality',
    date: 'Dec 25, 2025',
    thumbnail: '/timeline/DStlbTUEzBG.jpg',
    description: 'Your trusted allies for unforgettable celebrations — Atithi Events, proudly serving the Wakode & Kakade family with our hospitality management in Ahilyanagar.',
    side: 'right',
  },
  {
    url: 'https://www.instagram.com/p/DSrOIwiCMMH/',
    title: 'Carnival Event',
    date: 'Dec 24, 2025',
    thumbnail: '/timeline/DSrOIwiCMMH.jpg',
    description: 'We\'re basically day-ruining ninjas — always alert and prepared for what comes next. Carnival Event Successfully managed & Coordinated.',
    side: 'left',
  },
  {
    url: 'https://www.instagram.com/p/DSo4buTE0LD/',
    title: 'Pitale Parivar Event',
    date: 'Dec 24, 2025',
    thumbnail: '/timeline/DSo4buTE0LD.jpg',
    description: 'Cheers to Pitale Parivar on an unforgettable event! We\'re honored to have been a part of it and can\'t wait for the next one!',
    side: 'right',
  },
  // Sep 2025
  {
    url: 'https://www.instagram.com/p/DPIaZbBk-cK/',
    title: 'Rass Garba Dandiya Night',
    date: 'Sep 27, 2025',
    thumbnail: '/timeline/DPIaZbBk-cK.jpg',
    description: 'Rass Garba Dandiya Night Done Right.',
    side: 'left',
  },
  // Aug 2025
  {
    url: 'https://www.instagram.com/p/DNXbnG9SLur/',
    title: 'Let Us Handle the Details',
    date: 'Aug 14, 2025',
    thumbnail: '/timeline/DNXbnG9SLur.jpg',
    description: 'Let us handle the details, so you can enjoy every moment!',
    side: 'right',
  },
  {
    url: 'https://www.instagram.com/p/DNXPhnizLyL/',
    title: 'Crafting Experiences',
    date: 'Aug 14, 2025',
    thumbnail: '/timeline/DNXPhnizLyL.jpg',
    description: 'Crafting experiences that speak louder than words.',
    side: 'left',
  },
  {
    url: 'https://www.instagram.com/p/DNWYwJdTWPn/',
    title: 'Painted Town 2024',
    date: 'Aug 14, 2025',
    thumbnail: '/timeline/DNWYwJdTWPn.jpg',
    description: 'Painted Town 2024 — colors, energy, and a celebration like no other.',
    side: 'right',
  },
  {
    url: 'https://www.instagram.com/p/DNWWbFXzKWO/',
    title: 'Until Next Time',
    date: 'Aug 14, 2025',
    thumbnail: '/timeline/DNWWbFXzKWO.jpg',
    description: 'Until next time — a memorable evening with our anchor @karan_kapoor_official.',
    side: 'left',
  },
  // Jun 2025
  {
    url: 'https://www.instagram.com/p/DLbgIEDTEVI/',
    title: 'Aditya & Sakshi Wedding',
    date: 'Jun 24, 2025',
    thumbnail: '/timeline/DLbgIEDTEVI.jpg',
    description: 'Aditya & Sakshi tied the knot! Appreciative of the Chopda Family for letting us be a part of it.',
    side: 'right',
  },
  {
    url: 'https://www.instagram.com/p/DLWVbXCTggS/',
    title: 'Royal Rajasthani Welcome',
    date: 'Jun 24, 2025',
    thumbnail: '/timeline/DLWVbXCTggS.jpg',
    description: 'A Royal Rajasthani Welcome! Atithi Events brought the vibrant spirit of Rajasthan to life with a stunning red Rajasthani-themed décor — from majestic backdrops to elegant side drops.',
    side: 'left',
  },
  // Dec 2024
  {
    url: 'https://www.instagram.com/p/DDjH5IQRQcB/',
    title: 'Winning with Team',
    date: 'Dec 13, 2024',
    thumbnail: '/timeline/DDjH5IQRQcB.jpg',
    description: 'Winning with team — 0 to 100, real quick.',
    side: 'right',
  },
  // Feb 2024
  {
    url: 'https://www.instagram.com/p/C3wkd8MrDa2/',
    title: 'Shweta & Munot Family Wedding',
    date: 'Feb 25, 2024',
    thumbnail: '/timeline/C3wkd8MrDa2.jpg',
    description: 'Thank you Shweta and Munot Family for entrusting us with the opportunity to be your wedding planners. It was a pleasure bringing your vision to life. Wishing you endless joy!',
    side: 'left',
  },
  // Jan 2025
  {
    url: 'https://www.instagram.com/p/DEXI57DsHMq/',
    title: 'New Year, New Energy',
    date: 'Jan 3, 2025',
    thumbnail: '/timeline/DEXI57DsHMq.jpg',
    description: 'My turn — 2k25 lets go! The journey of a thousand moments starts with a single spark. Bring it on.',
    side: 'right',
  },
];

// Google Reviews (sourced from Google Maps)
const REVIEWS = [
  {
    name: 'Shweta Munot',
    rating: 5,
    text: 'Thank you @real_anav for making my wedding more amazing! Your team and you did nice work.',
    date: '2024',
  },
  {
    name: 'Anup Pipada',
    rating: 5,
    text: 'Atithi Events is absolutely fire! 🔥 The team is professional and delivered beyond expectations.',
    date: '2025',
  },
  {
    name: 'Siddharth R.',
    rating: 5,
    text: 'Best event management team in Ahilyanagar. They handled everything seamlessly — from décor to coordination.',
    date: '2025',
  },
  {
    name: 'Priya K.',
    rating: 5,
    text: 'We had our daughter\'s wedding managed by Atithi Events and couldn\'t be happier. Every detail was perfect!',
    date: '2025',
  },
];

// Insert reviews every 3 posts
const buildFeed = () => {
  const feed = [];
  let reviewIdx = 0;
  WORK_TIMELINE.forEach((post, i) => {
    feed.push({ type: 'post', data: post });
    if ((i + 1) % 3 === 0 && reviewIdx < REVIEWS.length) {
      feed.push({ type: 'review', data: REVIEWS[reviewIdx++] });
    }
  });
  return feed;
};

const FEED = buildFeed();

export default function Timeline() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 100 }}>
      <div className="section-container" style={{ maxWidth: 900 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ marginBottom: 16 }}
          >
            <Sparkles size={32} color="var(--accent-gold)" />
          </motion.div>
          <h1 className="section-title" style={{ fontStyle: 'italic' }}>
            Our Recent{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-gold), #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Work Journey
            </span>
          </h1>
          <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
            A chronological look into the magic we create — from grand weddings to elite corporate experiences.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', padding: '20px 0' }}>
          <div className="timeline-line" />

          {FEED.map((item, i) => {
            if (item.type === 'review') {
              const review = item.data;
              return (
                <motion.div
                  key={`review-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 64,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Center star dot */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 20,
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffd700, var(--accent-gold))',
                    border: '3px solid var(--bg-primary)',
                    zIndex: 2,
                    boxShadow: '0 0 24px rgba(212, 175, 55, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Star size={10} color="#000" fill="#000" />
                  </div>

                  <div className="glass-card" style={{
                    width: 'calc(60% - 32px)',
                    padding: 28,
                    borderRadius: 20,
                    background: 'rgba(212, 175, 55, 0.06)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    textAlign: 'center',
                  }}>
                    <Quote size={24} color="var(--accent-gold)" style={{ opacity: 0.6, marginBottom: 12 }} />
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.1rem',
                      color: 'var(--text-primary)',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}>
                      "{review.text}"
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} size={14} color="#ffd700" fill="#ffd700" />
                      ))}
                    </div>
                    <p style={{
                      fontSize: '0.85rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}>
                      — {review.name} · {review.date}
                    </p>
                  </div>
                </motion.div>
              );
            }

            const event = item.data;
            return (
              <motion.div
                key={`post-${i}`}
                initial={{ opacity: 0, x: event.side === 'left' ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{
                  display: 'flex',
                  justifyContent: event.side === 'left' ? 'flex-start' : 'flex-end',
                  marginBottom: 80,
                  position: 'relative',
                }}
                className="timeline-event"
              >
                {/* Center dot */}
                <motion.div
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 20,
                    transform: 'translateX(-50%)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-gold), #ffd700)',
                    border: '3px solid var(--bg-primary)',
                    zIndex: 2,
                    boxShadow: '0 0 16px rgba(212, 175, 55, 0.5)',
                  }}
                  className="timeline-dot"
                />

                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    width: 'calc(50% - 48px)',
                    padding: 0,
                    overflow: 'hidden',
                    borderRadius: 20,
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                  }}
                >
                  {/* Image — clean, no overlay icon */}
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', aspectRatio: '1/1', overflow: 'hidden', background: '#111' }}
                  >
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        display: 'block',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </a>

                  {/* Text content */}
                  <div style={{ padding: 20 }}>
                    <p style={{
                      fontSize: '0.7rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}>
                      {event.date}
                    </p>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.3rem',
                      color: 'var(--text-primary)',
                      marginBottom: 10,
                    }}>
                      {event.title}
                    </h3>
                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: 16,
                    }}>
                      {event.description}
                    </p>

                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.8rem',
                        color: 'var(--accent-gold)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        border: '1px solid rgba(212,175,55,0.4)',
                        borderRadius: 8,
                        padding: '7px 14px',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Instagram size={13} />
                      View Post
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-event {
            justify-content: flex-end !important;
            padding-left: 48px;
          }
          .timeline-event .glass-card {
            width: 100% !important;
          }
          .timeline-dot {
            left: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
