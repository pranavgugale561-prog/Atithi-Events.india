import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((service) => {
    setCart(prev => {
      if (prev.find(item => item.id === service.id)) return prev;
      return [...prev, service];
    });
  }, []);

  const removeFromCart = useCallback((serviceId) => {
    setCart(prev => prev.filter(item => item.id !== serviceId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const isInCart = useCallback((serviceId) => {
    return cart.some(item => item.id === serviceId);
  }, [cart]);

  const sendCartToWhatsApp = useCallback(() => {
    if (cart.length === 0) return;
    const header = '✨ *Atithi Events — Service Inquiry* ✨\n\n';
    const items = cart.map((item, i) =>
      `${i + 1}. *${item.title}*\n   ${item.description}`
    ).join('\n\n');
    const footer = '\n\n---\nI\'m interested in the above services. Please share details & pricing. 🙏';
    const message = encodeURIComponent(header + items + footer);
    window.open(`https://wa.me/918080531468?text=${message}`, '_blank');
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart, sendCartToWhatsApp }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
