const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// const fs = require('fs')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    
    port: 3000,
   
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});
