import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCheck, FaPaperPlane } from 'react-icons/fa';
import { endpoints } from '../api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await endpoints.submitContact(form); } catch { /* */ }
    setSubmitted(true);
  };

  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-2">Contact Us</h1>
            <p className="text-dark-400 mt-4 max-w-2xl mx-auto">Have a question? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold text-white">Reach Out Directly</h2>
            <div className="space-y-6">
              {[
                { icon: FaPhone, label: 'Phone', value: '+91 7258021382', href: 'tel:+917258021382' },
                { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 6203277096', href: 'https://wa.me/916203277096' },
                { icon: FaEnvelope, label: 'Email', value: 'paikpawan18@gmail.com', href: 'mailto:paikpawan18@gmail.com' },
                { icon: FaMapMarkerAlt, label: 'Office', value: 'Dhurva, Ranchi, Jharkhand', href: '#' },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-dark-800/50 border border-dark-700/50 hover:border-gold-500/30 transition-all">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-gold-500" />
                  </div>
                  <div>
                    <div className="text-dark-500 text-xs uppercase tracking-wider">{item.label}</div>
                    <div className="text-white text-sm mt-1">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-700/50">
            {submitted ? (
              <div className="text-center py-12">
                <FaCheck className="text-green-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-dark-400">We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-display font-bold text-white mb-4">Send a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
                  <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
                </div>
                <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
                <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
                <textarea rows={4} placeholder="Your Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 resize-none" />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold flex items-center justify-center gap-2">
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-dark-950">
        <iframe title="BuildRanchi Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29218.224376849478!2d85.29!3d23.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1e4b917c7e7%3A0x7b3b3b7b7b7b7b7b!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" />
      </section>
    </div>
  );
}