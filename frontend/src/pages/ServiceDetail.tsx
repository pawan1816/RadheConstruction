import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { FaCheck, FaArrowRight, FaPhone, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { endpoints } from '../api';
import { formatCurrency } from '../utils';
import type { Service } from '../types';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = useQuery({
    queryKey: ['service', slug],
    queryFn: () => endpoints.getService(slug!).then(r => r.data),
    enabled: !!slug,
  });

  if (isLoading) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="text-gold-500">Loading...</div></div>;
  if (!service) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="text-red-400">Service not found</div></div>;

  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="text-sm text-dark-400 mb-4">
              <Link to="/" className="hover:text-gold-400">Home</Link> / <Link to="/services" className="hover:text-gold-400">Services</Link> / <span className="text-white">{service.name}</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">{service.name}</h1>
            <p className="text-dark-400 mt-4 max-w-2xl">{service.short_description}</p>
            {service.price_range_min && (
              <div className="mt-4 text-gold-400 text-lg font-semibold">
                {formatCurrency(service.price_range_min)} — {formatCurrency(service.price_range_max!)} {service.price_unit}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: service.description }} />

            {service.features && service.features.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-display font-bold text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-dark-300">
                      <FaCheck className="text-gold-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.process_steps && service.process_steps.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-display font-bold text-white mb-6">Our Process</h3>
                <div className="space-y-4">
                  {service.process_steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 font-bold flex-shrink-0">{i + 1}</div>
                      <div>
                        <h4 className="text-white font-semibold">{step.title}</h4>
                        <p className="text-dark-400 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.faqs && service.faqs.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-display font-bold text-white mb-4">FAQs</h3>
                <div className="space-y-3">
                  {service.faqs.map((faq) => (
                    <div key={faq.id} className="p-4 rounded-xl bg-dark-800/50 border border-dark-700/50">
                      <h4 className="text-white font-medium text-sm mb-2">{faq.question}</h4>
                      <p className="text-dark-400 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50 sticky top-28">
              <h3 className="text-lg font-display font-bold text-white mb-4">Get Started</h3>
              <div className="space-y-3">
                <Link to="/quotation" className="block w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold text-center">
                  Get Free Quote
                </Link>
                <Link to="/booking" className="block w-full py-3 bg-dark-700 text-white rounded-xl font-bold text-center hover:bg-dark-600 transition-colors flex items-center justify-center gap-2">
                  <FaCalendarAlt /> Book Consultation
                </Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="block w-full py-3 bg-green-600 text-white rounded-xl font-bold text-center hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href="tel:+919876543210"
                  className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-center hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
                  <FaPhone /> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}