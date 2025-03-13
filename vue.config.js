const path = require('path');
if (process.env.NODE_ENV === 'development') {
  require('./play/app.init');
}

module.exports = {
  pages: {
    index: {
      entry: 'play/main.js',
      template: 'play/index.html',
      filename: 'index.html',
    },
  },

  runtimeCompiler: true,

  css: { extract: true },

  productionSourceMap: false,

  configureWebpack: {
    optimization: {
      usedExports: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@packages': path.resolve(__dirname, 'packages'),
      },
    },
  },
};
