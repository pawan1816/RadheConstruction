import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useThemeStore } from '../stores/themeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
      style={{ backgroundColor: isDark ? '#2d2d44' : '#e0e0e5' }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center"
        animate={{
          left: isDark ? '30px' : '2px',
          backgroundColor: isDark ? '#d4a853' : '#f0d45c',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <FaMoon className="text-dark-900 text-xs" />
        ) : (
          <FaSun className="text-gold-700 text-xs" />
        )}
      </motion.div>
    </button>
  );
}