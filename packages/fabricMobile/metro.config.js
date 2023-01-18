const path = require('path');

const {
  getMetroAndroidAssetsResolutionFix,
} = require('react-native-monorepo-tools');

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

module.exports = {
  transformer: {
    publicPath: androidAssetsResolutionFix.publicPath,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  server: {
    enhanceMiddleware: (middleware) => {
      return androidAssetsResolutionFix.applyMiddleware(middleware);
    },
  },
  watchFolders: [
    path.join(__dirname, '../../node_modules'),
    path.join(__dirname, '../app'),
    path.join(__dirname, '../react-native-avoid-softinput'),
  ],
};
