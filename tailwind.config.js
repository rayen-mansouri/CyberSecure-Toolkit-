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
        // Hacker/Terminal Theme Colors
        terminal: {
          black: '#0D0208',      // Deep black background
          dark: '#1a1a2e',       // Dark blue-black
          darker: '#0f0f1e',     // Even darker
          green: '#00ff41',      // Matrix green (primary)
          'green-dark': '#00cc33', // Darker matrix green
          cyan: '#00d9ff',       // Neon cyan
          purple: '#b026ff',     // Neon purple
          pink: '#ff006e',       // Neon pink
          red: '#ff0a54',        // Danger red
          yellow: '#ffbe0b',     // Warning yellow
          orange: '#fb5607',     // Orange accent
        },
        matrix: {
          50: '#e6ffe6',
          100: '#b3ffb3',
          200: '#80ff80',
          300: '#4dff4d',
          400: '#1aff1a',
          500: '#00ff41',        // Main matrix green
          600: '#00cc33',
          700: '#009926',
          800: '#006619',
          900: '#00330d',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        terminal: ['Courier New', 'Consolas', 'Monaco', 'monospace'],
        cyber: ['Orbitron', 'sans-serif'], // We'll add this font
      },
      boxShadow: {
        'neon-green': '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
        'neon-cyan': '0 0 10px #00d9ff, 0 0 20px #00d9ff, 0 0 30px #00d9ff',
        'neon-purple': '0 0 10px #b026ff, 0 0 20px #b026ff, 0 0 30px #b026ff',
        'neon-pink': '0 0 10px #ff006e, 0 0 20px #ff006e',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 3s linear infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        glow: {
          'from': { 
            textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41',
          },
          'to': { 
            textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41',
          },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0' },
          '43%': { opacity: '0' },
          '43.01%': { opacity: '1' },
          '47.99%': { opacity: '1' },
          '48%': { opacity: '0' },
          '49%': { opacity: '0' },
          '49.01%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}