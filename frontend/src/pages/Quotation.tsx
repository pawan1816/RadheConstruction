import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaCheck } from 'react-icons/fa';
import { endpoints } from '../api';
import { Link } from 'react-router-dom';

const STEPS = ['Project Type', 'Specifications', 'Requirements', 'Submit'];

export default function QuotationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    project_type: '', service: '', budget_range: '', area_sqft: '', floors: '1', rooms: '3', requirements: '',
  });

  const handleSubmit = async () => {
    try { await endpoints.createQuotation(form); } catch { /* */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-dark-900">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center p-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><FaCheck className="text-green-400 text-3xl" /></div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Quotation Requested!</h2>
          <p className="text-dark-400 mb-6">Our team will prepare a detailed quotation within 24-48 hours.</p>
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
            <FaFileAlt className="text-gold-500 text-4xl mx-auto mb-4" />
            <h1 className="text-4xl font-display font-bold text-white">Get a Free Quotation</h1>
            <p className="text-dark-400 mt-4">Tell us about your project and receive a detailed quote.</p>
          </motion.div>
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-gold-500 text-dark-900' : 'bg-dark-700 text-dark-400'}`}>
                  {i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${i <= step ? 'text-gold-400' : 'text-dark-500'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-gold-500' : 'bg-dark-700'}`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-2xl mx-auto px-4">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Project Type</label>
                <select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500">
                  <option value="">Select project type</option>
                  {['Residential House', 'Apartment/Flat', 'Villa', 'Commercial Building', 'Office Space', 'Shopping Complex', 'Hospital', 'School', 'Renovation', 'Interior Design'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Budget Range</label>
                <select value={form.budget_range} onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500">
                  <option value="">Select budget range</option>
                  {['Below ₹25 Lakhs', '₹25-50 Lakhs', '₹50 Lakhs - ₹1 Crore', '₹1-2 Crore', '₹2-5 Crore', 'Above ₹5 Crore'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Total Area (sq.ft.)</label>
                <input type="number" value={form.area_sqft} onChange={(e) => setForm({ ...form, area_sqft: e.target.value })}
                  placeholder="e.g. 1500" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Floors</label>
                  <input type="number" value={form.floors} onChange={(e) => setForm({ ...form, floors: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Rooms</label>
                  <input type="number" value={form.rooms} onChange={(e) => setForm({ ...form, rooms: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-gold-500" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Project Requirements</label>
                <textarea rows={6} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  placeholder="Describe your requirements in detail — rooms needed, style preferences, special features, etc."
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 resize-none" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <h3 className="text-xl font-display font-bold text-white mb-4">Review & Submit</h3>
              <div className="space-y-2 text-dark-300 text-sm text-left max-w-sm mx-auto">
                <p><span className="text-dark-500">Project:</span> {form.project_type || 'Not specified'}</p>
                <p><span className="text-dark-500">Budget:</span> {form.budget_range || 'Not specified'}</p>
                <p><span className="text-dark-500">Area:</span> {form.area_sqft ? `${form.area_sqft} sq.ft.` : 'Not specified'}</p>
                <p><span className="text-dark-500">Floors:</span> {form.floors} | <span className="text-dark-500">Rooms:</span> {form.rooms}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="flex-1 py-3 bg-dark-800 text-white rounded-xl font-bold hover:bg-dark-700 transition-colors border border-dark-700">
                Previous
              </button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold">
                Next Step
              </button>
            ) : (
              <button onClick={handleSubmit} className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold">
                Submit Request
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}