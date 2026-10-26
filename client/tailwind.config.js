/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#030712',
          surface: '#070C1E',
          card: '#0B1129',
          border: '#152042',
          hover: '#19264E'
        },
        lumine: {
          base: '#030712',
          surface: '#070C1E',
          card: '#0A1028',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: '#38BDF8',
          accent: '#60A5FA',
          cyan: '#38BDF8',
          blue: '#2563EB',
          indigo: '#6366F1'
        },
        ai: {
          primary: '#60A5FA',
          secondary: '#818CF8',
          cyan: '#38BDF8',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-primary': '0 0 35px -5px rgba(96, 165, 250, 0.4)',
        'glow-cyan': '0 0 35px -5px rgba(56, 189, 248, 0.4)',
        'glow-white': '0 0 25px 0 rgba(255, 255, 255, 0.3)',
        'celestial': '0 -15px 40px rgba(56, 189, 248, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}
