const path = require('path');

module.exports = {
  dependencies: {
    // Lib is hoisted into root node_modules and thus is not discoverable by iOS autolinking
    'react-native-avoid-softinput': {
      root: path.resolve(__dirname, '../../', 'node_modules/react-native-avoid-softinput'),
    },
  },
};
