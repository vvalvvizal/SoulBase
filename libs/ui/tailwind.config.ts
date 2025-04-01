import type { Config } from 'tailwindcss';
import { colorsConfig } from './utils/styles/config';
const config: Config = {
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: colorsConfig,
    extend: {
      borderRadius: {
        default: '2px',
      },
    },
  },
};

export default config;
