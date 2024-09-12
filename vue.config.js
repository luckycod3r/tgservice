const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// const fs = require('fs')
module.exports = defineConfig({
  devServer : {
    port : 3000
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});
