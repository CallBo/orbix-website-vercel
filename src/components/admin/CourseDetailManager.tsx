'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Video, HelpCircle, FolderKanban, FileText, Pencil, Check, X } from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'
import type { AcademyCourse, AcademyLessonType } from '@/lib/api'

const lessonIcons: Record<AcademyLessonType, typeof Video> = {
  VIDEO: Video,
  QUIZ: HelpCircle,
  PROJET: FolderKanban,
  TEXTE: FileText,
}

export function CourseDetailManager({ course }: { course: AcademyCourse }) {
  const router = useRouter()
  const [togglingPublish, setTogglingPublish] = useState(false)
  const [addingModule, setAddingModule] = useState(false)
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null)
  const [editingVideoFor, setEditingVideoFor] = useState<string | null>(null)
  const [editingContentFor, setEditingContentFor] = useState<string | null>(null)

  const togglePublish = async () => {
    setTogglingPublish(true)
    try {
      const res = await fetch(`/api/admin/academy/courses/${course.id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !course.published }),
      })
      if (!res.ok) throw new Error((await res.json())?.message ?? 'Erreur.')
      toast.success(course.published ? 'Cours repassé en brouillon.' : 'Cours publié.')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur.')
    } finally {
      setTogglingPublish(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={course.published ? 'success' : 'default'} size="sm">
              {course.published ? 'Publié' : 'Brouillon'}
            </Badge>
            <Badge size="sm">{course.category}</Badge>
            <Badge size="sm">{course.level}</Badge>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-text-primary">{course.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">{course.description}</p>
        </div>
        <Button variant={course.published ? 'secondary' : 'gradient'} loading={togglingPublish} onClick={togglePublish}>
          {course.published ? 'Repasser en brouillon' : 'Publier'}
        </Button>
      </div>

      <IntroVideoSection courseId={course.id} currentUrl={course.introVideoUrl} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-text-primary">Modules</h2>
          <Button variant="secondary" size="sm" onClick={() => setAddingModule((v) => !v)}>
            <Plus className="h-4 w-4" /> Module
          </Button>
        </div>

        {addingModule && (
          <NewModuleForm
            courseId={course.id}
            nextOrder={course.modules.length}
            onDone={() => {
              setAddingModule(false)
              router.refresh()
            }}
            onCancel={() => setAddingModule(false)}
          />
        )}

        {course.modules.length === 0 && !addingModule && (
          <Card className="text-sm text-text-secondary">Aucun module encore. Commence par en créer un.</Card>
        )}

        {course.modules.map((module) => (
          <Card key={module.id}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-text-primary">{module.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setAddingLessonTo(module.id === addingLessonTo ? null : module.id)}>
                <Plus className="h-4 w-4" /> Leçon
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              {module.lessons.map((lesson) => {
                const Icon = lessonIcons[lesson.type]
                return (
                  <div key={lesson.id} className="rounded-xl border border-surface-border px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-text-primary">
                        <Icon className="h-4 w-4 text-orbix-600" />
                        {lesson.title}
                      </div>
                      {lesson.type === 'VIDEO' && (
                        <button
                          onClick={() => setEditingVideoFor(editingVideoFor === lesson.id ? null : lesson.id)}
                          className="text-text-muted hover:text-orbix-600"
                          aria-label="Éditer l'URL vidéo"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {(lesson.type === 'TEXTE' || lesson.type === 'PROJET') && (
                        <button
                          onClick={() => setEditingContentFor(editingContentFor === lesson.id ? null : lesson.id)}
                          className="text-text-muted hover:text-orbix-600"
                          aria-label="Éditer le contenu"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {lesson.type === 'VIDEO' && (
                      <p className="mt-1 truncate text-xs text-text-muted">
                        {lesson.videoUrl ?? 'Pas encore de vidéo — clique sur le crayon pour l’uploader'}
                      </p>
                    )}
                    {(lesson.type === 'TEXTE' || lesson.type === 'PROJET') && (
                      <p className="mt-1 line-clamp-1 text-xs text-text-muted">
                        {lesson.content
                          ? lesson.content
                          : lesson.type === 'TEXTE'
                            ? 'Pas encore de contenu — clique sur le crayon pour le rédiger'
                            : "Pas encore d'énoncé — clique sur le crayon pour le rédiger"}
                      </p>
                    )}

                    {editingVideoFor === lesson.id && (
                      <EditVideoUrlForm
                        lessonId={lesson.id}
                        currentUrl={lesson.videoUrl}
                        onDone={() => {
                          setEditingVideoFor(null)
                          router.refresh()
                        }}
                        onCancel={() => setEditingVideoFor(null)}
                      />
                    )}
                    {editingContentFor === lesson.id && (
                      <EditContentForm
                        lessonId={lesson.id}
                        currentContent={lesson.content}
                        onDone={() => {
                          setEditingContentFor(null)
                          router.refresh()
                        }}
                        onCancel={() => setEditingContentFor(null)}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {addingLessonTo === module.id && (
              <NewLessonForm
                moduleId={module.id}
                nextOrder={module.lessons.length}
                onDone={() => {
                  setAddingLessonTo(null)
                  router.refresh()
                }}
                onCancel={() => setAddingLessonTo(null)}
              />
            )}
          </Card>
        ))}
      </section>
    </div>
  )
}

function NewModuleForm({
  courseId,
  nextOrder,
  onDone,
  onCancel,
}: {
  courseId: string
  nextOrder: number
  onDone: () => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!title.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/academy/courses/${courseId}/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, order: nextOrder }),
      })
      if (!res.ok) throw new Error((await res.json())?.message ?? 'Erreur.')
      toast.success('Module créé.')
      onDone()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="flex items-end gap-3">
      <div className="flex-1">
        <Input label="Titre du module" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      </div>
      <Button variant="gradient" size="md" onClick={submit} loading={submitting}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="md" onClick={onCancel}>
        <X className="h-4 w-4" />
      </Button>
    </Card>
  )
}

function NewLessonForm({
  moduleId,
  nextOrder,
  onDone,
  onCancel,
}: {
  moduleId: string
  nextOrder: number
  onDone: () => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<AcademyLessonType>('VIDEO')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!title.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/academy/modules/${moduleId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          order: nextOrder,
          content: content.trim() || undefined,
        }),
      })
      if (!res.ok) throw new Error((await res.json())?.message ?? 'Erreur.')
      toast.success(type === 'VIDEO' ? 'Leçon créée — ajoute la vidéo juste en dessous.' : 'Leçon créée.')
      onDone()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-3 space-y-3 rounded-xl border border-dashed border-surface-border p-4">
      <Input label="Titre de la leçon" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      <div className="flex gap-2">
        {(['VIDEO', 'TEXTE', 'QUIZ', 'PROJET'] as AcademyLessonType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium',
              type === t ? 'bg-orbix-500 text-text-primary' : 'bg-surface-overlay text-text-secondary'
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {type === 'VIDEO' && (
        <p className="text-xs text-text-muted">
          Crée d&apos;abord la leçon — tu pourras uploader le fichier vidéo juste après via l&apos;icône crayon.
        </p>
      )}
      {(type === 'TEXTE' || type === 'PROJET') && (
        <div className="space-y-1">
          <Textarea
            label={type === 'TEXTE' ? 'Contenu (Markdown)' : "Énoncé du projet (Markdown)"}
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-xs text-text-muted">Facultatif à la création — modifiable ensuite via l&apos;icône crayon.</p>
        </div>
      )}
      <div className="flex gap-2">
        <Button variant="gradient" size="sm" onClick={submit} loading={submitting}>
          Créer la leçon
        </Button>
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  )
}

function EditVideoUrlForm({
  lessonId,
  currentUrl,
  onDone,
  onCancel,
}: {
  lessonId: string
  currentUrl: string | null
  onDone: () => void
  onCancel: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const submit = async () => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`/api/admin/academy/lessons/${lessonId}/video`, {
        method: 'POST',
        body: formData,
      })
      const body = await res.json().catch(() => null)
      if (!res.ok) throw new Error(body?.message ?? 'Erreur.')

      toast.success('Vidéo mise en ligne.')
      onDone()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "L'upload a échoué.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mt-2 space-y-2">
      {currentUrl && !file && (
        <p className="text-xs text-text-muted">Une vidéo est déjà en ligne — en choisir une nouvelle la remplace.</p>
      )}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-secondary">Fichier vidéo (MP4, WebM, MOV)</label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1.5 block w-full text-sm text-text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-orbix-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-text-primary hover:file:bg-orbix-600"
          />
        </div>
        <Button variant="gradient" size="md" onClick={submit} loading={uploading} disabled={!file}>
          <Check className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="md" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {uploading && <p className="text-xs text-text-muted">Envoi en cours — peut prendre un moment selon la taille du fichier.</p>}
    </div>
  )
}

function EditContentForm({
  lessonId,
  currentContent,
  onDone,
  onCancel,
}: {
  lessonId: string
  currentContent: string | null
  onDone: () => void
  onCancel: () => void
}) {
  const [content, setContent] = useState(currentContent ?? '')
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/academy/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) throw new Error((await res.json())?.message ?? 'Erreur.')
      toast.success('Contenu mis à jour.')
      onDone()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-2 space-y-2">
      <Textarea
        label="Contenu (Markdown)"
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
      />
      <div className="flex gap-2">
        <Button variant="gradient" size="sm" onClick={submit} loading={submitting}>
          <Check className="h-4 w-4" /> Enregistrer
        </Button>
        <Button variant="secondary" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" /> Annuler
        </Button>
      </div>
    </div>
  )
}

function IntroVideoSection({ courseId, currentUrl }: { courseId: string; currentUrl: string | null }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const submit = async () => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`/api/admin/academy/courses/${courseId}/intro-video`, {
        method: 'POST',
        body: formData,
      })
      const body = await res.json().catch(() => null)
      if (!res.ok) throw new Error(body?.message ?? 'Erreur.')

      toast.success('Vidéo d’introduction mise en ligne.')
      setEditing(false)
      setFile(null)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "L'upload a échoué.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-text-primary">Vidéo d&apos;introduction du formateur</h3>
          <p className="mt-1 text-xs text-text-muted">
            {currentUrl
              ? 'Une vidéo est en ligne.'
              : 'Aucune vidéo pour l’instant — à défaut, la première leçon du premier module fait office d’intro.'}
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setEditing((v) => !v)}>
          <Pencil className="h-4 w-4" /> {currentUrl ? 'Remplacer' : 'Ajouter'}
        </Button>
      </div>

      {editing && (
        <div className="mt-4 flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-secondary">Fichier vidéo (MP4, WebM, MOV)</label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1.5 block w-full text-sm text-text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-orbix-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-text-primary hover:file:bg-orbix-600"
            />
          </div>
          <Button variant="gradient" size="md" onClick={submit} loading={uploading} disabled={!file}>
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="md" onClick={() => setEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}
