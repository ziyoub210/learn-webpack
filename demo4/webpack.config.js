const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//hanppypack 多线程打包
const Happypack = require("happypack");
module.exports = {
  entry: {
    index: "./src/index.js",
    other: "./src/other.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      //分割代码块
      cacheGroups: {
        //缓存组
        common: {
          //公共模块
          chunks: "initial",
          minSize: 0,
          minChunks: 2,
        },
        vendor: {
          priority: 1,
          test: /node_modules/, //把node_module处理出来
          chunks: "initial",
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  devServer: {
    port: 3000,
    static: path.join(__dirname, "dist"),
  },
  mode: "development",
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
              presets: ["@babel/preset-env", "@babel/preset-react"],
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
  ],
};
