const path = require("path");
module.exports = {
  mode: "development",
  target: "web",
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
  entry: "./client/index.js",
  output: {
    filename: "./client.js",
    path: path.join(__dirname, "./public"),
  },
};
