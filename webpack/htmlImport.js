const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(templateDir);
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `${templateDir}/${name}.${extension}`,
    })
  })
}

module.exports = function (paths) {
  const htmlPlugins = generateHtmlPlugins(paths.assets+'/html/views');

  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          include: paths.assets+'/html/partials',
          use: ['html-loader']
        },
      ],
    },
    plugins: [].concat(htmlPlugins),
  };
};
