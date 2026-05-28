import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { endpoints } from '../api';
import { useThemeStore } from '../stores/themeStore';
import type { Project } from '../types';

const statusColors: Record<string, string> = {
  completed: 'bg-green-500/20 text-green-600',
  ongoing: 'bg-blue-500/20 text-blue-600',
  planning: 'bg-yellow-500/20 text-yellow-600',
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const { data } = useQuery({
    queryKey: ['projects', filter, search],
    queryFn: () => endpoints.getProjects({ status: filter || undefined, search: search || undefined }).then(r => r.data),
  });
  const projects: Project[] = data?.results || data || [];
  const { theme } = useThemeStore();
  const dk = theme === 'dark';

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className={`py-20 ${dk ? 'bg-gradient-to-b from-dark-900 to-dark-950' : 'bg-gradient-to-b from-dark-50 to-white'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Portfolio</span>
            <h1 className={`text-4xl sm:text-5xl font-display font-bold mt-2 ${dk ? 'text-white' : 'text-dark-900'}`}>
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className={`mt-4 max-w-2xl mx-auto ${dk ? 'text-dark-400' : 'text-dark-500'}`}>
              Explore our signature construction projects across Ranchi and Jharkhand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className={`py-12 border-b ${dk ? 'bg-dark-900 border-dark-800' : 'bg-white border-dark-100'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {['', 'completed', 'ongoing', 'planning'].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === s ? 'bg-gold-500 text-dark-900' : dk ? 'bg-dark-800 text-dark-300 hover:bg-dark-700' : 'bg-dark-50 text-dark-600 hover:bg-dark-100'}`}>
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Projects'}
              </button>
            ))}
          </div>
          <div className="relative">
            <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${dk ? 'text-dark-500' : 'text-dark-400'}`} />
            <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-gold-500 w-64 ${dk ? 'bg-dark-800 border border-dark-700 text-white' : 'bg-dark-50 border border-dark-200 text-dark-900'}`} />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className={`py-16 ${dk ? 'bg-dark-950' : 'bg-dark-50'}`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/projects/${project.slug}`} className="group block">
                <div className={`rounded-2xl overflow-hidden transition-all ${dk ? 'bg-dark-800 border border-dark-700/50 hover:border-gold-500/30' : 'bg-white border border-dark-100 hover:border-gold-500/30 shadow-sm hover:shadow-lg'}`}>
                  <div className={`aspect-[4/3] flex items-center justify-center overflow-hidden ${dk ? 'bg-gradient-to-br from-dark-700 to-dark-800' : 'bg-dark-100'}`}>
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <FaBuilding className={`text-5xl ${dk ? 'text-dark-600' : 'text-dark-300'} group-hover:text-gold-500/30 transition-colors`} />
                    )}
                  </div>
                  <span className={`inline-block m-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status] || (dk ? 'bg-dark-600 text-dark-300' : 'bg-dark-100 text-dark-500')}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <div className="px-4 pb-5">
                    <h3 className={`text-lg font-semibold group-hover:text-gold-500 transition-colors mb-2 ${dk ? 'text-white' : 'text-dark-900'}`}>{project.title}</h3>
                    <div className={`flex items-center gap-2 text-sm mb-2 ${dk ? 'text-dark-400' : 'text-dark-500'}`}>
                      <FaMapMarkerAlt className="text-gold-500/50" /> {project.location}
                    </div>
                    {project.area_sqft && <div className={`text-sm ${dk ? 'text-dark-500' : 'text-dark-400'}`}>{project.area_sqft.toLocaleString()} sq.ft.</div>}
                    {project.status === 'ongoing' && (
                      <div className="mt-3">
                        <div className={`flex justify-between text-xs mb-1 ${dk ? 'text-dark-400' : 'text-dark-500'}`}><span>Progress</span><span>{project.completion_percentage}%</span></div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${dk ? 'bg-dark-700' : 'bg-dark-200'}`}>
                          <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full" style={{ width: `${project.completion_percentage}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {projects.length === 0 && (
          <div className={`text-center py-16 ${dk ? 'text-dark-500' : 'text-dark-400'}`}>No projects found.</div>
        )}
      </section>
    </div>
  );
}