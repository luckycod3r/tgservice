const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// const fs = require('fs')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   host: 'tg-service.pro',
  //   port: 8080,
  //   https: {
  //     key: fs.readFileSync('./certs/mkcert+5-key.pem'),
  //     cert: fs.readFileSync('./certs/mkcert+5.pem'),
  //   },
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});
