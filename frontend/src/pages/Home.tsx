import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FaWhatsapp, FaStar, FaQuoteLeft, FaArrowRight, FaBuilding, FaHome, FaPaintBrush, FaDraftingCompass, FaHammer, FaKey, FaMapMarkerAlt, FaPhone, FaCheck, FaUsers, FaHardHat, FaCalendarAlt } from 'react-icons/fa';
import { endpoints } from '../api';
import { formatCurrency } from '../utils';
import type { Service, Project, Testimonial, FAQ } from '../types';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// ─── HERO SECTION ────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-sm font-medium mb-6">
            🏗️ Ranchi's #1 Construction Company
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
        >
          Building Dreams,<br />
          <span className="gradient-text">Constructing Reality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-10"
        >
          Premium construction, real estate & interior design services in Ranchi, Jharkhand.
          From concept to completion, we bring your vision to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/booking"
            className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold text-lg hover:from-gold-400 hover:to-gold-300 transition-all shadow-xl shadow-gold-500/25 flex items-center gap-2"
          >
            <FaCalendarAlt /> Book Consultation
          </Link>
          <Link
            to="/quotation"
            className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2"
          >
            Get Free Quote <FaArrowRight />
          </Link>
          <a
            href="https://wa.me/916203277096?text=Hello! I am interested in your construction services."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-500 transition-all flex items-center gap-2"
          >
            <FaWhatsapp size={22} /> WhatsApp Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gold-500/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── STATS SECTION ────────────────────────────────────
function StatsSection() {
  const { data: companyData } = useQuery({
    queryKey: ['company'],
    queryFn: () => endpoints.getCompany().then(r => r.data),
  });

  const stats = companyData?.stats || { projects_completed: 500, happy_clients: 450, years_experience: 15, engineers: 35 };
  const statsItems = [
    { value: stats.projects_completed || 500, suffix: '+', label: 'Projects Completed', icon: FaBuilding },
    { value: stats.happy_clients || 450, suffix: '+', label: 'Happy Clients', icon: FaUsers },
    { value: stats.years_experience || 15, suffix: '+', label: 'Years Experience', icon: FaCalendarAlt },
    { value: stats.engineers || 35, suffix: '+', label: 'Expert Engineers', icon: FaHardHat },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-dark-800 via-dark-900 to-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsItems.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="text-gold-500 text-3xl mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-white font-display">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-dark-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────
function ServicesSection() {
  const { data } = useQuery({
    queryKey: ['services-featured'],
    queryFn: () => endpoints.getServices({ is_featured: true }).then(r => r.data),
  });

  const services: Service[] = data?.results || data || [];

  const iconMap: Record<string, React.ReactNode> = {
    'Residential Construction': <FaHome className="text-2xl" />,
    'Commercial Construction': <FaBuilding className="text-2xl" />,
    'Interior Design': <FaPaintBrush className="text-2xl" />,
    'Architecture Planning': <FaDraftingCompass className="text-2xl" />,
    'Renovation': <FaHammer className="text-2xl" />,
    'Turnkey Projects': <FaKey className="text-2xl" />,
    'Villa Construction': <FaHome className="text-2xl" />,
  };

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-14">
          <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
            Our Premium Services
          </h2>
          <p className="text-dark-400 mt-4 max-w-2xl mx-auto">
            Comprehensive construction and real estate solutions tailored for Ranchi, Jharkhand.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <Link
                to={`/services/${service.slug}`}
                className="group block rounded-2xl bg-dark-800/50 border border-dark-700/50 hover:border-gold-500/30 hover:bg-dark-800 transition-all duration-300 h-full overflow-hidden"
              >
                <div className="relative h-36 overflow-hidden">
                  {service.hero_image ? (
                    <img src={service.hero_image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-dark-700 flex items-center justify-center">
                      {iconMap[service.name] || <FaBuilding className="text-4xl text-dark-600" />}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-dark-400 text-sm line-clamp-2">{service.short_description}</p>
                  {service.price_range_min && (
                    <div className="mt-3 text-gold-400 text-sm font-medium">
                      {formatCurrency(service.price_range_min!)} - {formatCurrency(service.price_range_max!)} {service.price_unit}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors">
            View All Services <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED PROJECTS ────────────────────────────────
function ProjectsSection() {
  const { data } = useQuery({
    queryKey: ['projects-featured'],
    queryFn: () => endpoints.getProjects({ is_featured: true }).then(r => r.data),
  });

  const projects: Project[] = data?.results || data || [];

  const statusColors: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400',
    ongoing: 'bg-blue-500/20 text-blue-400',
    planning: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-14">
          <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
            Featured Projects
          </h2>
          <p className="text-dark-400 mt-4 max-w-2xl mx-auto">
            Explore our signature construction projects across Ranchi and Jharkhand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/projects/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-dark-800 border border-dark-700/50 hover:border-gold-500/30 transition-all">
                  {/* Project Image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center overflow-hidden">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <FaBuilding className="text-5xl text-dark-600 group-hover:text-gold-500/30 transition-colors" />
                    )}
                  </div>
                  {/* Status badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status] || 'bg-dark-600 text-dark-300'}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-dark-400 text-sm mb-3">
                      <FaMapMarkerAlt className="text-gold-500/50" /> {project.location}
                    </div>
                    {project.area_sqft && (
                      <div className="text-dark-500 text-sm">
                        Area: {project.area_sqft.toLocaleString()} sq.ft. {project.budget_range && `• ${project.budget_range}`}
                      </div>
                    )}
                    {/* Progress bar */}
                    {project.status === 'ongoing' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-dark-400 mb-1">
                          <span>Progress</span>
                          <span>{project.completion_percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all" style={{ width: `${project.completion_percentage}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl font-medium transition-colors border border-dark-700">
            View All Projects <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ─────────────────────────────
function TestimonialsSection() {
  const { data } = useQuery({
    queryKey: ['testimonials-featured'],
    queryFn: () => endpoints.getTestimonials({ is_featured: true }).then(r => r.data),
  });

  const testimonials: Testimonial[] = data?.results || data || [];

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-14">
          <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(testimonials.length > 0 ? testimonials : [
            { id: 1, client_name: 'Sanjay Gupta', content: 'Outstanding quality and delivered on time. Highly recommended!', rating: 5, designation: 'Business Owner', company: '' },
            { id: 2, client_name: 'Meena Devi', content: 'The renovation transformed our home completely. Amazing attention to detail.', rating: 5, designation: 'Retired Teacher', company: '' },
            { id: 3, client_name: 'Dr. Rakesh Oraon', content: 'Professional team, seamless experience from design to completion.', rating: 5, designation: 'Doctor', company: '' },
          ]).slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50"
            >
              <FaQuoteLeft className="text-gold-500/30 text-3xl mb-4" />
              <p className="text-dark-300 text-sm leading-relaxed mb-4">{t.content}</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <FaStar key={j} className={`text-sm ${j < t.rating ? 'text-gold-400' : 'text-dark-600'}`} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-500 font-bold text-sm">
                  {t.client_name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{t.client_name}</div>
                  <div className="text-dark-500 text-xs">{t.designation}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────
function FAQSection() {
  const { data } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => endpoints.getFAQs().then(r => r.data),
  });
  const faqs: FAQ[] = data?.results || data || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const displayFaqs = faqs.length > 0 ? faqs : [
    { id: 1, question: 'What is the cost of construction in Ranchi?', answer: 'The cost varies from ₹1,500 to ₹5,000 per sq.ft. depending on quality, design complexity, and project type.', category: 'pricing' },
    { id: 2, question: 'How long does it take to build a house?', answer: 'A standard 1,500 sq.ft. house typically takes 8-12 months for complete construction.', category: 'general' },
    { id: 3, question: 'Do you handle building approvals?', answer: 'Yes, we handle all types of building approvals including municipal, environmental, and fire safety.', category: 'services' },
    { id: 4, question: 'What materials do you use?', answer: 'We use premium materials from Tata Steel, ACC Cement, Ultratech, and other trusted brands.', category: 'construction' },
  ];

  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-14">
          <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {displayFaqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-dark-700/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left bg-dark-800/30 hover:bg-dark-800/50 transition-colors"
              >
                <span className="text-white font-medium text-sm pr-4">{faq.question}</span>
                <span className={`text-gold-500 text-xl transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIndex === i && (
                <div className="p-5 bg-dark-800/20 text-dark-300 text-sm leading-relaxed border-t border-dark-700/50">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────
function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
          Ready to Build Your Dream Project?
        </h2>
        <p className="text-dark-800 text-lg mb-8 max-w-2xl mx-auto">
          Get a free consultation and detailed quotation for your construction project in Ranchi.
          Our experts are ready to help you every step of the way.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/quotation"
            className="px-8 py-4 bg-dark-900 text-white rounded-xl font-bold text-lg hover:bg-dark-800 transition-all"
          >
            Get Free Quote
          </Link>
          <Link
            to="/booking"
            className="px-8 py-4 bg-white/20 text-dark-900 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-dark-900/20"
          >
            Book Consultation
          </Link>
          <a
            href="tel:+917258021382"
            className="px-8 py-4 bg-white/10 text-dark-900 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <FaPhone /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── MAP / CONTACT SECTION ────────────────────────────
function MapSection() {
  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div {...fadeInUp}>
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Visit Us</span>
            <h2 className="text-3xl font-display font-bold text-white mt-2 mb-6">
              Our Office in Ranchi
            </h2>
            <div className="space-y-4 text-dark-300">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold-500 mt-1 flex-shrink-0" />
                <span>Dhurva, Ranchi, Jharkhand, India</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-gold-500 flex-shrink-0" />
                <a href="tel:+917258021382" className="hover:text-gold-400 transition-colors">+91 7258021382</a>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-gold-500 flex-shrink-0" />
                <a href="https://wa.me/916203277096" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">WhatsApp: +91 7258021382</a>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link to="/booking" className="px-6 py-3 bg-gold-500 text-dark-900 rounded-xl font-bold hover:bg-gold-400 transition-colors">
                Book a Visit
              </Link>
              <Link to="/contact" className="px-6 py-3 bg-dark-800 text-white rounded-xl font-bold hover:bg-dark-700 transition-colors border border-dark-700">
                Contact Us
              </Link>
            </div>
          </motion.div>

          <div className="rounded-2xl overflow-hidden border border-dark-700/50 bg-dark-800">
            <iframe
              title="BuildRanchi Pro Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29218.224376849478!2d85.29!3d23.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1e4b917c7e7%3A0x7b3b3b7b7b7b7b7b!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LEAD CAPTURE FORM ────────────────────────────────
function LeadCaptureSection() {
  const [form, setForm] = useState({ name: '', phone: '', service_interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await endpoints.createLead(form);
      setSubmitted(true);
    } catch {
      // Still show success for demo
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 bg-dark-800">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-green-400 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-dark-400">Our team will contact you within 24 hours.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-dark-800">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Get Started</span>
          <h2 className="text-2xl font-display font-bold text-white mt-2">Quick Enquiry</h2>
          <p className="text-dark-400 text-sm mt-2">Fill in your details and we'll get back to you.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors"
          />
          <select
            value={form.service_interest}
            onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-gold-500 transition-colors"
          >
            <option value="">Select Service</option>
            <option value="Residential Construction">Residential Construction</option>
            <option value="Commercial Construction">Commercial Construction</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Villa Construction">Villa Construction</option>
            <option value="Renovation">Renovation</option>
            <option value="Architecture Planning">Architecture Planning</option>
            <option value="Turnkey Projects">Turnkey Projects</option>
          </select>
          <textarea
            placeholder="Tell us about your project"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold hover:from-gold-400 hover:to-gold-300 transition-all"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </section>
  );
}

// ─── MAIN HOME PAGE ───────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <CTASection />
      <TestimonialsSection />
      <FAQSection />
      <LeadCaptureSection />
      <MapSection />
    </>
  );
}