import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm earth tones
        sage: {
          50: '#f4f6f4',
          100: '#e8ebe7',
          200: '#d1d8cf',
          300: '#b0bcad',
          400: '#8b9388',
          500: '#6b7566',
          600: '#5f6f65',
          700: '#4d5a51',
          800: '#3f4a42',
          900: '#363d37',
        },
        forest: {
          50: '#f3f5f3',
          100: '#e4e8e4',
          200: '#cad2ca',
          300: '#a8b5a8',
          400: '#7d8d7d',
          500: '#5f6f5f',
          600: '#4a5a4a',
          700: '#3a4a3a',
          800: '#2f3e2f',
          900: '#283528',
        },
        warm: {
          50: '#fafaf8',
          100: '#f8f7f4',
          200: '#f0efea',
          300: '#e8e6df',
          400: '#d4d1c8',
          500: '#a8a49a',
          600: '#78756c',
          700: '#5a574f',
          800: '#2b2826',
          900: '#1c1917',
        },
        terracotta: {
          50: '#fdf6f3',
          100: '#fbeee8',
          200: '#f5d5c6',
          300: '#ebb89d',
          400: '#d98f6b',
          500: '#c67b5c',
          600: '#b85c38',
          700: '#9a4d2e',
          800: '#7f4129',
          900: '#693726',
        },
        amber: {
          50: '#fdfcfa',
          100: '#faf6ef',
          200: '#f4ebda',
          300: '#ebdcc0',
          400: '#ddc49f',
          500: '#d4a574',
          600: '#c49a6c',
          700: '#a8805a',
          800: '#8a694b',
          900: '#70563d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-epilogue)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.5' }],    // 13px
        'sm': ['0.875rem', { lineHeight: '1.6' }],     // 14px
        'base': ['1rem', { lineHeight: '1.7' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.6' }],     // 18px
        'xl': ['1.25rem', { lineHeight: '1.8' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],      // 24px
        '3xl': ['1.75rem', { lineHeight: '1.3' }],     // 28px
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
