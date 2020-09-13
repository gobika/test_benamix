const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (paths) {
  return {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : '',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|s?[ca]ss)$/,
          include: paths.assets,
          loader: 'webpack-import-glob',
        },
        {
          test: /\.scss$/,
          include: paths.assets,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                reloadAll: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './styles/[name].css'
      })
    ],
  };
};
