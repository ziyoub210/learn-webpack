const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
/**
 * 1 cleanWebpackPlugin  每次打包前清除上一个文件
 * 2 copyWebpackPlugin   将文件copy到打包后的文件里
 * 3 bannerPlugin        内置，版权声明
 */
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  performance: {
    hints: false,
  },
  //解析
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      aUtil: path.resolve(__dirname, "./src/utils"),
    },
    extensions: [".js", ".ts", ".css"],
  },
  //监控代码变化 实时打包
  // watch: true,
  // watchOptions: {
  //     ignored: /node_modules/,
  // },
  // 1. source-map 大而全
  // 2. eval-source-map 大而全(不会产生单独的文件，但是可以显示行和列)
  // 3. cheap-module-source-map 不会产生列，但是是一个单独的映射文件
  // 4. cheap-module-eval-source-map 不会产生文件 集成在文件中 也不会产生列
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "./doc", to: "./doc" }],
    }),
    new webpack.BannerPlugin({
      banner: "make 2022/7/30 by 陈燕泉",
    }),
    new webpack.DefinePlugin({
      Dev: JSON.stringify("devString"),
    }),
  ],
};
