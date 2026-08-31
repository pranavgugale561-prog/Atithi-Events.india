import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { useTraffic } from './hooks/useTraffic';
import { useClickTracking } from './hooks/useClickTracking';
import { CartProvider } from './components/CartContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import ChatBubble from './components/ChatBubble';
import CartButton from './components/CartButton';
import LeadPopup from './components/LeadPopup';
import CustomCursor from './components/CustomCursor';
import PageTransitionLoader from './components/PageTransitionLoader';
import GoldenButterfly from './components/GoldenButterfly';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import GoldenDustBackground from './components/GoldenDustBackground';

import ScrollToTop from './components/ScrollToTop';
import WhyPlanner from './pages/WhyPlanner';
import Photography from './pages/Photography';
import WhySocialMedia from './pages/WhySocialMedia';
import EventClasses from './pages/EventClasses';
import Catering from './pages/Catering';
import AboutContact from './pages/AboutContact';
import NotFound from './pages/NotFound';
import ActivityZone from './pages/ActivityZone';
import ArtistSection from './pages/ArtistSection';
import Reels from './pages/Reels';
import ErrorBoundary from './components/ErrorBoundary';
import BackgroundMusic from './components/BackgroundMusic';

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Only track clicks on public-facing pages
  useClickTracking();

  // Reset scroll to top on route change (but not on hash changes)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <ErrorBoundary>
      <CustomCursor />
      <GoldenDustBackground />
      {!isAdmin && <BackgroundMusic />}
      {!isAdmin && <GoldenButterfly />}
      {!isAdmin && <Navbar />}
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/why-planner" element={<WhyPlanner />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/why-social-media" element={<WhySocialMedia />} />
        <Route path="/shaadi-bts" element={<WhySocialMedia />} />
        <Route path="/classes" element={<EventClasses />} />
        <Route path="/academy" element={<EventClasses />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/activity-zone" element={<ActivityZone />} />
        <Route path="/artists" element={<ArtistSection />} />
        <Route path="/contact" element={<AboutContact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <MobileNav />}
      {!isAdmin && <CartButton />}
      {!isAdmin && <ChatBubble />}
      {!isAdmin && <LeadPopup />}
    </ErrorBoundary>
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
    <ErrorBoundary>
      <CartProvider>
        <Router>
          {!loaded && <Loader onComplete={handleLoaderComplete} />}
          {loaded && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <AppRoutes />
            </motion.div>
          )}
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
