'use strict'; // eslint-disable-line

const webpack = require('webpack');
const merge = require('webpack-merge');

const path = require('path');
const BrowserSync = require('./webpack/browser-sync');

const Styles = require('./webpack/styles');
const htmlImport = require('./webpack/htmlImport');
const Scripts = require('./webpack/scripts');
const CopyAssets = require('./webpack/copy-assets');

const gitRoot = require('git-root');

const relPath = path.relative(gitRoot(), __dirname);
const assets = path.join(__dirname, './assets');
const PATHS = {
  assets: assets,
  dist: path.join(__dirname, './dist'),
  fonts: path.join(assets, '/fonts'),
  icons: path.join(assets, '/icons'),
  relDist: path.join(relPath, './dist'),
  sep: path.sep,
  relPath
};

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

const common = merge([
  {
    entry: {
      "main": [
        PATHS.assets + '/scripts/main.js',
        PATHS.assets + '/styles/main.scss',
      ],
    },
    output: {
      path: PATHS.dist,
      filename: 'scripts/[name].js',
      publicPath: `/${PATHS.relDist}/`,
    },
    // cache: true,
    stats: {children: false},
    resolve: {
      extensions: ['.js', '.css', '.scss', '.json'],
      modules: [
        PATHS.assets,
        'node_modules',
      ],
      enforceExtension: false,
      alias: {
        'scss': PATHS.assets + '/styles/common',
        'classes': PATHS.assets + '/scripts/classes',
        'img': PATHS.assets + '/img',
        'fonts': PATHS.assets + '/fonts',
      },
    },
    externals: {
      jquery: 'jQuery',
    },
    name: 'styles',
    watchOptions: {
      aggregateTimeout: 500, // The default
      ignored: PATHS.dist,
    },
    devServer: {
      contentBase: PATHS.dist,
      compress: true,
      port: 9000,
      historyApiFallback: true,
      publicPath: '/',
      hot: true,
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        test: /\.js$/,
        options: {
          eslint: {
            failOnWarning: false,
            failOnError: true
          },
        },
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
    ],
  },

  CopyAssets(PATHS),
  Scripts(PATHS),
  Styles(PATHS),
  htmlImport(PATHS),

]);

module.exports = function () {
  return merge([
    common,
    {
      devtool: 'source-map',
      output: {
        publicPath: '',
      },
    },
    BrowserSync(PATHS),
  ]);
};
