//关于css和html的一些配置
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const UglifyJs = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:10].js",
    path: path.join(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      // new UglifyJs({
      //     cache: true,
      //     parallel: true
      // }),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        //css-loader 解析css引入  style-loader解析到标签中
        test: /\.css$/,
        use: [
          {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //     insert: 'top'
            // }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            // options: {
            //     postcssOptions: {
            //         plugins: [
            //             'autoprefixer',
            //         ]
            //     }
            // }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true, //折叠空行
      },
      hash: true,
    }),
    //将css从style抽为文件
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
  ],
  devServer: {
    port: 3000,
  },
  mode: "development",
};
