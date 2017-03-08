const path = require('path');
const webpack = require('webpack');
const helpers = require('./config/helpers');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var isProd = false;
var isDev = false;
var isTest = false;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    isProd = true;
    break;
  case 'test':
  case 'testing':
    isTest = true;
    break;
  case 'dev':
  case 'development':
  default:
    isDev = true;
    break;
}

var config  = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  entry: {
    polyfills: './polyfills.ts',
    app: './main',
    vendor: './vendor'
  },
  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
  //devtool: 'eval', //quick
  devtool: 'source-map', //standard

  plugins: [
    new CaseSensitivePathsPlugin(),
    
    new webpack.DefinePlugin({
      PRODUCTION: isProd
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      hash: true,
      template: './index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
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
    new CopyWebpackPlugin([
      { from: 'app/assets' },
    ]),  
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
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
    ]
  }

};

if (isProd) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
