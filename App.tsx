
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Leaf, 
  Package, 
  Ticket, 
  BarChart3, 
  Menu,
  X,
  User,
  Heart,
  Truck,
  MessageCircle
} from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import BrandExchangePage from './pages/BrandExchangePage';
import ImpactDashboard from './pages/ImpactDashboard';
import PartnersPage from './pages/PartnersPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

const Logo = ({ sizeClass = "text-[1.4rem]" }: { sizeClass?: string }) => (
  <div className="flex items-center gap-2">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circular arrow */}
      <path d="M16 4 C10 4 5 8.5 4.5 14.5" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M4.5 14.5 C4 20.5 8 26 14 27.5" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M14 27.5 C20 29 26 25 27.5 19" stroke="#40916C" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M27.5 19 C29 13 25 7.5 19.5 5.5" stroke="#40916C" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Arrow head at top right */}
      <path d="M17 3 L20 6 L16.5 7" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Small leaf in center */}
      <path d="M16 10 C16 10 12 14 14 18 C15 20 17 20 18 18 C20 14 16 10 16 10Z" fill="#40916C" opacity="0.9"/>
      <path d="M16 10 L16 18" stroke="#B7E4C7" strokeWidth="1" strokeLinecap="round"/>
    </svg>
    <span className={`${sizeClass} font-extrabold heading-font flex items-center`}>
      <span className="text-[#2D6A4F]">Re</span>
      <span className="text-[#F4A261]">Circle</span>
    </span>
  </div>
);

const Toast = ({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <div className="bg-[#1B2A22] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/30">
        <MessageCircle className="text-emerald-400" />
        <p className="font-semibold">{message}</p>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'How You Earn', path: '/exchange' },
    { name: 'Partners', path: '/partners' },
    { name: 'Impact', path: '/impact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-[#B7E4C7]/30 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link to="/">
          <Logo sizeClass="text-[1.4rem]" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold tracking-wide hover:text-[#2D6A4F] transition-colors ${
                location.pathname === link.path ? 'text-[#2D6A4F]' : 'text-[#1B2A22]/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/donate" 
            className="bg-[#2D6A4F] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#1B2A22] transition-all active:scale-95 btn-shadow"
          >
            Schedule Pickup
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#1B2A22]">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 top-20 bg-[#FEFAE0] transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold heading-font text-[#1B2A22]"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/donate"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 flex justify-center bg-[#2D6A4F] text-white py-4 rounded-2xl font-bold text-lg"
          >
            Schedule Pickup Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => setToast({ visible: true, message });

  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-20">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donate" element={<DonatePage showToast={showToast} />} />
            <Route path="/exchange" element={<BrandExchangePage />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        
        <footer className="bg-[#1B2A22] text-[#D8F3DC] py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <Logo sizeClass="text-[1.5rem]" />
              <p className="text-sm leading-relaxed opacity-70">
                Your old clothes deserve a second life. We handle 100% of logistics—pickup, sorting, and delivery.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[38px] h-[38px] bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2D6A4F] cursor-pointer transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[38px] h-[38px] bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2D6A4F] cursor-pointer transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white heading-font font-bold text-lg mb-6 uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm opacity-70">
                <li><Link to="/how-it-works" className="hover:text-emerald-400 font-semibold">How It Works</Link></li>
                <li><Link to="/exchange" className="hover:text-emerald-400 font-semibold">How You Earn</Link></li>
                <li><Link to="/donate" className="hover:text-emerald-400 font-semibold">Schedule Pickup</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white heading-font font-bold text-lg mb-6 uppercase tracking-widest">Partners</h4>
              <ul className="space-y-4 text-sm opacity-70">
                <li><Link to="/partners" className="hover:text-emerald-400 font-semibold">Brand Partners</Link></li>
                <li><Link to="/partners" className="hover:text-emerald-400 font-semibold">NGO Partners</Link></li>
                <li><Link to="/impact" className="hover:text-emerald-400 font-semibold">Impact Stats</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white heading-font font-bold text-lg mb-6 uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm opacity-70">
                <li><Link to="/about" className="hover:text-emerald-400 font-semibold">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-400 font-semibold">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-emerald-400 font-semibold">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-xs opacity-40">
            Copyright © 2026 ReCircle India Pvt. Ltd.
          </div>
        </footer>

        <Toast 
          message={toast.message} 
          visible={toast.visible} 
          onClose={() => setToast({ ...toast, visible: false })} 
        />
      </div>
    </Router>
  );
}
