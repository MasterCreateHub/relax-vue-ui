module.exports = {
  pages: {
    index: {
      entry: "examples/main.js",
      template: "examples/public/index.html",
      filename: "index.html",
      favicon: "examples/public/favicon.ico",
    },
  },
  runtimeCompiler: true,
  css: { extract: false },
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      usedExports: true
    },
  },
};
