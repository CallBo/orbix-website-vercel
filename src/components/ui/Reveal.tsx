'use client'

import { motion, type Variants } from 'framer-motion'

// Révélation douce au scroll, façon apple.com : léger fondu + montée,
// déclenchée une seule fois quand l'élément entre dans le viewport.
// Centralisé ici pour que chaque section du site anime de la même façon.
const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
