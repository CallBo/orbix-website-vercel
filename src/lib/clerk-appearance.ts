// Thème Clerk aligné sur le design system Orbix (surfaces sombres, accent violet).
export const clerkAppearance = {
  variables: {
    colorPrimary: '#7b30ff',
    colorBackground: '#0d0d14',
    colorText: '#ffffff',
    colorTextSecondary: '#a0a0b8',
    colorInputBackground: '#12121c',
    colorInputText: '#ffffff',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-body)',
  },
  elements: {
    card: 'bg-surface-raised border border-surface-border shadow-card',
    headerTitle: 'font-display text-white',
    headerSubtitle: 'text-text-secondary',
    socialButtonsBlockButton: 'border border-surface-border hover:bg-surface-overlay',
    formButtonPrimary: 'bg-orbix-500 hover:bg-orbix-600 text-sm normal-case',
    footerActionLink: 'text-orbix-400 hover:text-orbix-300',
    formFieldInput: 'bg-surface-raised border-surface-border text-white',
    dividerLine: 'bg-surface-border',
    dividerText: 'text-text-muted',
  },
} as const
