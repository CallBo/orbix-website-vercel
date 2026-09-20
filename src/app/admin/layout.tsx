import { Info } from 'lucide-react'

import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-base">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8">
        {/* Le middleware bloque maintenant réellement /admin aux comptes
            sans publicMetadata.role = admin/super_admin (voir middleware.ts).
            Ce bandeau reste pour un seul rappel : ça suppose que Samuel a
            fait la configuration Clerk Dashboard en amont (custom session
            claim + rôle assigné à son propre compte). Sans ça, personne —
            lui inclus — ne peut entrer ici (fail-safe voulu). */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-orbix-500/20 bg-orbix-500/10 px-4 py-3 text-sm text-orbix-300">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>
            Accès protégé par rôle Clerk (voir <code>middleware.ts</code>). Si tu es
            bloqué en tant qu&apos;admin, vérifie la configuration du session token et de
            ton <code>publicMetadata.role</code> dans le Dashboard Clerk.
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
