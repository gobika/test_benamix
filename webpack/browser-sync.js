const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function (path, config = 'local') {
  let browserConfig = {};

  if (config === 'local') {
    browserConfig = {
      host: 'localhost',
      port: 3000,
      server: { baseDir: [path.dist] },
      reloadDelay: 200,
    };
  } else if (config === 'stage') {
    browserConfig = {
      host: 'localhost',
      port: 3000,
      proxy: process.env.PROJECT_URL,
      files: [
        path + '/classes/**/*.php',
        path + '/controllers/**/*.php',
        path + '/views/**/*.php',
        path + '/views/**/*.js',
        path + '/assets/scripts/*.js',
      ],
      reloadDelay: 200,
    };
  }

  return {
    plugins: [
      new BrowserSyncPlugin(browserConfig, {
        // reload: true,
        injectCss: true
      }),
    ],
  };
};
