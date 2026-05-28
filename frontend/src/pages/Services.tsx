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
      {/* Hero */}
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

      {/* Services Grid */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/services/${service.slug}`} className="group block h-full">
                <div className="rounded-2xl bg-dark-800/50 border border-dark-700/50 hover:border-gold-500/30 transition-all h-full flex flex-col overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {service.hero_image ? (
                      <img
                        src={service.hero_image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-dark-700 flex items-center justify-center">
                        {iconMap[service.name] || <FaBuilding className="text-5xl text-dark-600" />}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}