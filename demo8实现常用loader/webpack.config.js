const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    modules: ["node_modules", "loaders"],
    extensions: [".js", ".json"],
  },
  //   devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "banner-loader",
          options: {
            text: "陈燕泉",
            filename: path.resolve(__dirname, "banner-template.js"),
          },
        },
      },
      {
        test: /\.jpg$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
