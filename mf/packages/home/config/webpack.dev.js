const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const manifestJson = require("./webpack.manifest.json");

let appEntry = {};
appEntry[`./${manifestJson.entry.appname}`] = manifestJson.entry.filename;

const devConfig = {
  mode: manifestJson.dev.mode,
  output: {
    publicPath: `${manifestJson.dev.host}:${manifestJson.dev.port}/`,
  },
  devServer: {
    port: manifestJson.dev.port,
    historyApiFallback: {
      //
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: manifestJson.name,
      filename: manifestJson.filename,
      exposes: appEntry,
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
