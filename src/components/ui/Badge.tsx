import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-full font-medium text-xs', {
  variants: {
    variant: {
      default: 'bg-surface-muted text-text-secondary',
      primary: 'bg-orbix-500/15 text-orbix-400 border border-orbix-500/20',
      success: 'bg-success/10 text-success border border-success/20',
      warning: 'bg-warning/10 text-warning border border-warning/20',
      error: 'bg-error/10 text-error border border-error/20',
      info: 'bg-info/10 text-info border border-info/20',
      cyan: 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
