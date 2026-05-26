import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { endpoints } from '../api';
import type { Project } from '../types';

const statusColors: Record<string, string> = {
  completed: 'bg-green-500/20 text-green-400',
  ongoing: 'bg-blue-500/20 text-blue-400',
  planning: 'bg-yellow-500/20 text-yellow-400',
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const { data } = useQuery({
    queryKey: ['projects', filter, search],
    queryFn: () => endpoints.getProjects({ status: filter || undefined, search: search || undefined }).then(r => r.data),
  });
  const projects: Project[] = data?.results || data || [];

  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Portfolio</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-2">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-dark-400 mt-4 max-w-2xl mx-auto">
              Explore our signature construction projects across Ranchi and Jharkhand.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {['', 'completed', 'ongoing', 'planning'].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === s ? 'bg-gold-500 text-dark-900' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'}`}>
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Projects'}
              </button>
            ))}
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
            <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500 w-64" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/projects/${project.slug}`} className="group block">
                <div className="rounded-2xl bg-dark-800 border border-dark-700/50 hover:border-gold-500/30 overflow-hidden transition-all">
                  <div className="aspect-[4/3] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
                    <FaBuilding className="text-5xl text-dark-600 group-hover:text-gold-500/30 transition-colors" />
                  </div>
                  <span className={`inline-block m-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status] || 'bg-dark-600 text-dark-300'}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <div className="px-4 pb-5">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-dark-400 text-sm mb-2">
                      <FaMapMarkerAlt className="text-gold-500/50" /> {project.location}
                    </div>
                    {project.area_sqft && <div className="text-dark-500 text-sm">{project.area_sqft.toLocaleString()} sq.ft.</div>}
                    {project.status === 'ongoing' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-dark-400 mb-1"><span>Progress</span><span>{project.completion_percentage}%</span></div>
                        <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
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
          <div className="text-center py-16 text-dark-500">No projects found.</div>
        )}
      </section>
    </div>
  );
}