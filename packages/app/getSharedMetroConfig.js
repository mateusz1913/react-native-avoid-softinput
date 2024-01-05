const path = require('path');

const {
  getMetroAndroidAssetsResolutionFix,
} = require('react-native-monorepo-tools');

function getSharedMetroConfig(dirname) {
  const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();
  /**
   * Metro configuration
   * https://facebook.github.io/metro/docs/configuration
   *
   * @type {import('metro-config').MetroConfig}
   */
  const config = {
    transformer: {
      publicPath: androidAssetsResolutionFix.publicPath,
    },
    server: {
      enhanceMiddleware: (middleware) => {
        return androidAssetsResolutionFix.applyMiddleware(middleware);
      },
    },
    watchFolders: [
      path.join(dirname, '../../node_modules'),
      path.join(dirname, '../app'),
      path.join(dirname, '../react-native-avoid-softinput'),
    ],
  };

  return config;
}

module.exports = getSharedMetroConfig;
