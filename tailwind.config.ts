import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.teal[600],
          DEFAULT: colors.teal[800],
          dark: colors.teal[900],
        },
        secondary: {
          light: colors.purple[600],
          DEFAULT: colors.purple[800],
          dark: colors.purple[900],
        },
        accent: {
          light: colors.red[400],
          DEFAULT: colors.red[600],
          dark: colors.red[800],
        },
        neutral: {
          50: colors.gray[50],
          100: colors.gray[100],
          200: colors.gray[200],
          300: colors.gray[300],
          700: colors.gray[700],
          800: colors.gray[800],
          900: colors.gray[900],
          950: colors.gray[950],
        },
      },
    },
  },
  plugins: [],
};
export default config;
