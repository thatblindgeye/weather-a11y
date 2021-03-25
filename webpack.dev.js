const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: '[path][name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/template.html',
      filename: 'index.html',
      inject: 'body',
      minify: false,
      // links html to entry
      chunks: ['app'],
    }),
  ],

  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, ''),
    compress: true,
    hot: true,
    watchContentBase: true,
  },
});
