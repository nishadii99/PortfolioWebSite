import { useEffect, useRef } from 'react';
import { GraduationCap, School, BookOpen } from 'lucide-react';

const education = [
  {
    icon: GraduationCap,
    level: 'Undergraduate',
    institution: 'Institute of Java & Software Engineering (IJSE)',
    degree: 'Software Engineering',
    status: 'Current',
    color: 'from-purple-500 to-violet-600',
    glow: 'shadow-purple-500/30',
  },
  {
    icon: School,
    level: 'Advanced Level',
    institution: 'Sangamitta Balika Vidyalaya',
    degree: 'Secondary Education',
    status: 'Completed',
    color: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/30',
  },
  {
    icon: BookOpen,
    level: 'Ordinary Level',
    institution: "Rippon Girls' College",
    degree: 'Primary & Lower Secondary',
    status: 'Completed',
    color: 'from-sky-400 to-blue-500',
    glow: 'shadow-sky-500/30',
  },
];

export default function Education() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }, []);

  return (
    <section id="education" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-2">Academic Journey</p>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Where I learned and grew</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/60 via-primary-500/20 to-transparent" />

          <div className="space-y-10">
            {education.map((edu, i) => {
              const isRight = i % 2 === 0;
              const Icon = edu.icon;
              return (
                <div
                  key={edu.institution}
                  className={`relative flex items-center reveal ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  {/* Icon dot on timeline */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${edu.color} flex items-center justify-center shadow-lg ${edu.glow}`}>
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-20 md:ml-0 ${isRight ? 'md:mr-auto md:pr-16 md:pl-0' : 'md:ml-auto md:pl-16 md:pr-0'} w-full md:w-5/12`}>
                    <div className="glass rounded-2xl p-6 gradient-border hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${edu.color} text-white`}>
                          {edu.status}
                        </span>
                        <span className="text-xs text-gray-500">{edu.level}</span>
                      </div>
                      <h3 className="font-display font-bold text-white text-base mt-2 group-hover:text-primary-300 transition-colors">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{edu.degree}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
