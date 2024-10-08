const path = require('path');

const { makeMetroConfig } = require('@rnx-kit/metro-config');

module.exports = makeMetroConfig({
  watchFolders: [
    path.resolve(__dirname, '..', '..', 'node_modules'),
    path.resolve(__dirname, '..', 'react-native-avoid-softinput'),
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
