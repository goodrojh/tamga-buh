/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: '#0A1A33', 2: '#0F2547', 3: '#16305B' },
        gold: { DEFAULT: '#D9A93B', light: '#F0C96A', dark: '#B8891F' },
        sand: { DEFAULT: '#F6F1E7', 2: '#EDE4D2' },
        ink: '#121826',
        steppe: '#2E9E6B',
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 30px 80px -20px rgba(10,26,51,0.35)',
        gold: '0 12px 40px -10px rgba(217,169,59,0.45)',
      },
    },
  },
  plugins: [],
}
