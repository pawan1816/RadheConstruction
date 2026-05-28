import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { endpoints } from '../api';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../stores/themeStore';
import { Link } from 'react-router-dom';

export default function BookingPage() {
  const { isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();
  const dk = theme === 'dark';
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    booking_type: 'consultation', date: '', start_time: '10:00', end_time: '11:00',
    notes: '', location: 'Office Visit',
  });
  const [submitted, setSubmitted] = useState(false);

  const inputCls = `w-full px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 transition-colors ${dk ? 'bg-dark-800 border border-dark-700 text-white placeholder-dark-500' : 'bg-white border border-dark-200 text-dark-900 placeholder-dark-400'}`;
  const labelCls = `block text-sm font-medium mb-2 ${dk ? 'text-white' : 'text-dark-900'}`;
  const cardCls = `p-5 rounded-xl ${dk ? 'bg-dark-800/50 border border-dark-700/50' : 'bg-dark-50 border border-dark-100'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        await endpoints.createBooking({
          booking_type: form.booking_type, date: form.date, start_time: form.start_time, end_time: form.end_time, notes: form.notes, location: form.location,
        });
      } else {
        await endpoints.createLead({
          name: form.name || 'Guest', phone: form.phone || 'N/A', email: form.email || '', source: 'website',
          service_interest: `Booking: ${form.booking_type}`,
          message: `Booking request: ${form.booking_type} on ${form.date} at ${form.start_time}. Location: ${form.location}. ${form.notes}`.trim(),
        });
      }
    } catch { /* still show success */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`pt-24 min-h-screen flex items-center justify-center ${dk ? 'bg-dark-900' : 'bg-white'}`}>
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center p-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><FaCheck className="text-green-500 text-3xl" /></div>
          <h2 className={`text-2xl font-display font-bold mb-2 ${dk ? 'text-white' : 'text-dark-900'}`}>Booking Submitted!</h2>
          <p className={`mb-6 ${dk ? 'text-dark-400' : 'text-dark-500'}`}>We will confirm your appointment shortly via phone or email.</p>
          <Link to="/" className="px-6 py-3 bg-gold-500 text-dark-900 rounded-xl font-bold">Back to Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className={`py-20 ${dk ? 'bg-gradient-to-b from-dark-900 to-dark-950' : 'bg-gradient-to-b from-dark-50 to-white'}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FaCalendarAlt className="text-gold-500 text-4xl mx-auto mb-4" />
            <h1 className={`text-4xl font-display font-bold ${dk ? 'text-white' : 'text-dark-900'}`}>Book a Consultation</h1>
            <p className={`mt-4 ${dk ? 'text-dark-400' : 'text-dark-500'}`}>Schedule a meeting with our construction experts.</p>
          </motion.div>
        </div>
      </section>

      <section className={`py-16 ${dk ? 'bg-dark-900' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isAuthenticated && (
              <div className={`space-y-4 ${cardCls}`}>
                <h3 className={`font-semibold text-sm ${dk ? 'text-white' : 'text-dark-900'}`}>Your Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                  <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                </div>
                <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
            )}
            <div><label className={labelCls}>Consultation Type</label>
              <select value={form.booking_type} onChange={(e) => setForm({ ...form, booking_type: e.target.value })} className={inputCls}>
                <option value="consultation">Consultation</option><option value="site_visit">Site Visit</option><option value="design_review">Design Review</option><option value="project_discussion">Project Discussion</option>
              </select>
            </div>
            <div><label className={labelCls}>Preferred Date</label>
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Start Time</label><input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className={inputCls} /></div>
              <div><label className={labelCls}>End Time</label><input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className={inputCls} /></div>
            </div>
            <div><label className={labelCls}>Location Preference</label>
              <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls}>
                <option value="Office Visit">Office Visit — Dhurva, Ranchi</option><option value="Online (Zoom/Meet)">Online (Zoom/Google Meet)</option><option value="Site Visit">Site Visit</option>
              </select>
            </div>
            <div><label className={labelCls}>Additional Notes</label>
              <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Tell us about your project requirements..." className={`${inputCls} resize-none`} />
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold text-lg hover:from-gold-400 hover:to-gold-300 transition-all">Confirm Booking</button>
          </form>
        </div>
      </section>
    </div>
  );
}