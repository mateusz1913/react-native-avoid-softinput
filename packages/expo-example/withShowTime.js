const { withPodfile } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode');

/**
 * @param {String} src
 *
 * @returns {String | null}
 */
function addShowTimePod(src) {
  const results = mergeContents({
    tag: 'ShowTime-Pod',
    src,
    newSrc: "  pod 'ShowTime'",
    anchor: /use_native_modules/,
    offset: 1,
    comment: '#',
  });

  if (results.didMerge) {
    return results.contents;
  }

  return null;
}

/**
 * @param {import('@expo/config-types').ExpoConfig} config
 */
function withShowTime(config) {
  return withPodfile(config, podfileConfig => {
    podfileConfig.modResults.contents =
      addShowTimePod(podfileConfig.modResults.contents) ?? podfileConfig.modResults.contents;

    return podfileConfig;
  });
}

module.exports = withShowTime;
