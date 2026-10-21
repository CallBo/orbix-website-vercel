import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ─── COULEURS ─────────────────────────────────────────
      // Palette claire et minimaliste (identité "Engineering Tomorrow" :
      // anneau orbital bleu + sphère argentée). Le bleu Orbix remplace le
      // violet d'origine comme unique couleur de marque ; le reste du site
      // est en niveaux de gris quasi neutres, dans l'esprit apple.com.
      colors: {
        orbix: {
          50: '#eef4ff',
          100: '#dbe7ff',
          200: '#b8d0ff',
          300: '#8ab1ff',
          400: '#5790ff',
          500: '#2f6fed',
          600: '#1f56d1',
          700: '#1942a8',
          800: '#173686',
          900: '#152f6b',
        },
        ink: {
          900: '#000000',
          800: '#0b0b0c',
          700: '#1d1d1f',
        },
        surface: {
          base: '#ffffff',
          raised: '#fbfbfd',
          overlay: '#f5f5f7',
          border: '#d2d2d7',
          muted: '#e8e8ed',
        },
        text: {
          primary: '#1d1d1f',
          secondary: '#6e6e73',
          muted: '#86868b',
          disabled: '#c7c7cc',
          inverse: '#ffffff',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#2f6fed',
      },

      // ─── TYPOGRAPHIE ──────────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', ...fontFamily.sans],
        body: ['var(--font-body)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
        tight: '-0.015em',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },

      // ─── ESPACEMENT ───────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // ─── BORDURES ─────────────────────────────────────────
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // ─── OMBRES ───────────────────────────────────────────
      // Ombres douces et peu contrastées (esprit apple.com : la profondeur
      // vient du flou, pas de la couleur).
      boxShadow: {
        'glow-orbix': '0 0 24px rgba(47, 111, 237, 0.25)',
        subtle: '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.03)',
        card: '0 2px 10px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 48px rgba(0, 0, 0, 0.12)',
        modal: '0 25px 60px rgba(0, 0, 0, 0.25)',
        nav: '0 1px 0 rgba(0, 0, 0, 0.06)',
      },

      // ─── ANIMATIONS ───────────────────────────────────────
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'apple-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(47, 111, 237, 0.25)' },
          '50%': { boxShadow: '0 0 26px rgba(47, 111, 237, 0.5)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in': 'slide-in 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        orbit: 'orbit 10s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },

      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

export default config
