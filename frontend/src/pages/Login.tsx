import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaArrowRight } from 'react-icons/fa';
import { endpoints } from '../api';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../stores/themeStore';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', first_name: '', last_name: '', phone: '' });
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const dk = theme === 'dark';
  const inputCls = `w-full px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 transition-colors ${dk ? 'bg-dark-900 border border-dark-600 text-white placeholder-dark-500' : 'bg-white border border-dark-200 text-dark-900 placeholder-dark-400'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        const res = await endpoints.register(form);
        const { user, tokens } = res.data.data;
        login(user, tokens.access, tokens.refresh);
      } else {
        const res = await endpoints.login({ email: form.email, password: form.password });
        const { user, tokens } = res.data.data;
        login(user, tokens.access, tokens.refresh);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className={`pt-24 min-h-screen flex items-center justify-center px-4 ${dk ? 'bg-dark-900' : 'bg-white'}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className={`text-2xl font-bold font-display ${dk ? 'text-white' : 'text-dark-900'}`}>
            Build<span className="text-gold-500">Ranchi</span>
          </Link>
          <h2 className={`text-xl font-bold mt-4 ${dk ? 'text-white' : 'text-dark-900'}`}>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className={`text-sm mt-1 ${dk ? 'text-dark-400' : 'text-dark-500'}`}>{isRegister ? 'Join BuildRanchi Pro today' : 'Sign in to your account'}</p>
        </div>

        <div className={`p-8 rounded-2xl ${dk ? 'bg-dark-800/50 border border-dark-700/50' : 'bg-dark-50 border border-dark-100'}`}>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className={`absolute left-3 top-1/2 -translate-y-1/2 ${dk ? 'text-dark-500' : 'text-dark-400'}`} />
                  <input type="text" placeholder="First Name" required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className={`pl-10 ${inputCls}`} />
                </div>
                <input type="text" placeholder="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className={inputCls} />
              </div>
            )}
            <div className="relative">
              <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 ${dk ? 'text-dark-500' : 'text-dark-400'}`} />
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`pl-10 ${inputCls}`} />
            </div>
            {isRegister && (
              <div className="relative">
                <FaPhone className={`absolute left-3 top-1/2 -translate-y-1/2 ${dk ? 'text-dark-500' : 'text-dark-400'}`} />
                <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`pl-10 ${inputCls}`} />
              </div>
            )}
            <div className="relative">
              <FaLock className={`absolute left-3 top-1/2 -translate-y-1/2 ${dk ? 'text-dark-500' : 'text-dark-400'}`} />
              <input type="password" placeholder="Password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`pl-10 ${inputCls}`} />
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold flex items-center justify-center gap-2">
              {isRegister ? 'Create Account' : 'Sign In'} <FaArrowRight />
            </button>
          </form>
          <div className={`mt-6 text-center text-sm ${dk ? 'text-dark-400' : 'text-dark-500'}`}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => { setIsRegister(!isRegister); setError(''); }} className="text-gold-600 hover:text-gold-500 font-medium">
              {isRegister ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}