// 单独打包react
const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  // entry: './src/test.js',
  entry: {
    react: ["react", "react-dom"],
  },
  output: {
    filename: "_dll_[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "_dll_[name]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.resolve(__dirname, "dist", "manifest.json"),
      format: true,
    }),
  ],
};
