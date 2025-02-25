const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        text: "#040316", // Texto claro
        background: "#fbfbfe", // Fondo claro
        primary: "#2f27ce", // Azul claro
        secondary: "#dddbff",
        accent: "#443dff",
        cards: "#F3F3F6",
        select: "#EBEBEE",

        // Colores en modo oscuro
        dark: {
          text: "#eae9fc",
          background: "#010104",
          primary: "#3a31d8",
          secondary: "#020024",
          accent: "#0600c2",
          cards: "#09090C",
          select: "#111114",
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite-typography'),
  ],
};
