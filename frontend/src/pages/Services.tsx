import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaBuilding, FaHome, FaPaintBrush, FaDraftingCompass, FaHammer, FaKey, FaArrowRight } from 'react-icons/fa';
import { endpoints } from '../api';
import { formatCurrency } from '../utils';
import type { Service } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  'Residential Construction': <FaHome className="text-3xl" />,
  'Commercial Construction': <FaBuilding className="text-3xl" />,
  'Interior Design': <FaPaintBrush className="text-3xl" />,
  'Architecture Planning': <FaDraftingCompass className="text-3xl" />,
  'Renovation': <FaHammer className="text-3xl" />,
  'Turnkey Projects': <FaKey className="text-3xl" />,
  'Villa Construction': <FaHome className="text-3xl" />,
  'Building Planning': <FaDraftingCompass className="text-3xl" />,
};

export default function ServicesPage() {
  const { data } = useQuery({ queryKey: ['services'], queryFn: () => endpoints.getServices().then(r => r.data) });
  const services: Service[] = data?.results || data || [];

  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Services</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-2">
              Premium Construction <span className="gradient-text">Services</span>
            </h1>
            <p className="text-dark-400 mt-4 max-w-2xl mx-auto">
              Comprehensive construction, design, and real estate solutions in Ranchi, Jharkhand.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/services/${service.slug}`} className="group block h-full">
                <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-700/50 hover:border-gold-500/30 transition-all h-full flex flex-col">
                  <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-5 group-hover:bg-gold-500/20 transition-colors">
                    {iconMap[service.name] || <FaBuilding className="text-3xl" />}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-4 flex-1">{service.short_description}</p>
                  {service.price_range_min && (
                    <div className="text-gold-400 text-sm font-semibold mb-4">
                      {formatCurrency(service.price_range_min)} — {formatCurrency(service.price_range_max!)} {service.price_unit}
                    </div>
                  )}
                  <span className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium">
                    Learn More <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}