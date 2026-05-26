import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { endpoints } from '../api';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export default function BookingPage() {
  const { isAuthenticated } = useAuthStore();
  const [form, setForm] = useState({ booking_type: 'consultation', date: '', start_time: '10:00', end_time: '11:00', notes: '', location: 'Office Visit' });
  const [submitted, setSubmitted] = useState(false);
  const { data: servicesData } = useQuery({ queryKey: ['services-list'], queryFn: () => endpoints.getServices().then(r => r.data) });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAuthenticated) await endpoints.createBooking(form);
      else await endpoints.createLead({ name: '', phone: '', source: 'website', service_interest: 'Booking', message: `Booking request: ${form.booking_type} on ${form.date}` });
    } catch { /* */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-dark-900">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center p-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><FaCheck className="text-green-400 text-3xl" /></div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Booking Submitted!</h2>
          <p className="text-dark-400 mb-6">We will confirm your appointment shortly via email/phone.</p>
          <Link to="/" className="px-6 py-3 bg-gold-500 text-dark-900 rounded-xl font-bold">Back to Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FaCalendarAlt className="text-gold-500 text-4xl mx-auto mb-4" />
            <h1 className="text-4xl font-display font-bold text-white">Book a Consultation</h1>
            <p className="text-dark-400 mt-4">Schedule a meeting with our construction experts.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Consultation Type</label>
              <select value={form.booking_type} onChange={(e) => setForm({ ...form, booking_type: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500">
                <option value="consultation">Consultation</option>
                <option value="site_visit">Site Visit</option>
                <option value="design_review">Design Review</option>
                <option value="project_discussion">Project Discussion</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Preferred Date</label>
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Start Time</label>
                <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">End Time</label>
                <input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500" />
              </div>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Location Preference</label>
              <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500">
                <option value="Office Visit">Office Visit</option>
                <option value="Online (Zoom/Meet)">Online (Zoom/Meet)</option>
                <option value="Site Visit">Site Visit</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Additional Notes</label>
              <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Tell us about your project requirements..."
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 resize-none" />
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold text-lg hover:from-gold-400 hover:to-gold-300 transition-all">
              Confirm Booking
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}