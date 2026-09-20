import type { LucideIcon } from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      <div className="rounded-xl border border-orbix-500/20 bg-orbix-500/10 p-2.5 text-orbix-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-text-muted">{title}</p>
      </div>
    </Card>
  )
}
