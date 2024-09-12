const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// const fs = require('fs')
module.exports = defineConfig({
  devServer : {
    port : 3000,
    allowedHosts: "all",
    proxy: {
      '/api': {
        target: 'http://localhost:8011',  // Проксируем API запросы на FastAPI сервер
        changeOrigin: true
      }
    }

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
