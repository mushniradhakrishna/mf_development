const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpeg|png|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.m?js$/ /*this ensures that whenever a file with extension .mjs or js comes it will be
                        processed by bable*/,
        exclude: /node_modules/, //do not run the babel thing on any of our node_module directory
        use: {
          loader: "babel-loader", // babel will process all our ES-16,17,18 and so on code to regular ES-5 version
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], //
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
};
