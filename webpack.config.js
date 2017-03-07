const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  entry: {
    app: './index',
    vendor: ['lodash', 'jquery']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  //devtool: 'eval', //quick
  devtool: 'source-map', //standard

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: false
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      hash: true
      //template: './index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'vendor'],
      minChunks: 2
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.resolve(__dirname, './src'), // location of your src
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['./src/index.html']
      }
      // {
      //   test: /\.ts$/,
      //   use: [
      //     {
      //       loader: 'tslint-loader',
      //       options: {
      //         configFile: 'tslint.json'
      //       }
      //     }
      //   ],
      //   exclude: [/\.(spec|e2e)\.ts$/]
      // },

    ]
  }

};
