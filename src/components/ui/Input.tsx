import * as React from 'react'
import { AlertCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">
            {label}
            {props.required && <span className="ml-1 text-error">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-xl border bg-surface-raised px-4 py-3',
              'font-body text-sm text-white placeholder:text-text-muted',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-orbix-500/50 focus:border-orbix-500',
              error ? 'border-error/50 focus:ring-error/30' : 'border-surface-border hover:border-surface-muted',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="flex items-center gap-1 text-xs text-error">
            <AlertCircle className="h-3 w-3" /> {error}
          </p>
        )}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
