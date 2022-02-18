const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");
const manifestJson = require("./webpack.manifest.json");

const subfolder = `/${manifestJson.subdomain}`;

let appEntry = {};
appEntry[`./${manifestJson.entry.appname}`] = manifestJson.entry.filename;

const prodConfig = {
  mode: manifestJson.prod.mode,
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${subfolder}${manifestJson.prod.folder}`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: manifestJson.name,
      filename: manifestJson.filename,
      exposes: appEntry,
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
