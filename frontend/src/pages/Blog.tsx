import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaUser, FaClock } from 'react-icons/fa';
import { endpoints } from '../api';

import type { BlogPost } from '../types';

export default function BlogPage() {
  const { data } = useQuery({ queryKey: ['blog-posts'], queryFn: () => endpoints.getBlogPosts().then(r => r.data) });
  const posts: BlogPost[] = data?.results || data || [];

  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Blog</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-2">
              Construction <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-dark-400 mt-4 max-w-2xl mx-auto">Expert tips, industry news, and guides for construction in Ranchi & Jharkhand.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/blog/${post.slug}`} className="group block">
                <article className="rounded-2xl bg-dark-800/50 border border-dark-700/50 hover:border-gold-500/30 overflow-hidden transition-all h-full flex flex-col">
                  <div className="aspect-[16/9] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    {post.category_name && <span className="text-gold-500 text-xs font-semibold uppercase tracking-wider">{post.category_name}</span>}
                    <h2 className="text-lg font-semibold text-white mt-2 mb-3 group-hover:text-gold-400 transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-dark-400 text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-dark-500 text-xs">
                      <span className="flex items-center gap-1"><FaUser /> {post.author_name}</span>
                      <span className="flex items-center gap-1"><FaClock /> {post.reading_time} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
        {posts.length === 0 && <div className="text-center py-16 text-dark-500">No blog posts yet.</div>}
      </section>
    </div>
  );
}