/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F3F1EC',
          paper: '#FAF8F5',
          subtle: '#EDE9E2',
          muted: '#E4DFD6',
        },
        charcoal: {
          DEFAULT: '#141312',
          heading: '#0F0E0D',
          muted: '#4A4641',
          subtle: '#78736B',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#DFC07A',
          dark: '#A6823E',
          deep: '#8A682A',
          shimmer: '#FBF0CE',
        },
        border: {
          hairline: '#E3DDD4',
          subtle: '#D6CFC4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest: '0.15em',
        caps: '0.2em',
      },
      animation: {
        'shimmer': 'shimmer 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}
