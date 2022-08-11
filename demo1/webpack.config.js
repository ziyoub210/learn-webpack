const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Webpack = require("webpack");
// const UglifyJs = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:10].js",
    path: path.join(__dirname, "dist"),
  },
  performance: {
    hints: false,
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
      // {
      //     test: require.resolve('jquery'),
      //     loader: 'expose-loader',
      //     options: {
      //         exposes: ["$", "jQuery"],
      //       },
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1,
              outputPath: "img/",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                // '@babel/preset-env',
                // [
                //     '@babel/preset-env',
                //     {
                //         "useBuiltIns": "entry",
                //         "corejs": "3.24.0"
                //     }
                // ]
              ],
            },
          },
        ],
      },
      {
        //css-loader 解析css引入  style-loader解析到标签中
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "postcss-loader",
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
      filename: "css/main.css",
    }),
    new Webpack.ProvidePlugin({
      $: "jquery",
    }),
  ],
  devServer: {
    port: 3000,
  },
  mode: "production",
};
