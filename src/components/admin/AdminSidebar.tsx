'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { LayoutDashboard, Users, FolderKanban, Receipt, Newspaper, GraduationCap } from 'lucide-react'

import { cn } from '@/lib/utils'
import { OrbixLogo } from '@/components/layout/OrbixLogo'
import { Badge } from '@/components/ui/Badge'

const links = [
  { href: '/admin', label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/projects', label: 'Projets', icon: FolderKanban },
  { href: '/admin/invoices', label: 'Factures', icon: Receipt },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/academy', label: 'Academy', icon: GraduationCap },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-surface-border bg-surface-raised/40 md:flex">
      <Link href="/" className="flex items-center gap-2.5 px-6 py-6">
        <OrbixLogo className="h-7 w-auto" />
        <div>
          <span className="block font-display text-base font-bold text-white">
            Orbix <span className="text-orbix-400">Labs</span>
          </span>
          <Badge variant="primary" size="sm" className="mt-1">
            Admin
          </Badge>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const active = link.href === '/admin' ? pathname === link.href : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-orbix-500/15 text-orbix-300'
                  : 'text-text-secondary hover:bg-surface-overlay hover:text-white'
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-3 border-t border-surface-border px-6 py-4">
        <UserButton afterSignOutUrl="/" />
        <Link href="/dashboard" className="text-sm text-text-secondary hover:text-white">
          Vue client →
        </Link>
      </div>
    </aside>
  )
}
