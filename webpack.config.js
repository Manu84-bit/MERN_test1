//webpack is used to translate, together with babel, react sintax to js so the browser can read it.

module.exports = {
  entry: "./src/app/index.js",
  output: {
    path: __dirname + "/src/public",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
      },
    ],
  },
};
