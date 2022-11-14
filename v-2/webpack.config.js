const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  plugins: [new MiniCssExtractPlugin()], // new MiniCssExtractPlugin({filename: "style.css"})
  module: {
    rules: [
      {
        test: /\.css$/i, // css file extension regex test for css files to be processed by css-loader and style-loader
        use: [MiniCssExtractPlugin.loader, "css-loader"], //delete style-loader and add MiniCssExtractPlugin.loader
      },
      {
        test: /\.s[ac]ss$/i, // sass or scss
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //delete style-loader and add MiniCssExtractPlugin.loader
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // png, jpg, jpeg, gif
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
};
