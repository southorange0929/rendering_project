const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },
    ],
  },
  entry: "./index.js",
  output: {
    filename: "./server.js",
  },
  externals: [nodeExternals()],
};
