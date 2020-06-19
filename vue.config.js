module.exports = {
  devServer: {
    // proxy: "https://type.fit/",
    proxy: {
      "/gsearch": {
        target: "https://www.google.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "/gsearch": "/search" },
      },
    },
  },
};
