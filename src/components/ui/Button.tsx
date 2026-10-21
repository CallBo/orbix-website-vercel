import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

// Boutons "pilule" façon apple.com : formes pleines et pleinement
// arrondies, pas de dégradés voyants ni de lueurs — juste un bleu Orbix
// plein, une transition douce et un léger effet d'échelle au clic.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight transition-all duration-200 ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orbix-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: ['bg-orbix-500 text-text-inverse', 'hover:bg-orbix-600', 'active:scale-[0.97]'],
        secondary: [
          'bg-surface-muted text-text-primary border border-surface-border',
          'hover:border-orbix-500/40 hover:bg-surface-overlay',
          'active:scale-[0.97]',
        ],
        ghost: ['text-text-secondary', 'hover:text-text-primary hover:bg-surface-overlay'],
        destructive: ['bg-error/10 text-error border border-error/20', 'hover:bg-error/20'],
        gradient: [
          'bg-orbix-500 text-text-inverse',
          'hover:bg-orbix-600 hover:scale-[1.015]',
          'active:scale-[0.97]',
        ],
        outline: [
          'border border-orbix-500/40 text-orbix-600',
          'hover:bg-orbix-50 hover:border-orbix-500',
        ],
      },
      size: {
        sm: 'h-8 px-3.5 text-sm rounded-full',
        md: 'h-10 px-5 text-sm rounded-full',
        lg: 'h-12 px-7 text-base rounded-full',
        xl: 'h-14 px-9 text-lg rounded-full',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
