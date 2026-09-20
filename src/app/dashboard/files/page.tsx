import type { Metadata } from 'next'
import { FileStack } from 'lucide-react'

import { ComingSoon } from '@/components/dashboard/ComingSoon'

export const metadata: Metadata = { title: 'Mes fichiers' }

export default function FilesPage() {
  return (
    <ComingSoon
      icon={FileStack}
      title="Mes fichiers"
      description="Upload, prévisualisation et téléchargement de vos livrables — arrive avec le stockage Azure Blob Storage côté orbix-api."
    />
  )
}
