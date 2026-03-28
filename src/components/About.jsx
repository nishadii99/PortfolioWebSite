import { useEffect, useRef } from 'react';
import { Code2, Sparkles, Star } from 'lucide-react';

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-2">Get to Know Me</p>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A little bit about who I am</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bio card */}
          <div className="glass rounded-2xl p-8 reveal gradient-border">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <Sparkles size={20} className="text-primary-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Who I Am</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              I'm <span className="text-primary-300 font-semibold">Nishadi Kavindya</span>, a passionate software engineering undergraduate
              from the beautiful coastal city of <span className="text-primary-300 font-semibold">Galle, Sri Lanka</span>.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm mt-4">
              I love transforming ideas into clean, functional, and visually appealing web applications.
              From Java backends to modern React frontends, I enjoy the full spectrum of development.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm mt-4">
              When I'm not coding, I'm exploring new technologies, working on personal projects, and continuously pushing my boundaries as a developer.
            </p>
          </div>

          {/* Quick info */}
          <div className="space-y-4 reveal" style={{ transitionDelay: '0.15s' }}>
            {[
              { icon: '🏠', label: 'Location', value: 'Galle, Sri Lanka' },
              { icon: '🎓', label: 'Education', value: 'Undergraduate at IJSE' },
              { icon: '💼', label: 'Focus', value: 'Full-Stack Web Development' },
              { icon: '🌐', label: 'GitHub', value: '@nishadii99' },
              { icon: '⚡', label: 'Passion', value: 'Building beautiful UIs' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl px-5 py-4 flex items-center gap-4 hover:border-primary-500/30 transition-all duration-300 group cursor-default">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                  <div className="text-sm text-gray-200 font-medium group-hover:text-primary-300 transition-colors">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passion pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 reveal" style={{ transitionDelay: '0.3s' }}>
          {['Web Development', 'UI/UX Design', 'Java', 'React', 'TypeScript', 'Open Source'].map((tag) => (
            <span key={tag} className="glass-strong px-4 py-2 rounded-full text-xs font-semibold text-primary-300 inline-flex items-center gap-1.5">
              <Star size={11} className="fill-primary-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
