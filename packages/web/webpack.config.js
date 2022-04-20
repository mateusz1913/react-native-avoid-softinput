const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getWebpackTools, getWorkspaces } = require('react-native-monorepo-tools');
const webpack = require('webpack');

const monorepoWebpackTools = getWebpackTools();

const appDirectory = path.resolve(__dirname);
const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.js'), // Entry to your application
    ...compileNodeModules,
    // Manually allow importing from external workspaces instead of automatic `monorepoWebpackTools.enableWorkspacesResolution(webpackConfig)`
    ...getWorkspaces(),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: [
        'react-native-web',
        'react-native-reanimated/plugin',
      ],
    },
  },
};

const webpackConfig = {
  entry: {
    app: path.join(__dirname, 'index.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'index.bundle.js',
  },
  resolve: {
    modules: [ 
      path.resolve(__dirname, '../../node_modules'),
    ],
    extensions: [ '.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js' ],
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {},
      },
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};

// Ensure nohoisted libraries are resolved from this workspace.
monorepoWebpackTools.addNohoistAliases(webpackConfig);

module.exports = webpackConfig;
