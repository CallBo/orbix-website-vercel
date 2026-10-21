import { cn } from '@/lib/utils'

// Cadres d'appareils en CSS pur (ordinateur portable, téléphone) : ils
// jouent le rôle des photos produit d'apple.com — l'interface Orbix est
// "posée" dans un appareil plutôt que flottant dans le vide. Le contenu
// de l'écran est toujours sombre, donc lisible sur un panneau clair comme
// sur un panneau noir (un liseré argent détache l'appareil du fond noir).

export function LaptopFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-[640px]', className)}>
      {/* Écran */}
      <div className="relative rounded-t-[18px] bg-[#1d1d1f] p-[2.2%] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_80px_-20px_rgba(0,0,0,0.45)]">
        <div className="absolute left-1/2 top-[0.9%] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-[#2c2c2e]" />
        <div className="aspect-[16/10] overflow-hidden rounded-[6px] bg-black">{children}</div>
      </div>
      {/* Base */}
      <div className="relative mx-[-6%] h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#d4d5d9] via-[#b3b5bb] to-[#8c8f96] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.35)]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[16%] -translate-x-1/2 rounded-b-md bg-[#8c8f96]" />
      </div>
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative mx-auto w-[240px] rounded-[44px] bg-[#1d1d1f] p-[9px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_30px_80px_-20px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[36px] bg-black">
        <div className="absolute left-1/2 top-2.5 z-10 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/5" />
        <div className="flex h-full flex-col pt-12">{children}</div>
      </div>
    </div>
  )
}
