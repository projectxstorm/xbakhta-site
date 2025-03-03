import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#6B46C1',
        'electric-blue': '#3B82F6',
        'neon-green': '#4ADE80',
        'dark-gray': '#1A202C',
        'navy-blue': '#1E3A8A',
        'warning-orange': '#F97316',
        'danger-red': '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        chakra: ['var(--font-chakra)'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config;
