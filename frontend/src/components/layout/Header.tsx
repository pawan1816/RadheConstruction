import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { getWhatsAppLink } from '../../utils';
import { useThemeStore } from '../../stores/themeStore';
import ThemeToggle from '../ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const headerBg = isScrolled
    ? isDark
      ? 'bg-dark-900/95 backdrop-blur-lg shadow-lg shadow-dark-950/50 py-3'
      : 'bg-white/95 backdrop-blur-lg shadow-md py-3'
    : 'bg-transparent py-5';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-dark-900 text-lg font-display">
              B
            </div>
            <div>
              <span className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-dark-900'}`}>
                Build<span className="text-gold-500">Ranchi</span>
              </span>
              <span className="block text-[10px] text-gold-500 tracking-widest uppercase -mt-1">
                Pro Construction
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-gold-500 bg-gold-500/10'
                    : isDark
                      ? 'text-dark-300 hover:text-white hover:bg-white/5'
                      : 'text-dark-500 hover:text-dark-900 hover:bg-dark-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={getWhatsAppLink('916203277096')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp
            </a>
            <Link
              to="/quotation"
              className="px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-lg text-sm font-bold hover:from-gold-400 hover:to-gold-300 transition-all shadow-lg shadow-gold-500/25"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 ${isDark ? 'text-white' : 'text-dark-900'}`}
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 backdrop-blur-lg pt-24 px-6 lg:hidden ${
              isDark ? 'bg-dark-900/98' : 'bg-white/98'
            }`}
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-gold-500 bg-gold-500/10'
                      : isDark
                        ? 'text-white hover:bg-white/5'
                        : 'text-dark-900 hover:bg-dark-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/quotation"
                className="mt-4 px-5 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl text-center font-bold text-lg"
              >
                Get Free Quote
              </Link>
              <a
                href={getWhatsAppLink('916203277096')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-5 py-3 bg-green-600 text-white rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={20} /> WhatsApp Us
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating buttons (mobile) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 lg:hidden">
        <a
          href="tel:+917258021382"
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40 text-white"
        >
          <FaPhone size={20} />
        </a>
        <a
          href={getWhatsAppLink('916203277096')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/40 text-white animate-pulse-gold"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
    </>
  );
}