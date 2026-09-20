'use client'

import { useEffect, useRef } from 'react'

interface AmbientVideoProps {
  src: string
  poster: string
  className?: string
}

// Boucle vidéo muette pour habiller une page — ne joue pas si la personne a
// demandé "réduire les animations" au niveau système ; affiche alors le poster.
export function AmbientVideo({ src, poster, className }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      ref.current?.play().catch(() => {})
    }
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
