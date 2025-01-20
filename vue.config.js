const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  pages: {
    index: {
      entry: "examples/main.js",
      template: "examples/public/index.html",
      filename: "index.html",
      favicon: "examples/public/favicon.ico",
    },
  },
  transpileDependencies: true,
  runtimeCompiler: true,
  css: { extract: true },
  configureWebpack: {
    optimization: {
      usedExports: true
    },
  },
});
