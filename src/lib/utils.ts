import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date: Date | string): string {
  const target = typeof date === 'string' ? new Date(date) : date
  const seconds = Math.floor((Date.now() - target.getTime()) / 1000)

  if (seconds < 60) return "à l'instant"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `il y a ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.floor(hours / 24)
  if (days < 30) return `il y a ${days} j`
  return target.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatDate(date: Date | string): string {
  const target = typeof date === 'string' ? new Date(date) : date
  return target.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
