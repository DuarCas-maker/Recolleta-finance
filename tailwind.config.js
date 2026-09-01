/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"]
  },
  theme: {
    extend: {
      colors: {
        primary: "#085D54",
        ink: "#202C33",
        aqua: "#6BAFA8",
        background: "#E7F1F0",
        slate: "#536E76",
        accent: "#6BAFA8",
        mist: "#E7F1F0",
        white: "#FFFFFF"
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        "ink/6": "0 14px 45px rgba(32, 44, 51, 0.06)",
        "ink/8": "0 18px 60px rgba(32, 44, 51, 0.08)",
        "ink/18": "0 20px 55px rgba(8, 93, 84, 0.18)"
      }
    }
  },
  plugins: []
};
