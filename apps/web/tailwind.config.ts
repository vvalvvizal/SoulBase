/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../libs/ui/**/*.{ts,tsx}',
  ],
  presets: [require('../../libs/ui/tailwind.config.ts')],
};
export default config;
