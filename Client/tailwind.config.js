/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },

      letterSpacing: {
        '2': '2px',
        '3': '3px',
        '4': '3px',
      },

      colors: {
        primary: '#1D4ED8',
        'hover-primary': '#1E40AF',
        'dark-primary': '#121212',
        'dark-secondary': '#232323',
        
        black: {
          DEFAULT: '#000000',
          '100': '#111111',
          '200': '#222222',
          '300': '#333333',
        }
      },

      width: {
        '3/4': '75%'
      },

      maxWidth: {
        '3/4': '75%'
      },

      minWidth: {
        '3/4': '75%'
      }
    },
  },

  plugins: [
    
  ],
}

