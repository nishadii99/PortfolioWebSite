import { useEffect, useRef } from 'react';
import { skills } from '../data/projects';

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate bar widths
            entry.target.querySelectorAll('[data-width]').forEach((bar) => {
              const width = bar.getAttribute('data-width');
              bar.style.width = width + '%';
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }, []);

  const langs = [
    { name: 'JavaScript', icon: '🟨' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Java', icon: '☕' },
    { name: 'HTML5', icon: '🧡' },
    { name: 'CSS3', icon: '💙' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'SCSS', icon: '🎨' },
    { name: 'Git', icon: '🔧' },
    { name: 'MySQL', icon: '🗄️' },
    { name: 'JSP', icon: '♨️' },
    { name: 'REST API', icon: '🔌' },
  ];

  return (
    <section id="skills" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-2">Tech Stack</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">Languages and tools I work with</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Skill bars */}
          <div className="glass rounded-2xl p-8 reveal gradient-border">
            <h3 className="font-display font-bold text-lg text-white mb-6">Proficiency</h3>
            <div className="space-y-5">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-gray-300 font-medium">{s.name}</span>
                    <span className="text-xs text-primary-400 font-semibold">{s.level}%</span>
                  </div>
                  <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      data-width={s.level}
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: '0%',
                        background: `linear-gradient(90deg, ${s.color}99, ${s.color})`,
                        boxShadow: `0 0 8px ${s.color}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech pills */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="glass rounded-2xl p-8 h-full gradient-border">
              <h3 className="font-display font-bold text-lg text-white mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {langs.map((t) => (
                  <span
                    key={t.name}
                    className="glass-strong px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 flex items-center gap-2 hover:text-primary-300 hover:border-primary-500/40 transition-all duration-300 cursor-default group"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{t.icon}</span>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
