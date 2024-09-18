const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  pages: {
    index: {
      // page 的入口
      entry: "examples/main.js",
      // 模板来源
      template: "public/index.html",
      // 输出文件名
      filename: "index.html",
    },
  },
  transpileDependencies: true,
  runtimeCompiler: true,

  css: { extract: false },

  // 配置路径别名
  chainWebpack: config => {
    config.resolve.alias.set("@", path.join(__dirname, "./examples"))
  }
});

