const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// const fs = require('fs')
module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0',  // Это позволяет серверу быть доступным снаружи локальной сети
    port: 3000,       // Убедитесь, что Vue Dev Server запущен на правильном порту
    public: 'checker.tg-service.pro',  // Публичный домен
    disableHostCheck: true,  // Отключение проверки заголовка Host
    proxy: {
      '/api': {
        target: 'http://localhost:8011',  // Проксирование API запросов на бэкенд FastAPI
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
