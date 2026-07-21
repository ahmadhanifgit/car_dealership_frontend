/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0b',
          900: '#101013',
          800: '#16161b',
          700: '#1d1d24',
          600: '#26262f',
          500: '#34343f',
          400: '#4a4a57',
          300: '#6b6b78',
          200: '#9a9aa6',
          100: '#c7c7cf',
          50: '#e9e9ee',
        },
        gold: {
          50: '#fbf7e9',
          100: '#f6edc6',
          200: '#efd98a',
          300: '#e8c155',
          400: '#e0aa2c',
          500: '#c9911a',
          600: '#a87214',
          700: '#855514',
          800: '#6d4417',
          900: '#5d3919',
        },
        crimson: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e23838',
          600: '#c1272d',
          700: '#9f1d24',
          800: '#7a1820',
          900: '#5a121a',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(16,16,19,0.06), 0 8px 24px -8px rgba(16,16,19,0.12)',
        lift: '0 2px 4px -2px rgba(16,16,19,0.08), 0 20px 40px -12px rgba(16,16,19,0.22)',
        glow: '0 0 0 1px rgba(224,170,44,0.25), 0 12px 32px -8px rgba(224,170,44,0.35)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.04)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
      },
      backgroundImage: {
        'grid-dark':
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
