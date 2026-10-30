/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vyrox: {
          950: '#070708',
          900: '#0d0d0f',
          850: '#131317',
          800: '#1b1b22',
          700: '#272732',
          red: '#dc2626',
          crimson: '#ef4444',
          darkred: '#991b1b',
          glow: 'rgba(220, 38, 38, 0.45)',
          silver: '#f5f5f5',
          muted: '#8f94a0'
        }
      },
      fontFamily: {
        athletic: ['Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'crimson-sm': '0 0 10px rgba(220, 38, 38, 0.25)',
        'crimson': '0 0 25px rgba(220, 38, 38, 0.4)',
        'crimson-lg': '0 0 45px rgba(220, 38, 38, 0.55)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

