import { useEffect, useState } from 'react';
import { MapPin, Github, ChevronDown, Download } from 'lucide-react';
import { profile } from '../data/projects';

const roles = profile.roles;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-5xl mx-auto text-center z-10 pt-20">

        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative animate-float">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-1 animate-pulse-ring"
              style={{ background: 'linear-gradient(135deg, #c084fc, #7c3aed)' }}>
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover border-4 border-dark-900"
              />
            </div>
            {/* Online dot */}
            <span className="absolute bottom-3 right-3 w-4 h-4 bg-emerald-400 rounded-full border-2 border-dark-900 shadow-lg shadow-emerald-400/50" />
          </div>
        </div>

        {/* Name */}
        <div className="mb-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-gray-400 mb-5">
            <MapPin size={14} className="text-primary-400" />
            {profile.location}
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-2">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </h1>
        </div>

        {/* Typewriter */}
        <div className="h-10 mb-8 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-primary-300 font-medium font-mono">
            {displayed}<span className="animate-pulse text-primary-400">|</span>
          </p>
        </div>

        {/* Bio snippet */}
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Passionate software engineering undergraduate from Galle, Sri Lanka — crafting elegant digital experiences with modern web technologies.
        </p>

        {/* Stats row
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-10">
          {[
            { label: 'Public Repos', value: profile.repos },
            { label: 'Followers', value: profile.followers },
            { label: 'Following', value: profile.following },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-2xl md:text-3xl gradient-text">{s.value}</div>
              <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div> */}

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="https://github.com/nishadii99"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-white inline-flex items-center gap-2"
          >
            <Github size={18} /> View GitHub
          </a>
          <a
            href="/Nishadi Kavindya CV.pdf"
            download="Nishadi_Kavindya_CV.pdf"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Download size={18} /> Download CV
          </a>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            See My Work
          </button>
        </div>

        {/* Scroll hint */}
        <div className="animate-bounce flex justify-center">
          <ChevronDown className="text-gray-600" size={28} />
        </div>
      </div>
    </section>
  );
}
