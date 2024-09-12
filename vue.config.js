const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// const fs = require('fs')
module.exports = defineConfig({
  devServer : {
    port : 3000,
    disableHostCheck: true,  // Отключаем проверку заголовка Host
    public: 'checker.tg-service.pro',  // Указываем публичный домен
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
