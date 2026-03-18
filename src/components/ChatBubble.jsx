import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const FAQ_BUTTONS = [
  { label: '👗 Dress Code', query: 'What is the dress code?' },
  { label: '📍 Venue Info', query: 'Where is the venue?' },
  { label: '📅 Schedule', query: 'What is the schedule?' },
  { label: '🎁 Gift Registry', query: 'Where is the gift registry?' },
  { label: '🍽️ Menu Options', query: 'What are the menu options?' },
  { label: '📸 Photo Policy', query: 'Can I take photos?' },
];

const RESPONSES = {
  'dress code': 'The dress code is **Black Tie Optional**. Think elegant evening wear — long gowns, cocktail dresses, or suits. Feel free to add your personal flair! 🌟',
  'venue': 'The celebration will be held at **The Grand Orchid Estate**, nestled in the countryside. Valet parking is available. Shuttles will run from the partner hotel every 30 minutes starting at 4 PM. 🏛️',
  'schedule': '**Ceremony**: 5:00 PM ・ **Cocktail Hour**: 5:45 PM ・ **Reception & Dinner**: 7:00 PM ・ **Dancing & Dessert**: 9:00 PM ・ **Sparkler Send-Off**: 11:30 PM ✨',
  'gift registry': 'We\'re registered at **Anthropologie** and **Crate & Barrel**. You can also contribute to our honeymoon fund via our wedding website. Your presence is the greatest gift! 💝',
  'menu': 'We\'re offering a **curated multi-course dinner** with vegetarian, vegan, and gluten-free options. A live pasta station and artisanal dessert bar will also be available! 🍝',
  'photo': 'We love photos! We have a professional photographer, but please feel free to capture moments. We just ask for an **unplugged ceremony** — phones away during the vows. 📸',
  'default': 'Thank you for your question! Our wedding coordinators will be happy to help. Feel free to ask about the dress code, venue, schedule, menu, or gift registry. 💐',
};

function getResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('dress') || q.includes('wear') || q.includes('attire')) return RESPONSES['dress code'];
  if (q.includes('venue') || q.includes('location') || q.includes('where')) return RESPONSES['venue'];
  if (q.includes('schedule') || q.includes('time') || q.includes('when')) return RESPONSES['schedule'];
  if (q.includes('gift') || q.includes('registry') || q.includes('present')) return RESPONSES['gift registry'];
  if (q.includes('menu') || q.includes('food') || q.includes('eat') || q.includes('dinner')) return RESPONSES['menu'];
  if (q.includes('photo') || q.includes('camera') || q.includes('picture')) return RESPONSES['photo'];
  return RESPONSES['default'];
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi there! 💐 I\'m your Wedding Assistant. Ask me anything about the celebration!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-chat', handleToggle);
    return () => window.removeEventListener('toggle-chat', handleToggle);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Float Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chat-float-btn"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={26} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 380,
              maxWidth: 'calc(100vw - 48px)',
              height: 520,
              maxHeight: 'calc(100vh - 120px)',
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 95,
              background: 'var(--chat-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 16px 64px rgba(0,0,0,0.15)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Sparkles size={20} color="var(--accent-gold)" />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Wedding Assistant
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-coral)' }}>
                    ● Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.type === 'user'
                      ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-coral))'
                      : 'var(--glass-bg)',
                    color: msg.type === 'user' ? '#fff' : 'var(--text-primary)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    border: msg.type === 'user' ? 'none' : '1px solid var(--glass-border)',
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '12px 16px',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    typing...
                  </motion.span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* FAQ Quick Buttons */}
            <div style={{
              padding: '8px 16px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              borderTop: '1px solid var(--glass-border)',
            }}>
              {FAQ_BUTTONS.map(btn => (
                <button
                  key={btn.label}
                  onClick={() => sendMessage(btn.query)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 10,
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'var(--accent-blush)';
                    e.target.style.borderColor = 'var(--accent-rose)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'var(--glass-bg)';
                    e.target.style.borderColor = 'var(--glass-border)';
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '12px 16px',
                display: 'flex',
                gap: 8,
                borderTop: '1px solid var(--glass-border)',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="input-luxury"
                style={{ flex: 1, padding: '10px 16px', borderRadius: 12 }}
              />
              <button
                type="submit"
                className="btn-squishy"
                style={{ padding: '10px 16px', borderRadius: 12 }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .chat-float-btn { bottom: 88px !important; }
        }
      `}</style>
    </>
  );
}
