'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell } from 'lucide-react'

import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import type { ApiNotification } from '@/lib/api'

const POLL_INTERVAL_MS = 20000

// Cloche générique : les "notifications" de la V1 sont les messages non
// lus (voir orbix-api/notifications.service.ts — pas de modèle dédié).
// Cliquer une notification marque le message lu et amène vers le fil de
// discussion du projet concerné.
export function NotificationsBell() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<ApiNotification[]>([])

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications')
      if (!res.ok) return
      const body = await res.json()
      setNotifications(body.data)
    } catch {
      // échec silencieux — la cloche n'est pas une fonctionnalité critique
    }
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const handleClick = async (notification: ApiNotification) => {
    await fetch(`/api/notifications/${notification.id}/read`, { method: 'PATCH' }).catch(() => {})
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
    setOpen(false)
    if (notification.projectId) {
      router.push('/dashboard/messages')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative text-text-secondary hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orbix-500 text-[10px] font-semibold text-white">
            {notifications.length > 9 ? '9+' : notifications.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-surface-border bg-surface-raised shadow-modal">
            <div className="border-b border-surface-border px-4 py-3">
              <p className="text-sm font-medium text-white">Notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-text-muted">Rien de nouveau.</p>
              ) : (
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleClick(notification)}
                    className={cn(
                      'block w-full border-b border-surface-border px-4 py-3 text-left last:border-b-0 hover:bg-surface-overlay'
                    )}
                  >
                    <p className="line-clamp-2 text-sm text-white">{notification.content}</p>
                    <p className="mt-1 text-xs text-text-muted">{formatRelativeTime(notification.createdAt)}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
