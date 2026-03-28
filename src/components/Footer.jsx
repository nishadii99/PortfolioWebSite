import { Github, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <span>© {year}</span>
          <span className="gradient-text font-semibold">Nishadi Kavindya</span>
        </div>
        <div className="flex items-center gap-1.5">
          Built with <Heart size={13} className="text-primary-400 fill-primary-400 mx-1" /> using React & TailwindCSS
        </div>
        <a
          href="https://github.com/nishadii99"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-primary-300 transition-colors"
        >
          <Github size={15} /> nishadii99
        </a>
      </div>
    </footer>
  );
}
