/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f3',
          100: '#e9ecdf',
          200: '#d3d9c1',
          300: '#b4c09a',
          400: '#93a574',
          500: '#768b56',
          600: '#5e6f43',
          700: '#4a5637',
          800: '#3d462f',
          900: '#343c2a',
          950: '#1a1f15',
        },
      },
    },
  },
  plugins: [],
}
