// Fond animé du Hero : plusieurs anneaux concentriques qui tournent
// lentement à des vitesses différentes, un halo bleu diffus et un champ
// d'étoiles discret qui scintille doucement. Entièrement en CSS/SVG —
// net à toute résolution, aucun poids vidéo, et ça reprend le motif de
// la marque (anneau + satellite) plutôt qu'un visuel générique.
const STARS = [
  { x: 12, y: 18, size: 2, delay: 0 },
  { x: 82, y: 12, size: 1.5, delay: 0.6 },
  { x: 92, y: 38, size: 2, delay: 1.2 },
  { x: 6, y: 52, size: 1.5, delay: 1.8 },
  { x: 25, y: 85, size: 2, delay: 0.3 },
  { x: 70, y: 88, size: 1.5, delay: 2.1 },
  { x: 95, y: 70, size: 1.5, delay: 0.9 },
  { x: 40, y: 6, size: 1.5, delay: 1.5 },
  { x: 55, y: 95, size: 2, delay: 2.4 },
  { x: 8, y: 30, size: 1, delay: 2.7 },
]

export function HeroOrbit() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Halo central diffus */}
      <div
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(47,111,237,0.5) 0%, rgba(47,111,237,0) 70%)' }}
      />

      {/* Étoiles */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute animate-pulse-glow rounded-full bg-white/70"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: '3.5s',
          }}
        />
      ))}

      {/* Anneaux concentriques en rotation lente */}
      <svg
        viewBox="0 0 800 800"
        className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.28]"
      >
        <defs>
          <linearGradient id="hero-ring-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5790ff" />
            <stop offset="100%" stopColor="#1f56d1" />
          </linearGradient>
          <linearGradient id="hero-ring-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8ab1ff" />
            <stop offset="100%" stopColor="#2f6fed" />
          </linearGradient>
        </defs>

        <g style={{ transformOrigin: '400px 400px' }} className="animate-[orbit_70s_linear_infinite]">
          <circle cx="400" cy="400" r="340" fill="none" stroke="url(#hero-ring-a)" strokeWidth="1" strokeDasharray="4 10" />
        </g>
        <g style={{ transformOrigin: '400px 400px' }} className="animate-[orbit_50s_linear_infinite_reverse]">
          <circle cx="400" cy="400" r="260" fill="none" stroke="url(#hero-ring-b)" strokeWidth="1.5" />
        </g>
        <g style={{ transformOrigin: '400px 400px' }} className="animate-[orbit_90s_linear_infinite]">
          <circle cx="400" cy="400" r="180" fill="none" stroke="url(#hero-ring-a)" strokeWidth="1" strokeDasharray="2 14" />
          <circle cx="580" cy="400" r="6" fill="url(#hero-ring-b)" />
        </g>
      </svg>
    </div>
  )
}
