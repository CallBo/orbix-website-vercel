import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orbix: {
          300: '#b89aff',
          400: '#9b6fff',
          500: '#7b30ff',
          600: '#6b1fe8',
          700: '#5a12c9',
        },
        surface: {
          base:    '#0a0a0f',
          raised:  '#0d0d14',
          overlay: '#12121c',
          border:  '#1a1a2e',
          muted:   '#1e1e30',
        },
        text: {
          primary:   '#ffffff',
          secondary: '#a0a0b8',
          muted:     '#6b6b80',
          disabled:  '#3a3a4a',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(123,48,255,0.3)',
        'glow-cyan':   '0 0 20px rgba(0,212,255,0.3)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 40px rgba(123,48,255,0.2)',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        shimmer:   'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
