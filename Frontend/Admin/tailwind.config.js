// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        neon: {
          pink: '#ff00f7',
          blue: '#00f0ff',
          green: '#39ff14',
        },
        dark: '#0d0d0d',
      },
    },
  },
  darkMode: 'class', // Enables class-based dark mode
  plugins: [],
};
