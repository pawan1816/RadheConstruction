import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaRulerCombined, FaArrowLeft } from 'react-icons/fa';
import { endpoints } from '../api';
import type { Project } from '../types';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => endpoints.getProject(slug!).then(r => r.data),
    enabled: !!slug,
  });

  if (isLoading) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="text-gold-500">Loading...</div></div>;
  if (!project) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="text-red-400">Project not found</div></div>;

  const statusColors: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    ongoing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    planning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/projects" className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-400 text-sm mb-6 transition-colors">
              <FaArrowLeft /> Back to Projects
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status] || ''}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              {project.category_name && <span className="text-dark-400 text-sm">{project.category_name}</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">{project.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: FaMapMarkerAlt, label: 'Location', value: project.location },
            { icon: FaRulerCombined, label: 'Area', value: project.area_sqft ? `${project.area_sqft.toLocaleString()} sq.ft.` : 'N/A' },
            { icon: FaCalendarAlt, label: 'Status', value: project.status },
            { icon: FaRulerCombined, label: 'Budget', value: project.budget_range || 'N/A' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="text-gold-500" />
              <div>
                <div className="text-dark-500 text-xs">{item.label}</div>
                <div className="text-white text-sm font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="prose prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: project.description }} />

          {project.status === 'ongoing' && (
            <div className="mt-8 p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50">
              <h3 className="text-xl font-display font-bold text-white mb-4">Construction Progress</h3>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-4 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all" style={{ width: `${project.completion_percentage}%` }} />
                </div>
                <span className="text-gold-400 font-bold text-lg">{project.completion_percentage}%</span>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <Link to="/quotation" className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold">
              Get Similar Quote
            </Link>
            <Link to="/booking" className="px-6 py-3 bg-dark-800 text-white rounded-xl font-bold border border-dark-700 hover:bg-dark-700 transition-colors">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}