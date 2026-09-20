import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orbix-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: ['bg-orbix-500 text-white', 'hover:bg-orbix-600 hover:shadow-glow-purple', 'active:scale-[0.98]'],
        secondary: [
          'bg-surface-muted text-white border border-surface-border',
          'hover:border-orbix-500/50 hover:bg-surface-overlay',
          'active:scale-[0.98]',
        ],
        ghost: ['text-text-secondary', 'hover:text-white hover:bg-surface-overlay'],
        destructive: ['bg-error/10 text-error border border-error/20', 'hover:bg-error/20'],
        gradient: [
          'bg-gradient-to-r from-orbix-500 to-violet-500 text-white',
          'hover:shadow-glow-purple hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        outline: [
          'border border-orbix-500/50 text-orbix-400',
          'hover:bg-orbix-500/10 hover:border-orbix-500',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-12 px-6 text-base rounded-xl',
        xl: 'h-14 px-8 text-lg rounded-xl',
        icon: 'h-10 w-10 rounded-lg',
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
