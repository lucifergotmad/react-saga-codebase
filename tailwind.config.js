import flowbite from 'flowbite-react/tailwind';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-security-disc': {
          '-webkit-text-security': 'disc',
        },
        '.text-security-circle': {
          '-webkit-text-security': 'circle',
        },
        '.text-security-square': {
          '-webkit-text-security': 'square',
        },
        '.text-security-none': {
          '-webkit-text-security': 'none',
        },
      });
    }),
  ],
};
