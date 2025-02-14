module.exports = function (config) {
    config.set({
      basePath: '', // Base path for resolving files and serving them
      frameworks: ['jasmine'], // Using Jasmine as the test framework
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-webpack'),
        require('karma-coverage'),
      ],
      client: {
        jasmine: {
          // Additional Jasmine configuration can be added here
        },
        clearContext: false, // Keep Jasmine Spec Runner output visible
      },
      preprocessors: {
        // Preprocessing .tsx and .ts files with Webpack for testing
        'src/**/*.tsx': ['webpack'],
        'src/**/*.ts': ['webpack'],
      },
      webpack: {
        mode: 'development',
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
              },
            },
          ],
        },
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        reporters: [
          { type: 'lcov' },
          { type: 'html' },
          { type: 'cobertura' },
        ],
      },
      reporters: ['progress', 'kjhtml', 'coverage'], // Reporting test progress
      browsers: ['Chrome'], // Launch Chrome to run tests
      singleRun: true, // Run tests once and then stop
      restartOnFileChange: true, // Restart on file change
    });
  };
  