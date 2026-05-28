import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { FaCheck, FaPhone, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { endpoints } from '../api';
import { formatCurrency } from '../utils';
import { useThemeStore } from '../stores/themeStore';


export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = useQuery({
    queryKey: ['service', slug],
    queryFn: () => endpoints.getService(slug!).then(r => r.data),
    enabled: !!slug,
  });
  const { theme } = useThemeStore();
  const dk = theme === 'dark';

  if (isLoading) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="text-gold-500">Loading...</div></div>;
  if (!service) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="text-red-400">Service not found</div></div>;

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[420px] overflow-hidden">
        {service.hero_image ? (
          <>
            <img src={service.hero_image} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className={`absolute inset-0 ${dk ? 'bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-dark-900/50' : 'bg-gradient-to-r from-white/95 via-white/80 to-white/50'}`} />
          </>
        ) : (
          <div className={`absolute inset-0 ${dk ? 'bg-gradient-to-b from-dark-900 to-dark-950' : 'bg-gradient-to-b from-dark-50 to-white'}`} />
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className={`text-sm mb-4 ${dk ? 'text-dark-400' : 'text-dark-500'}`}>
              <Link to="/" className="hover:text-gold-500">Home</Link> / <Link to="/services" className="hover:text-gold-500">Services</Link> / <span className={dk ? 'text-white' : 'text-dark-900'}>{service.name}</span>
            </nav>
            <h1 className={`text-4xl sm:text-5xl font-display font-bold ${dk ? 'text-white' : 'text-dark-900'}`}>{service.name}</h1>
            <p className={`mt-4 max-w-2xl text-lg ${dk ? 'text-dark-300' : 'text-dark-600'}`}>{service.short_description}</p>
            {service.price_range_min && (
              <div className="mt-4 text-gold-600 text-lg font-semibold">
                {formatCurrency(service.price_range_min)} — {formatCurrency(service.price_range_max!)} {service.price_unit}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-16 ${dk ? 'bg-dark-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className={`prose max-w-none ${dk ? 'prose-invert' : 'prose-gray'}`} dangerouslySetInnerHTML={{ __html: service.description }} />

            {service.features && service.features.length > 0 && (
              <div className="mt-10">
                <h3 className={`text-xl font-display font-bold mb-4 ${dk ? 'text-white' : 'text-dark-900'}`}>Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f: string) => (
                    <div key={f} className={`flex items-center gap-3 ${dk ? 'text-dark-300' : 'text-dark-600'}`}>
                      <FaCheck className="text-gold-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.process_steps && service.process_steps.length > 0 && (
              <div className="mt-10">
                <h3 className={`text-xl font-display font-bold mb-6 ${dk ? 'text-white' : 'text-dark-900'}`}>Our Process</h3>
                <div className="space-y-4">
                  {service.process_steps.map((step: { title: string; description: string }, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 font-bold flex-shrink-0">{i + 1}</div>
                      <div>
                        <h4 className={`font-semibold ${dk ? 'text-white' : 'text-dark-900'}`}>{step.title}</h4>
                        <p className={`text-sm ${dk ? 'text-dark-400' : 'text-dark-500'}`}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.gallery && service.gallery.length > 0 && (
              <div className="mt-10">
                <h3 className={`text-xl font-display font-bold mb-4 ${dk ? 'text-white' : 'text-dark-900'}`}>Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {service.gallery.map((img: string, idx: number) => (
                    <div key={idx} className="rounded-xl overflow-hidden aspect-video">
                      <img src={img} alt={`${service.name} gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.faqs && service.faqs.length > 0 && (
              <div className="mt-10">
                <h3 className={`text-xl font-display font-bold mb-4 ${dk ? 'text-white' : 'text-dark-900'}`}>FAQs</h3>
                <div className="space-y-3">
                  {service.faqs.map((faq: { id: number; question: string; answer: string }) => (
                    <div key={faq.id} className={`p-4 rounded-xl ${dk ? 'bg-dark-800/50 border border-dark-700/50' : 'bg-dark-50 border border-dark-100'}`}>
                      <h4 className={`font-medium text-sm mb-2 ${dk ? 'text-white' : 'text-dark-900'}`}>{faq.question}</h4>
                      <p className={`text-sm ${dk ? 'text-dark-400' : 'text-dark-500'}`}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {service.hero_image && (
              <div className={`rounded-2xl overflow-hidden ${dk ? 'border border-dark-700/50' : 'border border-dark-200'}`}>
                <img src={service.hero_image} alt={service.name} className="w-full aspect-[4/3] object-cover" />
              </div>
            )}
            <div className={`p-6 rounded-2xl sticky top-28 ${dk ? 'bg-dark-800/50 border border-dark-700/50' : 'bg-dark-50 border border-dark-100'}`}>
              <h3 className={`text-lg font-display font-bold mb-4 ${dk ? 'text-white' : 'text-dark-900'}`}>Get Started</h3>
              <div className="space-y-3">
                <Link to="/quotation" className="block w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold text-center">Get Free Quote</Link>
                <Link to="/booking" className={`block w-full py-3 rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2 ${dk ? 'bg-dark-700 text-white hover:bg-dark-600' : 'bg-white text-dark-900 hover:bg-dark-50 border border-dark-200'}`}>
                  <FaCalendarAlt /> Book Consultation
                </Link>
                <a href="https://wa.me/916203277096" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-green-600 text-white rounded-xl font-bold text-center hover:bg-green-500 transition-colors flex items-center justify-center gap-2"><FaWhatsapp /> WhatsApp</a>
                <a href="tel:+917258021382" className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-center hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"><FaPhone /> Call Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}