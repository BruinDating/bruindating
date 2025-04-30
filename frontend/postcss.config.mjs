/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
        'mantine-breakpoint-x2l': '100em',
        'mantine-breakpoint-x3l': '120em',
        'mantine-breakpoint-x4l': '128em',
        'mantine-breakpoint-x5l': '160em',
      },
    },
  },
};
