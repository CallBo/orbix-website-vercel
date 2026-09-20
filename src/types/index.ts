export type UserRole = 'client' | 'manager' | 'admin' | 'super_admin'

export interface OrbixUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export type ProjectStatus =
  | 'NOUVEAU'
  | 'EN_ATTENTE_DE_BRIEF'
  | 'BRIEF_RECU'
  | 'EN_COURS'
  | 'REVISION'
  | 'LIVRAISON'
  | 'TERMINE'
  | 'ARCHIVE'

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  progress: number
  startDate: string
  endDate?: string
  amount: number
}
