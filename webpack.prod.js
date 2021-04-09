const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:15].js',
    assetModuleFilename: '[path][name].[contenthash:15][ext]',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        // revert to "type: asset/resource" with svg added
        // if file-loader stops working
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[path][name].[contenthash:15].[ext]',
          },
        },
        type: 'javascript/auto',
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
      filename: 'index.[contenthash:15].html',
      inject: 'body',
      minify: true,
      // links html to entry
      chunks: ['app'],
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[name].[contenthash:15].css',
      chunkFilename: 'style-[name].[contenthash:15].css',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist/'],
      dry: false,
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        // Only apply to files equal to or over 8192 bytes
        filter: (source) => {
          if (source.byteLength >= 8192) {
            return true;
          }
          return false;
        },
        minimizerOptions: {
          plugins: [
            ['mozjpeg', { progressive: true, quality: 25 }],
            ['pngquant', { quality: [0.5, 0.7] }],
            ['svgo', {}],
          ],
        },
      }),
      new ImageMinimizerPlugin({
        // Only apply to files under 8192 bytes
        filter: (source) => {
          if (source.byteLength < 8192) {
            return true;
          }
          return false;
        },
        minimizerOptions: {
          plugins: [
            ['mozjpeg', { progressive: false, quality: 75 }],
            ['pngquant', { quality: [0.6, 0.8] }],
          ],
        },
      }),
    ],
    // use for multiple entries on a page
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
        normalizeCSS: {
          test: /normalize\.s?css$/,
          name: 'normalize',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
});
