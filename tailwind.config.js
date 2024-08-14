/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { min: "375px", max: "1400px" },
    },
    extend: {
      colors: {
        darkViolet: "hsl(257, 27%, 26%)",
      },
    },
  },
  plugins: [],
};
