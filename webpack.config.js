const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "eval-source-map",
  mode: "development",
  entry: "./src/main.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    watchFiles: ["./src/**/*"],
    port: 8000,
  },

  module: {
    rules: [
      // for production builds
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./src/img/favicon.png",
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
