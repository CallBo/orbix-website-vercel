import * as React from 'react'

import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-surface-border bg-surface-raised p-6',
        'transition-all duration-300',
        hover && 'cursor-pointer hover:-translate-y-0.5 hover:border-orbix-500/30 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
