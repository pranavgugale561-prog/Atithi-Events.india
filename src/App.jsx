import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { useTraffic } from './hooks/useTraffic';
import { CartProvider } from './components/CartContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import ChatBubble from './components/ChatBubble';
import CartButton from './components/CartButton';
import LeadPopup from './components/LeadPopup';
import CustomCursor from './components/CustomCursor';
import PageTransitionLoader from './components/PageTransitionLoader';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import GoldenDustBackground from './components/GoldenDustBackground';

import WhyPlanner from './pages/WhyPlanner';
import Photography from './pages/Photography';
import WhySocialMedia from './pages/WhySocialMedia';
import EventClasses from './pages/EventClasses';
import CateringPRO from './pages/CateringPRO';

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <CustomCursor />
      <GoldenDustBackground />
      <PageTransitionLoader />
      {!isAdmin && <Navbar />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/why-planner" element={<WhyPlanner />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/why-social-media" element={<WhySocialMedia />} />
        <Route path="/classes" element={<EventClasses />} />
        <Route path="/catering-pro" element={<CateringPRO />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdmin && <MobileNav />}
      {!isAdmin && <CartButton />}
      {!isAdmin && <ChatBubble />}
      {!isAdmin && <LeadPopup />}
    </>
  );
}

function App() {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem('atithi_loaded') === 'true';
  });
  useTimeOfDay();
  useTraffic();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Prevent scrolling while loader is active
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loaded]);

  return (
    <CartProvider>
      <Router>
        {!loaded && <Loader onComplete={handleLoaderComplete} />}
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
