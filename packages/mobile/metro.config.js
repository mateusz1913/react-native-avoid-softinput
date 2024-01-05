const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const getSharedMetroConfig = require('../app/getSharedMetroConfig');

module.exports = mergeConfig(getDefaultConfig(__dirname), getSharedMetroConfig(__dirname));
