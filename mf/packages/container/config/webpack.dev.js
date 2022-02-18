const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const manifestJson = require("./webpack.manifest.json");

const addMicroapps = () => {
  let temp_arr = {};
  manifestJson.microapps.forEach((app) => {
    temp_arr[
      app.name
    ] = `${app.name}@${app.dev.host}:${app.dev.port}/${app.filename}`;
  });
  return temp_arr;
};

const devConfig = {
  mode: manifestJson.dev.mode,
  output: {
    publicPath: `${manifestJson.dev.host}:${manifestJson.dev.port}/`,
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    port: manifestJson.dev.port,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: manifestJson.name,
      remotes: addMicroapps(),
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
