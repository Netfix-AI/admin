/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'Consolas', 'monospace'],
      },
      colors: {
        graphite: {
          950: '#04060A',
          900: '#07090F',
          850: '#0C101A',
          800: '#111624',
          700: '#1A2133',
          600: '#252F48',
        },
        admin: {
          teal: '#20E0C2',
          indigo: '#7567FF',
          blue: '#4DA3FF',
          green: '#35D49A',
          amber: '#F5B94C',
          rose: '#FF6174',
        }
      },
      boxShadow: {
        'admin-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
        'teal-glow': '0 0 25px rgba(32, 224, 194, 0.35)',
        'indigo-glow': '0 0 25px rgba(117, 103, 255, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'sweep': 'sweep 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}

