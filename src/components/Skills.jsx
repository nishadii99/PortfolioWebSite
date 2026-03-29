import { useEffect, useRef, useState } from 'react';

/* ─── icon definitions ─────────────────────────────────────────── */
const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const sphereItems = [
  // Languages
  { text: 'Java',        color: '#f89820', icon: `${DEV}/java/java-original.svg` },
  { text: 'Python',      color: '#3572A5', icon: `${DEV}/python/python-original.svg` },
  { text: 'JavaScript',  color: '#f7df1e', icon: `${DEV}/javascript/javascript-original.svg` },
  { text: 'TypeScript',  color: '#3178c6', icon: `${DEV}/typescript/typescript-original.svg` },
  { text: 'HTML5',       color: '#e34c26', icon: `${DEV}/html5/html5-original.svg` },
  { text: 'CSS3',        color: '#264de4', icon: `${DEV}/css3/css3-original.svg` },
  { text: 'SQL',         color: '#00758f', icon: `${DEV}/mysql/mysql-original.svg` },
  // Frontend
  { text: 'React',       color: '#61dafb', icon: `${DEV}/react/react-original.svg` },
  { text: 'Next.js',     color: '#aaaaaa', icon: `${DEV}/nextjs/nextjs-original.svg` },
  { text: 'Redux',       color: '#764abc', icon: `${DEV}/redux/redux-original.svg` },
  { text: 'Tailwind',    color: '#38bdf8', icon: `${DEV}/tailwindcss/tailwindcss-original.svg` },
  { text: 'Bootstrap',   color: '#7952b3', icon: `${DEV}/bootstrap/bootstrap-original.svg` },
  // Mobile
  { text: 'Expo',        color: '#cccccc', icon: `${DEV}/expo/expo-original.svg` },
  { text: 'Android',     color: '#3DDC84', icon: `${DEV}/android/android-original.svg` },
  // Backend
  { text: 'Spring Boot', color: '#6DB33F', icon: `${DEV}/spring/spring-original.svg` },
  { text: 'Node.js',     color: '#68a063', icon: `${DEV}/nodejs/nodejs-original.svg` },
  { text: 'Express',     color: '#bfbfbf', icon: `${DEV}/express/express-original.svg` },
  // Databases
  { text: 'MySQL',       color: '#00758f', icon: `${DEV}/mysql/mysql-original.svg` },
  { text: 'MongoDB',     color: '#4DB33D', icon: `${DEV}/mongodb/mongodb-original.svg` },
  { text: 'Firebase',    color: '#FFCA28', icon: `${DEV}/firebase/firebase-original.svg` },
  // AI & ML
  { text: 'Pandas',      color: '#130754', icon: `${DEV}/pandas/pandas-original.svg` },
  { text: 'NumPy',       color: '#4D77CF', icon: `${DEV}/numpy/numpy-original.svg` },
  { text: 'OpenAI',      color: '#10a37f', emoji: '🤖' },
  // DevOps & Cloud
  { text: 'Docker',      color: '#0db7ed', icon: `${DEV}/docker/docker-original.svg` },
  { text: 'GitHub',      color: '#ffffff', icon: `${DEV}/github/github-original.svg` },
  { text: 'Azure',       color: '#0089D6', icon: `${DEV}/azure/azure-original.svg` },
  // Security
  { text: 'JWT',         color: '#d63aff', emoji: '🔐' },
  { text: 'OAuth2',      color: '#EB5424', emoji: '🛡️' },
  // Tools
  { text: 'Git',         color: '#f34f29', icon: `${DEV}/git/git-original.svg` },
  { text: 'Postman',     color: '#FF6C37', icon: `${DEV}/postman/postman-original.svg` },
  { text: 'Figma',       color: '#f24e1e', icon: `${DEV}/figma/figma-original.svg` },
  { text: 'VS Code',     color: '#007ACC', icon: `${DEV}/vscode/vscode-original.svg` },
  { text: 'IntelliJ',    color: '#fe315d', icon: `${DEV}/intellij/intellij-original.svg` },
  { text: 'Selenium',    color: '#43B02A', icon: `${DEV}/selenium/selenium-original.svg` },
  { text: 'Swagger',     color: '#85EA2D', icon: `${DEV}/swagger/swagger-original.svg` },
];

/* ─── skill categories for cards ──────────────────────────────── */
const skillCategories = [
  { label: 'Languages',     color: '#f7df1e', skills: ['Java', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML5', 'CSS3'] },
  { label: 'Frontend',      color: '#61dafb', skills: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Bootstrap', 'Responsive Web Design'] },
  { label: 'Mobile',        color: '#7c3aed', skills: ['React Native', 'Expo', 'Android Development', 'NativeWind', 'Cross-Platform Dev'] },
  { label: 'Backend',       color: '#68a063', skills: ['Spring Boot', 'Node.js', 'Express.js', 'RESTful APIs', 'Microservices', 'WebSockets'] },
  { label: 'Databases',     color: '#f97316', skills: ['MySQL', 'MongoDB', 'Firebase'] },
  { label: 'AI & ML',       color: '#ec4899', skills: ['Pandas', 'NumPy', 'OpenAI API'] },
  { label: 'DevOps & Cloud',color: '#38bdf8', skills: ['Docker', 'GitHub Actions', 'Azure'] },
  { label: 'Security',      color: '#fb923c', skills: ['Spring Security', 'JWT', 'OAuth2', 'Data Encryption'] },
  { label: 'Tools',         color: '#a78bfa', skills: ['Git', 'Swagger', 'Postman', 'Figma', 'VS Code', 'IntelliJ IDEA', 'Selenium'] },
  { label: 'Soft Skills',   color: '#34d399', skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Leadership', 'Agile/Scrum'] },
];

/* ─── preload images ───────────────────────────────────────────── */
function preloadImages(items) {
  return Promise.all(
    items.map(
      (item) =>
        new Promise((resolve) => {
          if (!item.icon) { resolve({ ...item, img: null }); return; }
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve({ ...item, img });
          img.onerror = () => resolve({ ...item, img: null });
          img.src = item.icon;
        })
    )
  );
}

/* ─── sphere renderer ──────────────────────────────────────────── */
function startSphere(canvas, loadedItems) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const SIZE = canvas.width / dpr;        // CSS pixel size
  const W = SIZE, H = SIZE;
  const R = SIZE * 0.38;
  const cx = W / 2, cy = H / 2;

  // spread items on golden-ratio sphere
  const n = loadedItems.length;
  let pts = loadedItems.map((item, i) => {
    const phi   = Math.acos(-1 + (2 * i) / n);
    const theta = Math.sqrt(n * Math.PI) * phi;
    return {
      ...item,
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    };
  });

  let dragging = false, lastMX = 0, lastMY = 0;
  let raf;

  function rotateAll(ax, ay) {
    pts = pts.map((p) => {
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { ...p, x: x1, y: y2, z: z2 };
    });
  }

  function hexAlpha(hex, a) {
    // convert hex colour + alpha [0-1] to rgba()
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    if (!dragging) rotateAll(0.003, 0.005);

    const sorted = [...pts].sort((a, b) => a.z - b.z);

    sorted.forEach((p) => {
      const depth  = (p.z + 1) / 2;           // 0 → back, 1 → front
      const alpha  = 0.25 + depth * 0.75;
      const radius = 14 + depth * 10;         // 14–24 px circle
      const sx = cx + p.x * R;
      const sy = cy + p.y * R;

      // shadow glow
      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur  = 12 * depth;

      // circle background
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fillStyle = hexAlpha(
        p.color.startsWith('#') ? p.color : '#ffffff',
        0.12 + depth * 0.13
      );
      ctx.fill();

      // circle border
      ctx.strokeStyle = hexAlpha(
        p.color.startsWith('#') ? p.color : '#ffffff',
        alpha
      );
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      const iconSize = radius * 1.4;
      const ix = sx - iconSize / 2;
      const iy = sy - iconSize / 2;

      ctx.globalAlpha = alpha;

      if (p.img) {
        // draw SVG icon
        ctx.drawImage(p.img, ix, iy, iconSize, iconSize);
      } else if (p.emoji) {
        // draw emoji
        ctx.font = `${radius * 1.1}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(p.emoji, sx, sy);
      } else {
        // fallback: first 2 chars
        ctx.font = `bold ${Math.round(radius * 0.75)}px Inter,sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = p.color;
        ctx.fillText(p.text.slice(0, 2), sx, sy);
      }

      ctx.globalAlpha = 1;
    });

    raf = requestAnimationFrame(draw);
  }

  draw();

  /* drag handlers */
  const onDown = (e) => {
    dragging = true;
    const t = e.touches ? e.touches[0] : e;
    lastMX = t.clientX; lastMY = t.clientY;
    canvas.style.cursor = 'grabbing';
  };
  const onMove = (e) => {
    if (!dragging) return;
    const t = e.touches ? e.touches[0] : e;
    const dx = t.clientX - lastMX, dy = t.clientY - lastMY;
    rotateAll(dy * 0.005, dx * 0.005);
    lastMX = t.clientX; lastMY = t.clientY;
  };
  const onUp = () => { dragging = false; canvas.style.cursor = 'grab'; };

  canvas.addEventListener('mousedown',  onDown);
  canvas.addEventListener('mousemove',  onMove);
  window.addEventListener('mouseup',    onUp);
  canvas.addEventListener('touchstart', onDown, { passive: true });
  canvas.addEventListener('touchmove',  onMove, { passive: true });
  canvas.addEventListener('touchend',   onUp);

  return () => {
    cancelAnimationFrame(raf);
    canvas.removeEventListener('mousedown',  onDown);
    canvas.removeEventListener('mousemove',  onMove);
    window.removeEventListener('mouseup',    onUp);
    canvas.removeEventListener('touchstart', onDown);
    canvas.removeEventListener('touchmove',  onMove);
    canvas.removeEventListener('touchend',   onUp);
  };
}

/* ─── component ────────────────────────────────────────────────── */
export default function Skills() {
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);

  /* canvas setup + image preload */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr  = window.devicePixelRatio || 1;
    const size = Math.min(window.innerWidth * 0.42, 480);
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width  = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.getContext('2d').scale(dpr, dpr);

    let cleanup = () => {};
    preloadImages(sphereItems).then((loaded) => {
      cleanup = startSphere(canvas, loaded);
    });
    return () => cleanup();
  }, []);

  /* reveal animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* heading */}
        <div className="text-center mb-16 reveal">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Tech Stack
          </p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-subtitle">Drag the sphere · hover a category to explore</p>
        </div>

        {/* two-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* ── icon sphere ── */}
          <div className="reveal flex-shrink-0 flex items-center justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)' }}
              />
              <canvas
                ref={canvasRef}
                className="touch-none select-none rounded-full"
                style={{ cursor: 'grab' }}
              />
            </div>
          </div>

          {/* ── category cards ── */}
          <div
            className="reveal flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
            style={{ transitionDelay: '0.1s' }}
          >
            {skillCategories.map((cat) => {
              const active = activeCategory === cat.label;
              return (
                <div
                  key={cat.label}
                  onMouseEnter={() => setActiveCategory(cat.label)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className="glass rounded-2xl p-5 cursor-default transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    border:     `1px solid ${active ? cat.color + '55' : 'transparent'}`,
                    boxShadow:  active ? `0 0 22px ${cat.color}22` : 'none',
                  }}
                >
                  {/* header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                    />
                    <h3
                      className="font-display font-bold text-sm tracking-wide uppercase transition-colors duration-200"
                      style={{ color: active ? cat.color : '#e2e8f0' }}
                    >
                      {cat.label}
                    </h3>
                  </div>

                  {/* pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                        style={{
                          background: active ? cat.color + '20' : 'rgba(255,255,255,0.05)',
                          color:      active ? cat.color : '#9ca3af',
                          border:     `1px solid ${active ? cat.color + '40' : 'rgba(255,255,255,0.06)'}`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
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
