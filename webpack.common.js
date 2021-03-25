const path = require('path');

// use for multiple html files and to create output folder structure
// replace plugins in module.exports with "plugins: HtmlPluginEntries"
// const entries = {
//   app: ["/scripts/index.js", "/stylesheets/main.css"],
// };

// const HtmlPluginEntries = Object.keys(entries).map(entryName => {
//   return new HtmlWebpackPlugin({
//     template: `/${entryName}/template.html`,
//     filename: `${entryName}/index.html`,
//     chunks: [entryName],
//     inject: "body",
//     minify: false,
//   });
// });

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: '/scripts/index.js',
    // use to avoid importing css file inside of js file:
    // import normalize inside style.css to split into its own in head
    // app: ["./src/scripts/index.js", "./src/stylesheets/style.css"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
};
