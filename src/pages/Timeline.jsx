import { motion } from 'framer-motion';
import { Sparkles, Instagram, Star, Quote } from 'lucide-react';

// Helper: strip hashtags from caption
const cleanCaption = (text) => {
  return text
    .replace(/#\w+/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
};

import { useState, useEffect } from 'react';
import { getTimelineEvents } from '../utils/timeline';

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
const buildFeed = (events) => {
  const feed = [];
  let reviewIdx = 0;
  events.forEach((post, i) => {
    feed.push({ type: 'post', data: post });
    if ((i + 1) % 3 === 0 && reviewIdx < REVIEWS.length) {
      feed.push({ type: 'review', data: REVIEWS[reviewIdx++] });
    }
  });
  return feed;
};

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimelineEvents().then(data => {
      // Ensure alternating sides for UI layout
      const formatted = data.map((ev, i) => ({
        ...ev,
        side: ev.side || (i % 2 === 0 ? 'left' : 'right')
      }));
      setEvents(formatted);
      setLoading(false);
    });
  }, []);

  const FEED = buildFeed(events);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
        <p style={{ color: 'var(--accent-gold)' }}>Loading timeline...</p>
      </div>
    );
  }
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
