if(process.env.NODE_ENV === "development"){
  require("./play/app.init")
}

module.exports = {
  pages: {
    index: {
      entry: "play/main.js",
      template: "play/index.html",
      filename: "index.html",
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
