// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#f5f7ff',
//           100: '#ebf0ff',
//           200: '#d6e0ff',
//           300: '#b3c7ff',
//           400: '#8da8ff',
//           500: '#667eea',
//           600: '#5568d3',
//           700: '#4451b8',
//           800: '#333d94',
//           900: '#262d70',
//         },
//         secondary: {
//           500: '#764ba2',
//           600: '#6a4391',
//           700: '#5e3b80',
//         }
//       },
//       animation: {
//         'spin-slow': 'spin 3s linear infinite',
//       }
//     },
//   },
//   plugins: [],
// }




/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#b3c7ff',
          400: '#8da8ff',
          500: '#3c6fa4',
          600: '#2e5b8a',
          700: '#244a70',
          800: '#333d94',
          900: '#262d70',
        },
        secondary: {
          500: '#764ba2',
          600: '#6a4391',
          700: '#5e3b80',
        }
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(25px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.9s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
  
};
