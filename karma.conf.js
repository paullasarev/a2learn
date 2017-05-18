// Karma configuration
// Generated on Thu May 18 2017 15:13:09 GMT+0400 (Russia TZ 3 Standard Time)

process.env.NODE_ENV = 'test';

module.exports = function(config) {
  var testWebpackConfig = require('./webpack.config.js');//({ env: 'test' });

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', "karma-typescript"],


    // list of files / patterns to load in the browser
    files: [
      'build/polyfills.js',
      'build/vendor.js',
      'build/app.js',
      { pattern: './config/spec-bundle.js', watched: false },
      'src/test/**/*.spec.*'
    ],

    webpack: testWebpackConfig,

    // list of files to exclude
    exclude: [
      // 'src/test/**/*.spec.js',
      // 'src/test/**/*.spec.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
