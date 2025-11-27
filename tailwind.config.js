export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a"
        },
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63"
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A0F1C 0%, #0D1726 50%, #0A0F1C 100%)',
      },
      boxShadow: {
        'brand-glow': '0 0 20px rgba(45,212,191,0.3)',
        'brand-hover': '0 10px 30px rgba(45,212,191,0.3)',
      },
    }
  },
  plugins: []
}
