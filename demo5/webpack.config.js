const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
    port: 3000,
    static: path.join(__dirname, "dist"),
  },
  mode: "production",
  module: {
    noParse: /jquery/, //不去解析jquery中的依赖关系
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.IgnorePlugin({
      //当在momen中引入了locale文件的时候 忽略 moment实例有很多语言包，但是我们只想引入一个
      resourceRegExp: /\.\/locale/,
      contextRegExp: /moment/,
    }),
    // new webpack.NamedModulesPlugin(),
  ],
};
