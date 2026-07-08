/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dom: "#050B14",     // 60% Dominant (Deep Cinematic Slate)
        sec: "#1A2332",     // 30% Secondary (Frosted Muted Slate)
        acc: "#00E5FF",     // 10% Accent (Premium Medical Teal/Cyan)
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
