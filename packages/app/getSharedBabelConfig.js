const path = require('path');

function getSharedBabelConfig(dirname) {
  return {
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
            '@avoid-softinput-example/app': path.join(dirname, '../app'),
            'react-native-avoid-softinput': path.join(dirname, '../react-native-avoid-softinput'),
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
}

module.exports = getSharedBabelConfig;
