/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#050816",
          card: "#0B1120",
          blue: "#00E5FF",
          purple: "#7C3AED",
          pink: "#EC4899",
        },
      },

      boxShadow: {
        cyber:
          "0 0 25px rgba(0,229,255,0.18)",

        purple:
          "0 0 25px rgba(124,58,237,0.28)",
      },

      backdropBlur: {
        xs: "2px",
      },

      animation: {
        float:
          "float 4s ease-in-out infinite",

        glow:
          "glow 2s ease-in-out infinite alternate",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-6px)",
          },
        },

        glow: {
          from: {
            boxShadow:
              "0 0 10px rgba(0,229,255,0.2)",
          },

          to: {
            boxShadow:
              "0 0 20px rgba(0,229,255,0.45)",
          },
        },
      },
    },
  },

  plugins: [],
};