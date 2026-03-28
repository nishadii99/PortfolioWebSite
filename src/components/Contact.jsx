import { useEffect, useRef } from 'react';
import { Github, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }, []);

  return (
    <section id="contact" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-2">Get In Touch</p>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Let's build something together</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: info */}
          <div className="space-y-5 reveal">
            <div className="glass rounded-2xl p-8 gradient-border">
              <h3 className="font-display font-bold text-xl text-white mb-4">Let's Connect</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                I'm always open to new opportunities and collaborations. Feel free to reach out if you want to work together or just have a chat!
              </p>
              <div className="space-y-4">
                <a href="https://github.com/nishadii99" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-primary-300 transition-colors text-sm group">
                  <span className="w-9 h-9 glass-strong rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all">
                    <Github size={17} />
                  </span>
                  github.com/nishadii99
                </a>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-9 h-9 glass-strong rounded-xl flex items-center justify-center">
                    <MapPin size={17} className="text-primary-400" />
                  </span>
                  Galle, Sri Lanka
                </div>
                <a href="mailto:nishadikavindya@email.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-primary-300 transition-colors text-sm group">
                  <span className="w-9 h-9 glass-strong rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all">
                    <Mail size={17} />
                  </span>
                  Get in touch via email
                </a>
              </div>
            </div>
          </div>

          {/* Right: quick form */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="glass rounded-2xl p-8 gradient-border">
              <h3 className="font-display font-bold text-xl text-white mb-6">Send a Message</h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full glass rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 border border-white/5 transition-all bg-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full glass rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 border border-white/5 transition-all bg-transparent"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your Message..."
                    className="w-full glass rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 border border-white/5 transition-all bg-transparent resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary text-white w-full inline-flex items-center justify-center gap-2">
                  <Send size={15} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
