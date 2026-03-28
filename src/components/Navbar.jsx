import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['About', 'Skills', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span className="font-display font-bold text-xl gradient-text cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          NK<span className="text-white">.</span>
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="text-gray-300 hover:text-primary-300 text-sm font-medium transition-colors duration-200 relative group"
              >
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full rounded" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://github.com/nishadii99"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block btn-primary text-white"
        >
          GitHub
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-300 hover:text-white transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 space-y-3">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="block w-full text-left text-gray-300 hover:text-primary-300 py-2 text-sm font-medium transition-colors"
            >
              {l}
            </button>
          ))}
          <a href="https://github.com/nishadii99" target="_blank" rel="noopener noreferrer" className="block btn-primary text-white text-center mt-3">
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
