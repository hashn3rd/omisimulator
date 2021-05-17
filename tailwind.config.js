module.exports = {
  purge: {
    mode: 'all',
    content: [
      './docs/index.html',
      './src/**/*.html',
      './src/**/*.svelte',
      './src/**/*.css',
      './src/**/*.js',
    ],
    options: {
      whitelist: []
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
