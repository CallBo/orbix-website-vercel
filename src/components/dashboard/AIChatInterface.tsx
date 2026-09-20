'use client'

import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'Où en est mon projet ?',
  "J'ai une question technique",
  'Je veux demander une modification',
]

export function AIChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Bonjour ! Je suis Orbix AI. Comment puis-je vous aider aujourd’hui ?' },
  ])
  const [input, setInput] = useState('')
  const [conversationId, setConversationId] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const send = async (text: string) => {
    const message = text.trim()
    if (!message || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai-tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversationId }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body?.message ?? 'Erreur.')

      setMessages((prev) => [...prev, { role: 'assistant', content: body.data.message }])
      setConversationId(body.data.conversationId)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Orbix AI n'a pas pu répondre.")
      setMessages((prev) => prev.slice(0, -1)) // retire le message utilisateur non confirmé
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl border border-surface-border bg-surface-raised">
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <div key={index} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
            {message.role === 'assistant' && (
              <div className="mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orbix-500/15 text-orbix-400">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm',
                message.role === 'user' ? 'bg-orbix-500 text-white' : 'bg-surface-overlay text-white'
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-surface-overlay px-4 py-2.5 text-sm text-text-muted">Orbix AI écrit…</div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-6 pb-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-surface-border bg-surface-overlay px-3 py-1.5 text-xs text-text-secondary hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-surface-border p-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send(input))}
          placeholder="Pose ta question…"
          rows={1}
          className="flex-1 resize-none rounded-xl border border-surface-border bg-surface-base px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
        />
        <Button size="icon" variant="primary" onClick={() => send(input)} loading={loading} disabled={!input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
