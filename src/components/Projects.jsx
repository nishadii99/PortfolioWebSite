import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projects } from '../data/projects';

const LANG_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#264de4',
};

export default function Projects() {
  const ref = useRef(null);
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Featured', 'JavaScript', 'TypeScript', 'Java', 'HTML'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    // Re-observe every time filter changes (new cards in the DOM)
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  const filtered = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Featured') return p.featured;
    return p.language === filter;
  });

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-2">What I've Built</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">A selection of my GitHub projects</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 reveal" style={{ transitionDelay: '0.1s' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                filter === f
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'glass text-gray-400 hover:text-primary-300 hover:border-primary-500/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={`${filter}-${project.repo}`}
              className="glass rounded-2xl p-6 gradient-border flex flex-col group hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500"
              style={{
                animation: `cardFadeIn 0.4s ease-out ${i * 0.07}s both`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Github size={16} className="text-gray-500 group-hover:text-primary-400 transition-colors" />
                    {project.featured && (
                      <span className="text-xs text-amber-400 flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-400" /> Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-white text-base leading-tight group-hover:text-primary-300 transition-colors">
                    {project.name}
                  </h3>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 p-2 rounded-lg glass-strong text-gray-400 hover:text-primary-300 transition-all duration-200 hover:scale-110"
                  title="View on GitHub"
                >
                  <ExternalLink size={15} />
                </a>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg glass text-xs text-gray-400 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Language badge */}
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.langColor, boxShadow: `0 0 6px ${project.langColor}80` }}
                />
                <span className="text-xs text-gray-400 font-medium">{project.language}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12 reveal">
          <a
            href="https://github.com/nishadii99?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Github size={16} /> View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
}
