const { colorsConfig } = require('./utils/styles/config');
const { safelist } = require('./utils/styles/safelist-tailwindcss');
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist,
  theme: {
    extend: {
      colors: colorsConfig,
      borderRadius: {
        default: '2px',
      },
    },
  },
};
