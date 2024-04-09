module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  postCss: {
    plugins: [
      require('postcss-import'),
      require('postcss-preset-env'),
      require('postcss-nested'),
      require('postcss-custom-properties'),
      require('postcss-color-function'),
      require('postcss-calc'),
      require('postcss-media-minmax'),
      require('postcss-url'),
      require('postcss-aspect-ratio'),
      require('postcss-gradient-fix'),
      require('postcss-svgo'),
      require('postcss-reporter'),
      require('reset-css'),
    ],
  },
};
