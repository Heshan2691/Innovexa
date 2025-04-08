import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A3E72', // Midnight Blue
        secondary: '#00AEEF', // Vitality Cyan
        tertiary: '#47B881', // Lime Green
        deepSlate: '#1A2526',
        steelGray: '#6B7280',
        cloudWhite: '#F9FAFB',
        brightWhite: '#FFFFFF',
      },
    },
  },
  plugins: [],
};

export default config;