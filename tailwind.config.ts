import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ─── COULEURS ─────────────────────────────────────────
      colors: {
        orbix: {
          50: '#f3f0ff',
          100: '#e9e3ff',
          200: '#d4cbff',
          300: '#b8a5ff',
          400: '#9b7bff',
          500: '#7b30ff',
          600: '#6b1fe8',
          700: '#5a12c9',
          800: '#4a0fa4',
          900: '#3d0e85',
        },
        violet: {
          500: '#a855f7',
        },
        cyan: {
          400: '#00d4ff',
        },
        surface: {
          base: '#0a0a0f',
          raised: '#0d0d14',
          overlay: '#12121c',
          border: '#1a1a2e',
          muted: '#1e1e30',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0b8',
          muted: '#6b6b80',
          disabled: '#3a3a4a',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },

      // ─── TYPOGRAPHIE ──────────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', ...fontFamily.sans],
        body: ['var(--font-body)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
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
      boxShadow: {
        'glow-purple': '0 0 20px rgba(123, 48, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(123, 48, 255, 0.2)',
        modal: '0 25px 60px rgba(0, 0, 0, 0.8)',
      },

      // ─── ANIMATIONS ───────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(123, 48, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(123, 48, 255, 0.6)' },
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
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        orbit: 'orbit 8s linear infinite',
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
