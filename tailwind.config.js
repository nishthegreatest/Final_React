/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}", // Adjust for your project structure
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // Named custom key
        "custom-layout": "auto auto 1fr",
        // Arbitrary value version (optional, works without defining)
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [],
};
