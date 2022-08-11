const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//hanppypack 多线程打包
const Happypack = require("happypack");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
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
            loader: "Happypack/loader?id=js",
          },
        ],
      },
    ],
  },
  plugins: [
    new Happypack({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      ],
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dist", "manifest.json"),
    }),
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
