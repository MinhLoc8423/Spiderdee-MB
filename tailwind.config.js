/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        GeneralBold: ["GeneralSans-Bold", "sans-serif"],
        GeneralBoldItalic: ["GeneralSans-BoldItalic", "sans-serif"],
        GeneralExtralight: ["GeneralSans-Extralight", "sans-serif"],
        GeneralExtralightItalic: ["GeneralSans-ExtralightItalic", "sans-serif"],
        GeneralItalic: ["GeneralSans-Italic", "sans-serif"],
        GeneralLight: ["GeneralSans-Light", "sans-serif"],
        GeneralLightItalic: ["GeneralSans-LightItalic", "sans-serif"],
        GeneralMedium: ["GeneralSans-Medium", "sans-serif"],
        GeneralMediumItalic: ["GeneralSans-MediumItalic", "sans-serif"],
        GeneralRegular: ["GeneralSans-Regular", "sans-serif"],
        GeneralSemibold: ["GeneralSemibold", "sans-serif"],
        GeneralSemiboldItalic: ["GeneralSans-SemiboldItalic", "sans-serif"],
      },
      colors: {
        primary: {
          0: "#FFFFFF",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
        },
        success: "#0C9409",
        danger: "#ED1010"
      },
    },
  },
  plugins: [],
}

