import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fad7a5',
          300: '#f6ba6d',
          400: '#f19332',
          500: '#ee7711',
          600: '#df5d07',
          700: '#b94408',
          800: '#93360e',
          900: '#772e0f',
        },
        komma: {
          black: '#1a1a1a',
          dark: '#2d2d2d',
          gray: '#6b7280',
          light: '#f5f5f4',
          white: '#fafaf9',
          accent: '#ee7711',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
