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
      // Example app for some reason does not recognize library imported as a workspace dependency on CI
      // I don't have time and will to fight with that, let's mark it as a warning and just move on
      'import/no-unresolved': 'warn',
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
