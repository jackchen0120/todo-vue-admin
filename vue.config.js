const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // publicPath: isProduction ? '/todo-vue-admin/' : '/',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        ws: false,
        // pathRewrite: {
        //   "^/api": "/api"
        // }
      }
    }
  },
  //webpack配置
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除console
            }
          }
        })
      ]
    },
    //警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
};
