const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  pages: {
    index: {
      // page 的入口
      entry: "examples/main.js",
      // 模板来源
      template: "examples/public/index.html",
      // 输出文件名
      filename: "index.html",
      // 图标
      favicon: "examples/public/favicon.ico",
    },
  },
  transpileDependencies: true,
  runtimeCompiler: true,

  css: { extract: false },
  
});

