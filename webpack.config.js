const purgecss = require('@fullhuman/postcss-purgecss')({
  whitelistPatterns: [/class/],
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.html'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          syntax: 'postcss-scss',
          plugins: () => [
            require('postcss-import'),
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
          ],
        },
      },
    ],
  },
};
