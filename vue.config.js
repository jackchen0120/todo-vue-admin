module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/todo-vue-admin/" : "/",
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8082,
    proxy: {
      "/api": {
        target: "http://localhost:8088",
        changeOrigin: true,
        ws: false,
        // pathRewrite: {
        //   "^/api": "/api"
        // }
      }
    }
  }
};
