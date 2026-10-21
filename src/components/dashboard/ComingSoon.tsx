import type { LucideIcon } from 'lucide-react'

interface ComingSoonProps {
  icon: LucideIcon
  title: string
  description: string
}

// Utilisé pour toute section du dashboard prévue au PRD mais pas encore
// construite — évite un lien mort tout en étant honnête sur l'état
// d'avancement, plutôt que de simuler une fausse fonctionnalité.
export function ComingSoon({ icon: Icon, title, description }: ComingSoonProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border px-6 text-center">
      <div className="mb-4 rounded-xl border border-orbix-500/20 bg-orbix-500/10 p-3 text-orbix-600">
        <Icon className="h-6 w-6" />
      </div>
      <h1 className="font-display text-xl font-semibold text-text-primary">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-text-secondary">{description}</p>
      <span className="mt-4 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-text-muted">
        Bientôt disponible
      </span>
    </div>
  )
}
