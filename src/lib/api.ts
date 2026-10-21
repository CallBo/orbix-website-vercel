// src/lib/api.ts
// Point d'entrée unique pour tous les appels vers api.orbixlabs.tech.
// Les composants n'appellent jamais fetch() directement — ils passent par ici.

import { auth } from '@clerk/nextjs/server'
import { API_URL } from './constants'
import type { ProjectStatus } from '@/types'

interface ApiError {
  message: string
  statusCode: number
}

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { getToken } = await auth()
  const token = await getToken()

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiError | null
    throw new Error(body?.message ?? `Erreur API (${response.status})`)
  }

  return response.json() as Promise<T>
}

// ── CONTACT / DEVIS ─────────────────────────────────────────
export interface QuoteRequestPayload {
  name: string
  email: string
  company?: string
  service: string
  message: string
}

export const contactApi = {
  submitQuoteRequest: (payload: QuoteRequestPayload) =>
    apiCall<{ success: boolean }>('/v1/leads/quote-request', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

// ── DEMANDES (devis + liste d'attente app Orbix) — staff uniquement ─────
// Les inscriptions à la liste d'attente sont stockées dans la même table
// que les devis, repérées par WAITLIST_SERVICE_PREFIX dans `service`
// (même constante côté orbix-api, leads.schema.ts). Pour une inscription,
// `email` contient l'e-mail OU le numéro WhatsApp.
export const WAITLIST_SERVICE_PREFIX = "Liste d'attente app Orbix"

export interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  service: string
  message: string
  createdAt: string
}

export const leadsApi = {
  list: () => apiCall<{ success: boolean; data: Lead[] }>('/v1/leads'),
}

// ── BLOG ─────────────────────────────────────────────────────
// Miroir des routes /v1/blog côté orbix-api. Tant que la base Azure
// n'existe pas, ces appels échoueront — les pages appelantes doivent gérer
// l'échec proprement (voir blog/page.tsx) plutôt que planter.
export type BlogPostStatus = 'BROUILLON' | 'PUBLIE' | 'ARCHIVE'

export interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  coverImage: string | null
  status: BlogPostStatus
  publishedAt: string | null
  createdAt: string
}

export interface CreateBlogPostPayload {
  title: string
  content: string
  coverImage?: string
}

export interface UpdateBlogPostPayload {
  title?: string
  content?: string
  coverImage?: string
  status?: BlogPostStatus
}

export const blogApi = {
  listPublished: () => apiCall<{ success: boolean; data: BlogPost[] }>('/v1/blog'),
  getBySlug: (slug: string) => apiCall<{ success: boolean; data: BlogPost }>(`/v1/blog/${slug}`),
  listAllForAdmin: () => apiCall<{ success: boolean; data: BlogPost[] }>('/v1/blog/admin/all'),
  create: (payload: CreateBlogPostPayload) =>
    apiCall<{ success: boolean; data: BlogPost }>('/v1/blog/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id: string, payload: UpdateBlogPostPayload) =>
    apiCall<{ success: boolean; data: BlogPost }>(`/v1/blog/admin/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
}

// ── PROJECTS ─────────────────────────────────────────────────
export interface ApiProject {
  id: string
  title: string
  description: string | null
  status: string
  progress: number
  startDate: string | null
  endDate: string | null
  amount: number | null
  client?: { id: string; name: string; email: string }
}

export const projectsApi = {
  listMine: () => apiCall<{ success: boolean; data: ApiProject[] }>('/v1/projects/me'),
  listAll: () => apiCall<{ success: boolean; data: ApiProject[] }>('/v1/projects'),
  findOne: (id: string) => apiCall<{ success: boolean; data: ApiProject }>(`/v1/projects/${id}`),
  create: (payload: { clientId: string; title: string; description?: string; amount?: number; startDate?: string; endDate?: string }) =>
    apiCall<{ success: boolean; data: ApiProject }>('/v1/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (
    id: string,
    payload: Partial<{
      title: string
      description: string
      status: string
      progress: number
      amount: number
      endDate: string
    }>
  ) =>
    apiCall<{ success: boolean; data: ApiProject }>(`/v1/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
}

// ProjectProgressCard (composant partagé dashboard/admin) attend le type
// `Project` de src/types (hérité de la V1 en données factices, champs non
// nullables). L'API renvoie des null légitimes (projet sans description,
// sans budget saisi...) — on normalise ici plutôt que de complexifier le
// composant d'affichage ou d'assouplir un type partagé par tout le reste
// du code.
export function toClientProject(p: ApiProject) {
  return {
    id: p.id,
    title: p.title,
    description: p.description ?? '',
    status: p.status as ProjectStatus,
    progress: p.progress,
    startDate: p.startDate ?? '',
    endDate: p.endDate ?? undefined,
    amount: p.amount ?? 0,
  }
}

// ── INVOICES ─────────────────────────────────────────────────
export interface ApiInvoice {
  id: string
  number: string
  amount: number
  status: 'EN_ATTENTE' | 'PAYEE' | 'EN_RETARD' | 'ANNULEE'
  dueDate: string
  paidAt: string | null
  client?: { id: string; name: string; email: string }
}

export const invoicesApi = {
  listMine: () => apiCall<{ success: boolean; data: ApiInvoice[] }>('/v1/invoices/me'),
  listAll: () => apiCall<{ success: boolean; data: ApiInvoice[] }>('/v1/invoices'),
  create: (payload: { clientId: string; projectId?: string; amount: number; dueDate: string }) =>
    apiCall<{ success: boolean; data: ApiInvoice }>('/v1/invoices', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

// ── USERS (admin) ────────────────────────────────────────────
export interface ApiClient {
  id: string
  name: string
  email: string
  company: string | null
  createdAt: string
  projectsCount: number
  totalBilled: number
}

export const usersApi = {
  listClients: () => apiCall<{ success: boolean; data: ApiClient[] }>('/v1/users'),
}

// ── MESSAGES ─────────────────────────────────────────────────
export interface ApiMessage {
  id: string
  content: string
  senderId: string
  createdAt: string
  readAt: string | null
  sender?: { id: string; name: string; role: string }
}

export const messagesApi = {
  listForProject: (projectId: string) =>
    apiCall<{ success: boolean; data: ApiMessage[] }>(`/v1/messages/project/${projectId}`),
  send: (projectId: string, content: string) =>
    apiCall<{ success: boolean; data: ApiMessage }>('/v1/messages', {
      method: 'POST',
      body: JSON.stringify({ projectId, content }),
    }),
}

// ── ORBIX AI ─────────────────────────────────────────────────
export const aiTutorApi = {
  chat: (message: string, conversationId?: string) =>
    apiCall<{ success: boolean; data: { message: string; conversationId: string } }>('/v1/ai-tutor/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversationId }),
    }),
}

// ── PAYMENTS ─────────────────────────────────────────────────
export const paymentsApi = {
  stripeCheckout: (invoiceId: string) =>
    apiCall<{ success: boolean; data: { checkoutUrl: string } }>(`/v1/payments/stripe/checkout/${invoiceId}`, {
      method: 'POST',
    }),
  fedaPayCheckout: (invoiceId: string) =>
    apiCall<{ success: boolean; data: { checkoutUrl: string } }>(`/v1/payments/fedapay/checkout/${invoiceId}`, {
      method: 'POST',
    }),
}

// ── NOTIFICATIONS ────────────────────────────────────────────
export interface ApiNotification {
  id: string
  content: string
  createdAt: string
  projectId: string | null
}

export const notificationsApi = {
  listUnread: () => apiCall<{ success: boolean; data: ApiNotification[] }>('/v1/notifications/me'),
  markRead: (id: string) =>
    apiCall<{ success: boolean }>(`/v1/notifications/${id}/read`, { method: 'PATCH' }),
}

// ── ACADEMY (admin — gestion du contenu) ────────────────────────
// L'API expose aussi des routes publiques /v1/academy/courses (catalogue)
// consommées par orbix-academy directement, pas par ce site — ici on
// n'a besoin que du côté administration (créer/éditer cours, modules,
// leçons) puisque c'est orbix-website qui héberge cette interface.
export type AcademyCourseCategory = 'IA' | 'PROGRAMMATION' | 'CLOUD' | 'SECURITE' | 'AUTOMATISATION'
export type AcademyCourseLevel = 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE'
export type AcademyLessonType = 'VIDEO' | 'QUIZ' | 'PROJET' | 'TEXTE'

export interface AcademyLesson {
  id: string
  title: string
  type: AcademyLessonType
  videoUrl: string | null
  duration: number | null
  order: number
  content: string | null
  quiz: unknown
}

export interface AcademyModule {
  id: string
  title: string
  order: number
  lessons: AcademyLesson[]
}

export interface AcademyCourse {
  id: string
  slug: string
  title: string
  description: string
  category: AcademyCourseCategory
  level: AcademyCourseLevel
  isFree: boolean
  price: number
  thumbnailUrl: string | null
  introVideoUrl: string | null
  published: boolean
  modules: AcademyModule[]
}

export interface CreateAcademyCourseDto {
  slug: string
  title: string
  description: string
  category: AcademyCourseCategory
  level: AcademyCourseLevel
  isFree: boolean
  price: number
  thumbnailUrl?: string
  introVideoUrl?: string
}

export const academyAdminApi = {
  listAll: () => apiCall<{ success: boolean; data: AcademyCourse[] }>('/v1/academy/courses/admin/all'),
  createCourse: (payload: CreateAcademyCourseDto) =>
    apiCall<{ success: boolean; data: AcademyCourse }>('/v1/academy/courses', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateCourse: (id: string, payload: Partial<CreateAcademyCourseDto>) =>
    apiCall<{ success: boolean; data: AcademyCourse }>(`/v1/academy/courses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  setPublished: (id: string, published: boolean) =>
    apiCall<{ success: boolean; data: AcademyCourse }>(`/v1/academy/courses/${id}/publish`, {
      method: 'PATCH',
      body: JSON.stringify({ published }),
    }),
  createModule: (courseId: string, payload: { title: string; order: number }) =>
    apiCall<{ success: boolean; data: AcademyModule }>(`/v1/academy/courses/${courseId}/modules`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  createLesson: (
    moduleId: string,
    payload: {
      title: string
      type: AcademyLessonType
      videoUrl?: string
      duration?: number
      order: number
      content?: string
    }
  ) =>
    apiCall<{ success: boolean; data: AcademyLesson }>(`/v1/academy/courses/modules/${moduleId}/lessons`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateLesson: (
    lessonId: string,
    payload: Partial<{ title: string; videoUrl: string; duration: number; content: string }>
  ) =>
    apiCall<{ success: boolean; data: AcademyLesson }>(`/v1/academy/courses/lessons/${lessonId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
}