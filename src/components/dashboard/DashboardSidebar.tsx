'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import {
  LayoutDashboard,
  FolderKanban,
  Receipt,
  MessageSquare,
  Sparkles,
  FileStack,
  Settings,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { OrbixLogo, OrbixWordmark } from '@/components/layout/OrbixLogo'
import { NotificationsBell } from './NotificationsBell'

const links = [
  { href: '/dashboard', label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Mes projets', icon: FolderKanban },
  { href: '/dashboard/invoices', label: 'Mes factures', icon: Receipt },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/ai', label: 'Orbix AI', icon: Sparkles },
  { href: '/dashboard/files', label: 'Mes fichiers', icon: FileStack },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-surface-border bg-surface-raised/40 md:flex">
      <Link href="/" className="flex items-center gap-2.5 px-6 py-6">
        <OrbixLogo className="h-7" />
        <OrbixWordmark className="h-[18px]" />
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const active = link.href === '/dashboard' ? pathname === link.href : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-orbix-500/15 text-orbix-300'
                  : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center justify-between border-t border-surface-border px-6 py-4">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm text-text-secondary">Mon compte</span>
        </div>
        <NotificationsBell />
      </div>
    </aside>
  )
}
