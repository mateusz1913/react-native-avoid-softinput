const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
          '@avoid-softinput-example/app': path.join(__dirname, '../app'),
          'react-native-avoid-softinput': path.join(__dirname, '../react-native-avoid-softinput'),
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
