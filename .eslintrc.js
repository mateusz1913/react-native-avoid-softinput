const path = require('path');

module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, 'packages', 'example', 'babel.config.js'),
    },
  },
  ignorePatterns: ['**/react-native-avoid-softinput/lib/**/*'],
  overrides: [
    {
      files: ['**/jest/*'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
