import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaShieldAlt, FaTrophy, FaUsers, FaHandshake } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { endpoints } from '../api';
import { useThemeStore } from '../stores/themeStore';
import type { TeamMember } from '../types';

export default function AboutPage() {
  const { data } = useQuery({ queryKey: ['team'], queryFn: () => endpoints.getTeam().then(r => r.data) });
  const team: TeamMember[] = data?.results || data || [];
  const { theme } = useThemeStore();
  const dk = theme === 'dark';

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className={`py-20 ${dk ? 'bg-gradient-to-b from-dark-900 to-dark-950' : 'bg-gradient-to-b from-dark-50 to-white'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">About Us</span>
            <h1 className={`text-4xl sm:text-5xl font-display font-bold mt-2 ${dk ? 'text-white' : 'text-dark-900'}`}>
              Building <span className="gradient-text">Since 2009</span>
            </h1>
            <p className={`mt-4 max-w-2xl mx-auto ${dk ? 'text-dark-400' : 'text-dark-500'}`}>
              BuildRanchi Pro is Ranchi's premier construction company, delivering exceptional quality and innovative solutions for over 15 years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className={`py-16 ${dk ? 'bg-dark-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: FaBullseye, title: 'Our Mission', desc: 'To deliver world-class construction services that exceed client expectations while maintaining the highest standards of quality, safety, and sustainability.' },
            { icon: FaEye, title: 'Our Vision', desc: 'To be the most trusted and innovative construction company in Jharkhand, known for transforming the built environment and enriching communities.' },
            { icon: FaShieldAlt, title: 'Our Values', desc: 'Integrity, excellence, innovation, safety, and client satisfaction form the foundation of everything we do at BuildRanchi Pro.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl text-center ${dk ? 'bg-dark-800/50 border border-dark-700/50' : 'bg-dark-50 border border-dark-100'}`}>
              <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-gold-500 text-2xl" />
              </div>
              <h3 className={`text-xl font-display font-bold mb-3 ${dk ? 'text-white' : 'text-dark-900'}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed ${dk ? 'text-dark-400' : 'text-dark-500'}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className={`py-16 ${dk ? 'bg-dark-950' : 'bg-dark-50'}`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: FaTrophy, value: '15+', label: 'Industry Awards' },
            { icon: FaUsers, value: '450+', label: 'Happy Clients' },
            { icon: FaHandshake, value: '100+', label: 'Partner Vendors' },
            { icon: FaShieldAlt, value: '0', label: 'Safety Incidents' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <s.icon className="text-gold-500 text-3xl mx-auto mb-2" />
              <div className={`text-3xl font-bold font-display ${dk ? 'text-white' : 'text-dark-900'}`}>{s.value}</div>
              <div className={`text-sm ${dk ? 'text-dark-400' : 'text-dark-500'}`}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className={`py-16 ${dk ? 'bg-dark-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Team</span>
              <h2 className={`text-3xl font-display font-bold mt-2 ${dk ? 'text-white' : 'text-dark-900'}`}>Meet the Experts</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {team.map((member, i) => (
                <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`text-center p-6 rounded-2xl ${dk ? 'bg-dark-800/50 border border-dark-700/50 hover:border-gold-500/30' : 'bg-dark-50 border border-dark-100 hover:border-gold-500/30'} transition-colors`}>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gold-500/30">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gold-500/20 flex items-center justify-center text-gold-500 font-bold text-2xl">{member.name.charAt(0)}</div>
                    )}
                  </div>
                  <h4 className={`font-semibold ${dk ? 'text-white' : 'text-dark-900'}`}>{member.name}</h4>
                  <p className="text-gold-500 text-sm">{member.designation}</p>
                  <p className={`text-xs mt-2 ${dk ? 'text-dark-500' : 'text-dark-400'}`}>{member.experience}+ years experience</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className={`py-16 ${dk ? 'bg-dark-950' : 'bg-dark-50'}`}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Journey</span>
            <h2 className={`text-3xl font-display font-bold mt-2 ${dk ? 'text-white' : 'text-dark-900'}`}>Company Timeline</h2>
          </div>
          <div className="space-y-6">
            {[
              { year: '2009', event: 'Founded BuildRanchi Pro in Ranchi, Jharkhand' },
              { year: '2012', event: 'Completed 50th residential project' },
              { year: '2015', event: 'Expanded into commercial construction' },
              { year: '2018', event: 'Launched interior design division' },
              { year: '2020', event: 'Completed 300+ projects across Jharkhand' },
              { year: '2023', event: 'Started turnkey and villa construction services' },
              { year: '2025', event: '500+ projects completed, 35+ engineers on team' },
            ].map((item) => (
              <div key={item.year} className="flex gap-4 items-start">
                <div className="w-16 text-gold-500 font-bold font-display flex-shrink-0">{item.year}</div>
                <div className={`flex-1 pb-6 border-l-2 pl-4 ${dk ? 'border-dark-700' : 'border-dark-200'}`}>
                  <p className={`text-sm ${dk ? 'text-dark-300' : 'text-dark-600'}`}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}