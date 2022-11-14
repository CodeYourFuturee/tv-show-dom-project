const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.[contenthash].js", // [contenthash] is a unique hash generated for each build to avoid browser caching issues when we deploy our app  // [hash] is a unique hash generated for each build to avoid browser caching issues when we deploy our app
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // [name] is a placeholder for the name of the entry point (e.g. main)  (to avoid browser caching)
      chunkFilename: "[id].css", // [id] is a placeholder for the id of the chunk (e.g. 0)  (to avoid browser caching)
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // template file to use for generating the HTML file to serve our webpack bundle (e.g. index.html)
    }),
    new CleanWebpackPlugin(), // clean the build folder before each build
  ], // new MiniCssExtractPlugin({filename: "style.css"})
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
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
