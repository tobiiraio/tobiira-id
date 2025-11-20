import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tobiira-blue': {
          50: '#edf8ff',
          100: '#d6eeff',
          200: '#b5e3ff',
          300: '#83d3ff',
          400: '#48b9ff',
          500: '#1e97ff',
          600: '#0676ff',
          700: '#0062ff',  // Your brand color
          800: '#084bc5',
          900: '#0d439b',
          950: '#0e2a5d',
        },
      },
    },
  },
  plugins: [],
}

export default config