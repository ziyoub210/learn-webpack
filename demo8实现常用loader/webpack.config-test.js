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
  module: {
    rules: [
      //   {
      //       test: /\.js$/,
      //       use: [
      //           'loader1',
      //           'loader2',
      //           'loader3',
      //       ]
      //   }
      {
        test: /\.js$/,
        use: {
          loader: "loader1.js",
        },
        // enforce: 'post'
      },
      {
        test: /\.js$/,
        use: {
          loader: "loader2.js",
        },
        // enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: {
          loader: "loader3.js",
        },
      },
    ],
  },
};
