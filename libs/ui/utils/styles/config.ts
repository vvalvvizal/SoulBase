import colors = require('tailwindcss/colors');

const yellowPallete = {
  DEFAULT: 'hsl(52,100%,50%)',
  25: 'hsl(51,97%,98%)',
  50: 'hsl(51,97%,92%)',
  100: 'hsl(51,97%,84%)',
  200: 'hsl(51,97%,75%)',
  300: 'hsl(51,97%,66%)',
  400: 'hsl(51,97%,58%)',
  500: 'hsl(51, 97%, 50%)',
  600: 'hsl(51, 97%, 38%)',
  700: 'hsl(51, 97%, 24%)',
  800: 'hsl(51, 97%, 10%)',
  900: 'hsl(51, 97%, 04%)',
};

const redPallete = {
  DEFAULT: colors.red[500],
  light: colors.red[300],
  dark: colors.red[700],
};

const grayPallete = {
  DEFAULT: colors.gray[500],
  light: colors.gray[300],
  dark: colors.gray[700],
};

export const colorsConfig = {
  transparent: colors.transparent,
  primary: colors.black,
  black: colors.black,
  white: colors.white,
  green: colors.green,
  red: redPallete,
  yellow: yellowPallete,
  gray: grayPallete,
  accent: colors.black,
};
