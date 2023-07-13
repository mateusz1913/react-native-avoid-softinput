const path = require('path');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  getMetroAndroidAssetsResolutionFix,
} = require('react-native-monorepo-tools');

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
    path.join(__dirname, '../../node_modules'),
    path.join(__dirname, '../app'),
    path.join(__dirname, '../react-native-avoid-softinput'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
