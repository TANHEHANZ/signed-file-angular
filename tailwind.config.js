/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C52E65',
        background: '#F8F9FD',
        secondary: '#93A0DA',
        tertiary: '#C8CFEA',
        uploaded: '#4f46e5',
        processing: '#facc15',
        signed: '#22c55e',
        error: '#dc2626',
        validated: '#10b981',
        tampered: '#e11d48',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.bg-grid': {
          'background-color': '#3061bd',
          'opacity': '1',
          'background-image': 'radial-gradient(#444cf7 0.35px, #e6ecf3 0.35px)',
          'background-size': '7px 7px',
          'backdrop-filter': 'blur(10px)',
        },
      })
    },
  ],
}