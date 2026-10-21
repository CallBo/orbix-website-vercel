'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Menu, X, LayoutDashboard, FolderKanban, Receipt, MessageSquare, Sparkles, FileStack, Settings } from 'lucide-react'

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

export function DashboardMobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="border-b border-surface-border bg-surface-base md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <OrbixLogo className="h-7" />
          <OrbixWordmark className="h-[16px]" />
        </Link>
        <div className="flex items-center gap-3">
          <NotificationsBell />
          <UserButton afterSignOutUrl="/" />
          <button onClick={() => setOpen((v) => !v)} className="text-text-secondary" aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="space-y-1 border-t border-surface-border px-3 py-3">
          {links.map((link) => {
            const active = link.href === '/dashboard' ? pathname === link.href : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                  active ? 'bg-orbix-500/15 text-orbix-300' : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </div>
  )
}
