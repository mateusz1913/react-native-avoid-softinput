import callstackConfig from '@callstack/eslint-config/react-native.flat.js';

export default [
  {
    ignores: ['docs/**/*', '**/react-native-avoid-softinput/lib/**/*'],
  },
  ...callstackConfig,
  {
    files: ['**/jest/**/*'],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
  {
    files: ['packages/expo-example/**/*'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['packages/expo-example/withShowTime.js'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
