const { colorsConfig } = require('./utils/styles/config');

module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: colorsConfig,
      borderRadius: {
        default: '2px',
      },
    },
  },
};
