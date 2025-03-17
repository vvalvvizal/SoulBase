import type { Config } from 'tailwindcss';
import uiConfig from '../../libs/ui/tailwind.config';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', '../../libs/ui/**/*.{ts,tsx}'],
  presets: [uiConfig as Config],
};
export default config;
