/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../libs/ui/src/**/*.{ts,tsx}', //라이브러리 컴포넌트들 포함
  ],

  presets: [require('../../libs/ui/tailwind.config.js')], //preset으로 가져옴
};
export default config;
