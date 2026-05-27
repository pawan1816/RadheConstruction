import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaRulerCombined, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { endpoints } from '../api';

interface ProjectData {
  id: number;
  title: string;
  slug: string;
  category: { id: number; name: string } | null;
  category_name?: string;
  location: string;
  city: string;
  area_sqft: number | null;
  budget_range: string;
  status: string;
  description: string;
  features: string[];
  completion_percentage: number;
  is_featured: boolean;
  images: { id: number; image: string; caption: string; image_type: string; sort_order: number }[];
  progress_updates: { id: number; title: string; description: string; date: string; image: string; percentage: number }[];
  meta_title: string;
  meta_description: string;
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { data: project, isLoading } = useQuery<ProjectData>({
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

  const images = project.images || [];
  const galleryImages = images.filter((img) => ['gallery', 'after', 'drone'].includes(img.image_type));
  const beforeImages = images.filter((img) => img.image_type === 'before');

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx((i) => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null);
  const nextImage = () => setLightboxIdx((i) => i !== null ? (i + 1) % galleryImages.length : null);

  return (
    <div className="pt-24">
      {/* Hero */}
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
              {project.category?.name && <span className="text-dark-400 text-sm">{project.category.name}</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">{project.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Key Details */}
      <section className="py-12 bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: FaMapMarkerAlt, label: 'Location', value: project.location },
            { icon: FaRulerCombined, label: 'Area', value: project.area_sqft ? `${Number(project.area_sqft).toLocaleString()} sq.ft.` : 'N/A' },
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

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-12 bg-dark-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-display font-bold text-white mb-6">Project Gallery</h2>

            {/* Main image */}
            <div className="rounded-2xl overflow-hidden border border-dark-700 mb-4 cursor-pointer" onClick={() => openLightbox(0)}>
              <img src={galleryImages[0].image} alt={galleryImages[0].caption || project.title}
                className="w-full aspect-[16/9] object-cover hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {galleryImages.map((img, idx) => (
                  <button key={img.id} onClick={() => openLightbox(idx)}
                    className="aspect-square rounded-xl overflow-hidden border border-dark-700 hover:border-gold-500/50 transition-colors">
                    <img src={img.image} alt={img.caption || ''} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Description */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="prose prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: project.description }} />

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-display font-bold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-dark-300">
                    <span className="w-2 h-2 bg-gold-500 rounded-full flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress bar for ongoing */}
          {project.status === 'ongoing' && (
            <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50 mb-12">
              <h3 className="text-xl font-display font-bold text-white mb-4">Construction Progress</h3>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-4 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all" style={{ width: `${project.completion_percentage}%` }} />
                </div>
                <span className="text-gold-400 font-bold text-lg">{project.completion_percentage}%</span>
              </div>
            </div>
          )}

          {/* Progress Updates */}
          {project.progress_updates && project.progress_updates.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-display font-bold text-white mb-6">Progress Timeline</h3>
              <div className="space-y-6">
                {project.progress_updates.map((update) => (
                  <div key={update.id} className="flex gap-4 items-start p-4 rounded-xl bg-dark-800 border border-dark-700">
                    {update.image && (
                      <img src={update.image} alt={update.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-white font-medium">{update.title}</p>
                      <p className="text-dark-400 text-sm mt-1">{update.description}</p>
                      {update.percentage && <p className="text-gold-400 text-xs mt-2">{update.percentage}% Complete</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Before images */}
          {beforeImages.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-display font-bold text-white mb-4">Before</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {beforeImages.map((img) => (
                  <div key={img.id} className="rounded-xl overflow-hidden border border-dark-700">
                    <img src={img.image} alt={img.caption || 'Before'} className="w-full aspect-video object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/quotation" className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 rounded-xl font-bold text-center">
              Get Similar Quote
            </Link>
            <Link to="/booking" className="px-6 py-3 bg-dark-800 text-white rounded-xl font-bold border border-dark-700 hover:bg-dark-700 transition-colors text-center">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && galleryImages[lightboxIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2">
              <FaTimes className="text-2xl" />
            </button>
            {galleryImages.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white/70 hover:text-white z-10 p-2">
                  <FaChevronLeft className="text-2xl" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white/70 hover:text-white z-10 p-2">
                  <FaChevronRight className="text-2xl" />
                </button>
              </>
            )}
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={galleryImages[lightboxIdx].image}
              alt={galleryImages[lightboxIdx].caption || project.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightboxIdx + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}