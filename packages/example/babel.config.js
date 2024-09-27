const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.ios.ts',
          '.ios.tsx',
          '.android.js',
          '.android.ts',
          '.android.tsx',
          '.native.js',
          '.native.ts',
          '.native.tsx',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          'react-native-avoid-softinput': path.resolve(__dirname, '..', 'react-native-avoid-softinput'),
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
