'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { ApiMessage } from '@/lib/api'

interface MessageThreadProps {
  projectId: string
  currentUserName: string
}

// Pas de WebSocket pour l'instant (choix assumé — voir README orbix-api) :
// on interroge toutes les 8 secondes tant que l'onglet est actif. Simple,
// suffisant pour un fil de discussion projet qui n'a pas besoin d'être
// instantané à la milliseconde près.
const POLL_INTERVAL_MS = 8000

export function MessageThread({ projectId, currentUserName }: MessageThreadProps) {
  const [messages, setMessages] = useState<ApiMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages/project/${projectId}`)
      const body = await res.json()
      if (res.ok) setMessages(body.data)
    } finally {
      setLoaded(true)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const handleSend = async () => {
    const content = input.trim()
    if (!content) return

    setSending(true)
    try {
      const res = await fetch(`/api/messages/project/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body?.message ?? 'Erreur.')

      setInput('')
      setMessages((prev) => [...prev, body.data])
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-[60vh] flex-col rounded-2xl border border-surface-border bg-surface-raised">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {!loaded && <p className="text-sm text-text-muted">Chargement…</p>}
        {loaded && messages.length === 0 && (
          <p className="text-sm text-text-muted">Aucun message pour l&apos;instant — lancez la conversation.</p>
        )}
        {messages.map((message) => {
          const isMine = message.sender?.name === currentUserName
          return (
            <div key={message.id} className={cn('flex', isMine ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
                  isMine ? 'bg-orbix-500 text-white' : 'bg-surface-overlay text-white'
                )}
              >
                {!isMine && <p className="mb-0.5 text-xs font-medium text-orbix-300">{message.sender?.name}</p>}
                <p>{message.content}</p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-surface-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Écrire un message…"
          className="flex-1 rounded-xl border border-surface-border bg-surface-base px-4 py-2 text-sm text-white placeholder:text-text-muted focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
        />
        <Button size="icon" variant="primary" onClick={handleSend} loading={sending} disabled={!input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
