/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "cursive"], 
        pacifico: ['Pacifico', 'cursive'],
          poppins: ['Poppins', 'sans-serif']

      },
    },
  },
  plugins: [],
}
