/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF7',
          100: '#FAF6EE',
          200: '#F5EEDB',
          300: '#EDE2C4',
          DEFAULT: '#FAF6EE',
        },
        cream: {
          50: '#FBF9F5',
          100: '#F7F2E8',
          200: '#EFE5D1',
          300: '#E5D6B6',
          DEFAULT: '#F7F2E8',
        },
        maroon: {
          50: '#F9EBEF',
          100: '#F2CDD7',
          200: '#E49BAF',
          300: '#D56987',
          400: '#A42749',
          500: '#7E1533',
          600: '#681029',
          700: '#540D22',
          800: '#40091A',
          900: '#2D0512',
          DEFAULT: '#681029',
        },
        wine: {
          50: '#FAF0F4',
          100: '#F3D9E5',
          500: '#6A1341',
          600: '#530E33',
          700: '#430A28',
          800: '#32061E',
          DEFAULT: '#530E33',
        },
        gold: {
          50: '#FDFBF0',
          100: '#FAF5D8',
          200: '#F3E8A8',
          300: '#E8D46F',
          400: '#DCBE3F',
          500: '#C5A028',
          600: '#A3811B',
          700: '#806313',
          DEFAULT: '#C5A028',
        },
        darkbrown: {
          50: '#F7F4F2',
          100: '#EBE2DC',
          500: '#4A3328',
          700: '#332118',
          800: '#24160F',
          900: '#170E09',
          DEFAULT: '#24160F',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 8px -2px rgba(197, 160, 40, 0.2)',
        'gold-md': '0 4px 16px -2px rgba(197, 160, 40, 0.25)',
        'luxury': '0 10px 30px -5px rgba(44, 26, 18, 0.08), 0 0 0 1px rgba(197, 160, 40, 0.15)',
      }
    },
  },
  plugins: [],
}
