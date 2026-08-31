import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Phone } from 'lucide-react';
import { getCustomerByPhone, addCustomer } from '../utils/services';

const FAQ_BUTTONS = [
  { label: 'Event Planning', query: 'I want to plan an event' },
  { label: 'Photography', query: 'I need a photographer' },
  { label: 'Catering Options', query: 'What are your catering options?' },
  { label: 'Pricing', query: 'How much do you charge?' },
];

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Chat state machine
  const [chatState, setChatState] = useState('INIT'); // INIT -> WAIT_NAME -> WAIT_PHONE -> CHAT
  const [userData, setUserData] = useState({ name: '', phone: '' });
  
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! Welcome to Atithi Events. Can I get your name to start?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if user is already logged into chat via localStorage
    const savedChatUser = localStorage.getItem('atithi_chat_user');
    if (savedChatUser) {
      try {
        const parsed = JSON.parse(savedChatUser);
        setUserData(parsed);
        setChatState('CHAT');
        setMessages([
          { id: 1, type: 'bot', text: `Welcome back, ${parsed.name}! How can we help you plan your next event today?` }
        ]);
      } catch (e) {}
    }

    const handleToggle = (e) => {
      setIsOpen(true);
      if (e.detail?.message) {
        setTimeout(() => handleUserMessage(e.detail.message), 500);
      }
    };
    window.addEventListener('toggle-chat', handleToggle);
    return () => window.removeEventListener('toggle-chat', handleToggle);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleUserMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    setInput('');

    if (chatState === 'INIT') {
      setUserData(prev => ({ ...prev, name: text }));
      setChatState('WAIT_PHONE');
      addBotMessage(`Nice to meet you, ${text}! Could you please provide your phone number so our team can reach out to you if we get disconnected?`);
      return;
    }

    if (chatState === 'WAIT_PHONE') {
      // Validate phone (simple check)
      const cleaned = text.replace(/[^0-9+]/g, '');
      if (cleaned.length < 8) {
        addBotMessage("That doesn't look like a valid phone number. Could you please try again?");
        return;
      }
      
      setUserData(prev => ({ ...prev, phone: cleaned }));
      setIsTyping(true);
      
      try {
        const existingCustomer = await getCustomerByPhone(cleaned);
        const name = userData.name;
        if (existingCustomer) {
          // Found existing
          localStorage.setItem('atithi_chat_user', JSON.stringify({ name: existingCustomer.name, phone: existingCustomer.phone }));
          setChatState('CHAT');
          addBotMessage(`Welcome back, ${existingCustomer.name}! We have your number ending in ${cleaned.slice(-4)} on file. What kind of event are you looking to plan today?`);
        } else {
          // New customer
          await addCustomer({ name, phone: cleaned, source: 'Chatbot' });
          localStorage.setItem('atithi_chat_user', JSON.stringify({ name, phone: cleaned }));
          setChatState('CHAT');
          addBotMessage(`Thanks ${name}! We've saved your contact info. How can our event experts assist you today?`);
        }
      } catch (err) {
        console.error("Firebase error", err);
        setChatState('CHAT');
        addBotMessage("Thanks! How can our event experts assist you today?");
      }
      
      setIsTyping(false);
      return;
    }

    if (chatState === 'CHAT') {
      // Basic sales agent NLP
      setIsTyping(true);
      setTimeout(() => {
        const q = text.toLowerCase();
        let reply = "Our team will be in touch with you shortly to discuss your requirements. Is there anything specific you want to know about our services?";
        
        if (q.includes('plan') || q.includes('event') || q.includes('wedding') || q.includes('birthday')) {
          reply = "We specialize in end-to-end event planning! We handle everything from venue selection to decor and catering. Would you like our planner to call you at " + userData.phone + " to discuss details?";
        } else if (q.includes('photo') || q.includes('video') || q.includes('cinematic')) {
          reply = "Our photography and cinematography team is top-notch! We offer drone shoots, candid photography, and cinematic films. Should I note down that you're interested in photography?";
        } else if (q.includes('cater') || q.includes('food') || q.includes('menu')) {
          reply = "We offer premium catering with live counters, multi-cuisine options, and personalized menus tailored to your taste. Do you have a rough guest count in mind?";
        } else if (q.includes('price') || q.includes('cost') || q.includes('charge')) {
          reply = "Our pricing is highly customizable based on your guest count, venue, and specific requirements. We'd love to give you a free consultation call. Would you prefer a morning or evening call?";
        } else if (q.includes('yes') || q.includes('sure') || q.includes('ok')) {
          reply = "Excellent! I've noted that down. Our senior event expert will give you a call on your number soon to discuss further. Meanwhile, feel free to explore our Activity Zone!";
        }

        setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: reply }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserMessage(input);
  };

  return (
    <>
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
                    Atithi Sales Agent
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-coral)' }}>
                    🟢 Online
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

            {/* FAQ Quick Buttons (only when in CHAT state) */}
            {chatState === 'CHAT' && (
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
                    onClick={() => handleUserMessage(btn.query)}
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
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}

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
                placeholder={chatState === 'INIT' ? "Enter your name..." : chatState === 'WAIT_PHONE' ? "Enter phone number..." : "Ask me anything..."}
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
          .chat-float-btn { bottom: 110px !important; }
        }
      `}</style>
    </>
  );
}
