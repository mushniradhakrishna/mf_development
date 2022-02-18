const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const manifestJson = require("./webpack.manifest.json");

const domain =
  process.env.PRODUCTION_DOMAIN ||
  `${manifestJson.prod.host}:${manifestJson.prod.port}/`;
const subfolder =
  process.env.PRODUCTION_SUBDOMAIN || `/${manifestJson.subdomain}`;

const addMicroapps = () => {
  let temp_arr = {};
  manifestJson.microapps.forEach((app) => {
    temp_arr[
      app.name
    ] = `${app.name}@${domain}${subfolder}${app.folder}${app.filename}`;
  });
  return temp_arr;
};

const prodConfig = {
  mode: manifestJson.prod.mode,
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${subfolder}${manifestJson.prod.folder}`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: manifestJson.name,
      remotes: addMicroapps(),
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
