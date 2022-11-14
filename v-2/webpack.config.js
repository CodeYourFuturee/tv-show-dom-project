const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // css file extension regex test for css files to be processed by css-loader and style-loader
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i, // sass or scss
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // png, jpg, jpeg, gif
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
