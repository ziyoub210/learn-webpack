const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
  //监控代码变化 实时打包
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
