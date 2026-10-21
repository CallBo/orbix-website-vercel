// Mini-maquettes d'interface affichées dans les tuiles Services : plutôt
// qu'un halo abstrait, chaque tuile montre un fragment de "produit" (comme
// Apple montre une app dans ses vignettes). Entièrement en HTML/CSS,
// monochrome (noir / blanc / argent), avec une animation discrète par
// tuile. Purement décoratif : aria-hidden.

function Window({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
      </div>
      {children}
    </div>
  )
}

export function SoftwareVisual() {
  const lines = [
    ['w-10', 'w-24', 'w-8'],
    ['w-6', 'w-16', 'w-20'],
    ['w-14', 'w-10'],
    ['w-8', 'w-28', 'w-6'],
    ['w-12', 'w-14'],
    ['w-20', 'w-8', 'w-10'],
  ]
  return (
    <Window className="w-full max-w-md">
      <div className="space-y-2.5 p-4 font-mono">
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex animate-fade-in items-center gap-2"
            style={{ animationDelay: `${i * 0.12}s`, animationFillMode: 'backwards' }}
          >
            <span className="w-4 text-right text-[10px] text-white/25">{i + 1}</span>
            {line.map((w, j) => (
              <span key={j} className={`h-1.5 rounded-full ${w} ${j === 0 ? 'bg-white/60' : 'bg-white/20'}`} />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-2 pl-6">
          <span className="h-3.5 w-[2px] animate-pulse bg-white" />
        </div>
      </div>
    </Window>
  )
}

export function AiVisual() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[13px] font-medium text-ink-900">
        Résume les ventes du mois.
      </div>
      <div className="flex max-w-[85%] gap-2.5">
        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </div>
        <div className="space-y-2 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.06] px-4 py-3">
          <span className="block h-1.5 w-40 rounded-full bg-white/50" />
          <span className="block h-1.5 w-52 rounded-full bg-white/30" />
          <span className="block h-1.5 w-32 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  )
}

export function CloudVisual() {
  return (
    <div className="flex w-full max-w-[13rem] flex-col gap-2">
      {[0.92, 0.64, 0.78].map((load, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2.5">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white/60" style={{ width: `${load * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SecurityVisual() {
  return (
    <div className="relative flex h-28 w-24 items-center justify-center">
      <svg viewBox="0 0 96 112" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="shield-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8c8f96" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M48 4 L88 18 V52 C88 78 70 98 48 108 C26 98 8 78 8 52 V18 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="url(#shield-metal)"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute inset-x-3 top-4 h-px animate-[scan_2.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white to-transparent" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    </div>
  )
}

export function AutomationVisual() {
  return (
    <div className="flex items-center">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-white/70" />
          </div>
          {i < 2 && (
            <div className="relative h-px w-8 bg-white/15">
              <span
                className="absolute -top-[2px] left-0 h-[5px] w-[5px] animate-[flow_1.8s_linear_infinite] rounded-full bg-white"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function MarketplaceVisual() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`h-9 w-12 rounded-lg border border-white/10 transition-colors duration-500 ${
            i === 4 ? 'bg-white/80' : 'bg-white/[0.06]'
          }`}
        />
      ))}
    </div>
  )
}
