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
console.log('process.env.NODE_ENV', process.env.NODE_ENV, isTest)

var config  = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  entry: {
    // polyfills: './polyfills',
    app: './main',
    // vendor: './vendor'
    vendor: [
      // 'jquery',
      'lodash',
      './polyfills',
      'rxjs',
      "@angular/common",
      "@angular/compiler",
      "@angular/core",
      "@angular/forms",
      "@angular/http",
      "@angular/router",
      "@angular/platform-browser",
      "@angular/platform-browser-dynamic",
    ]
  },
  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map',
    // jsonpFunction: "window.webpackJsonp2"
  },
  //devtool: 'eval', //quick
  devtool: 'source-map', //standard

  devServer: {
    setup(app) {
      let server = require('./mock-server/server');
      server.run(app);
    }
  },

  plugins: [
    new CaseSensitivePathsPlugin(),

    new webpack.DefinePlugin({
      PRODUCTION: isProd,
      TEST: isTest
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      hash: true,
      template: './index.html'
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

if (isTest) {
  delete config.entry.vendor;
  let awesomeLoaderOptions = config.module.rules[0].options;
  awesomeLoaderOptions.sourceMap = false;
  awesomeLoaderOptions.inlineSourceMap = true;

  config.module.rules.push(
        /**
         * Instruments JS files with Istanbul for subsequent code coverage reporting.
         * Instrument only testing sources.
         *
         * See: https://github.com/deepsweet/istanbul-instrumenter-loader
         */
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }
  );

} else {
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}));
}


if (isProd) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
