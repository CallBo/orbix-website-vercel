// Contenus d'écran stylisés, affichés dans les cadres d'appareils
// (Devices.tsx) et les cartes du carrousel. Monochrome, interfaces Orbix
// schématisées : on reconnaît une vraie app sans prétendre être une
// capture d'écran exacte. Purement décoratifs (aria-hidden côté parent).

const bar = (w: string, tone = 'bg-white/20') => <span className={`block h-1.5 rounded-full ${w} ${tone}`} />

export function CodeScreen() {
  const lines = [
    ['w-[18%]', 'w-[42%]'],
    ['w-[10%]', 'w-[30%]', 'w-[22%]'],
    ['w-[24%]', 'w-[16%]'],
    ['w-[14%]', 'w-[48%]'],
    ['w-[20%]', 'w-[26%]', 'w-[12%]'],
    ['w-[12%]', 'w-[34%]'],
    ['w-[28%]', 'w-[18%]'],
    ['w-[16%]', 'w-[40%]'],
  ]
  return (
    <div className="flex h-full text-white">
      {/* Éditeur */}
      <div className="flex w-[55%] flex-col border-r border-white/10 bg-[#0b0b0c]">
        <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] text-white/70">page.tsx</span>
          <span className="px-2 py-0.5 text-[9px] text-white/30">api.ts</span>
        </div>
        <div className="flex-1 space-y-[7%] p-[5%]">
          {lines.map((line, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-3 text-right text-[8px] text-white/25">{i + 1}</span>
              {line.map((w, j) => (
                <span key={j} className={`h-1.5 rounded-full ${w} ${j === 0 ? 'bg-white/60' : 'bg-white/20'}`} />
              ))}
            </div>
          ))}
          <span className="ml-4 block h-3 w-[2px] animate-pulse bg-white" />
        </div>
      </div>
      {/* Aperçu en direct */}
      <div className="flex w-[45%] flex-col bg-[#f5f5f7] p-[5%]">
        <div className="mb-[8%] flex items-center justify-between">
          <span className="h-2 w-8 rounded-full bg-black/80" />
          <span className="flex gap-1">
            <span className="h-1.5 w-4 rounded-full bg-black/20" />
            <span className="h-1.5 w-4 rounded-full bg-black/20" />
          </span>
        </div>
        <span className="mx-auto block h-2.5 w-[70%] rounded-full bg-black/85" />
        <span className="mx-auto mt-1.5 block h-1.5 w-[50%] rounded-full bg-black/25" />
        <span className="mx-auto mt-[8%] block h-3.5 w-[34%] rounded-full bg-black" />
        <div className="mt-auto grid grid-cols-2 gap-1.5">
          <span className="aspect-[4/3] rounded-md bg-black/90" />
          <span className="aspect-[4/3] rounded-md bg-black/10" />
        </div>
      </div>
    </div>
  )
}

export function DashboardScreen() {
  return (
    <div className="flex h-full bg-[#0b0b0c] text-white">
      <div className="flex w-[22%] flex-col gap-2.5 border-r border-white/10 p-[3%]">
        <span className="mb-2 h-2 w-[70%] rounded-full bg-white/70" />
        {['bg-white/60', 'bg-white/20', 'bg-white/20', 'bg-white/20', 'bg-white/20'].map((t, i) => (
          <span key={i} className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${i === 0 ? 'bg-white/10' : ''}`}>
            <span className="h-2 w-2 rounded-[3px] bg-white/40" />
            <span className={`h-1.5 flex-1 rounded-full ${t}`} />
          </span>
        ))}
      </div>
      <div className="flex-1 p-[4%]">
        <span className="block h-2.5 w-[40%] rounded-full bg-white/80" />
        <span className="mt-1.5 block h-1.5 w-[25%] rounded-full bg-white/25" />
        <div className="mt-[5%] grid grid-cols-3 gap-2">
          {['72%', '3', '1,2 M'].map((v) => (
            <div key={v} className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
              <span className="block h-1 w-[50%] rounded-full bg-white/25" />
              <span className="mt-1.5 block text-[11px] font-semibold tracking-tight">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-[5%] space-y-2 rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
          {[0.72, 0.45, 0.9].map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-[28%] rounded-full bg-white/40" />
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-white/70" style={{ width: `${p * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChatScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-black px-3.5 pb-5 text-white">
      <div className="mb-1 flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </span>
        <span className="text-[11px] font-semibold">Orbix AI</span>
      </div>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-white px-3 py-2 text-[11px] font-medium leading-snug text-black">
        Résume les ventes du mois.
      </div>
      <div className="max-w-[88%] space-y-1.5 rounded-2xl rounded-tl-md bg-white/[0.08] px-3 py-2.5">
        {bar('w-[90%]', 'bg-white/55')}
        {bar('w-[75%]', 'bg-white/30')}
        {bar('w-[60%]', 'bg-white/30')}
      </div>
      <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[0.08] p-2.5">
        <div className="flex h-14 items-end gap-1">
          {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-white/60" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-white px-3 py-2 text-[11px] font-medium text-black">
        Envoie-le à l’équipe.
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-full border border-white/15 px-3 py-2">
        <span className="h-1.5 flex-1 rounded-full bg-white/15" />
        <span className="h-4 w-4 rounded-full bg-white" />
      </div>
    </div>
  )
}

export function AcademyScreen() {
  return (
    <div className="flex h-full flex-col bg-black px-3.5 pb-5 text-white">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-white/20 to-white/[0.03]">
        <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90">
          <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-black" />
        </span>
      </div>
      <span className="mt-3 text-[12px] font-semibold">Piscine C — Module 1</span>
      <span className="mt-1 text-[10px] text-white/50">Leçon 3 sur 12</span>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/4 rounded-full bg-white" />
      </div>
      <div className="mt-4 space-y-2">
        {['Variables et types', 'Boucles', 'Pointeurs', 'Mémoire'].map((t, i) => (
          <div key={t} className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-2.5 py-2">
            <span className={`h-3.5 w-3.5 rounded-full border ${i < 2 ? 'border-white bg-white' : 'border-white/30'}`} />
            <span className="text-[10px] text-white/80">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function InvoiceScreen() {
  return (
    <div className="flex h-full flex-col bg-black px-3.5 pb-5 text-white">
      <span className="text-[10px] uppercase tracking-widest text-white/40">Facture</span>
      <span className="mt-1 text-[22px] font-semibold tracking-tight">450 000 FCFA</span>
      <span className="mt-1 inline-flex w-fit rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-white/70">À régler</span>
      <div className="mt-4 space-y-2.5 rounded-xl bg-white/[0.06] p-3">
        {['w-[60%]', 'w-[45%]', 'w-[70%]'].map((w, i) => (
          <div key={i} className="flex items-center justify-between">
            {bar(w, 'bg-white/35')}
            {bar('w-[18%]', 'bg-white/60')}
          </div>
        ))}
      </div>
      <div className="mt-auto space-y-2">
        <span className="block rounded-full bg-white py-2.5 text-center text-[11px] font-semibold text-black">Payer par Mobile Money</span>
        <span className="block rounded-full border border-white/20 py-2.5 text-center text-[11px] text-white/80">Payer par carte</span>
      </div>
    </div>
  )
}

export function MessagesScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-black px-3.5 pb-5 text-white">
      {[
        { me: false, w: ['w-[80%]', 'w-[55%]'] },
        { me: true, w: ['w-[65%]'] },
        { me: false, w: ['w-[70%]', 'w-[40%]'] },
      ].map((m, i) => (
        <div key={i} className={`flex gap-2 ${m.me ? 'flex-row-reverse' : ''}`}>
          {!m.me && <span className="h-6 w-6 flex-shrink-0 rounded-full bg-white/20" />}
          <div className={`max-w-[75%] space-y-1.5 rounded-2xl px-3 py-2.5 ${m.me ? 'w-[60%] bg-white' : 'w-[70%] bg-white/[0.08]'}`}>
            {m.w.map((w, j) => (
              <span key={j} className={`block h-1.5 rounded-full ${w} ${m.me ? 'bg-black/50' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] p-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[8px] text-white/60">PDF</span>
        <div className="flex-1 space-y-1">
          {bar('w-[70%]', 'bg-white/50')}
          {bar('w-[30%]', 'bg-white/20')}
        </div>
      </div>
    </div>
  )
}
