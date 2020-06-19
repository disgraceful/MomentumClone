module.exports = {
  devServer: {
    proxy: {
      "/quotes": {
        target: "https://type.fit",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "/quotes": "/api/quotes" },
      },
      "/gsearch": {
        target: "https://www.google.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "/gsearch": "/search" },
      },
    },
  },
};
