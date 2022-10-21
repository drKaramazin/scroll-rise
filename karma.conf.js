// Karma configuration
// Generated on Mon Apr 04 2022 20:17:35 GMT+0500 (Yekaterinburg Standard Time)

module.exports = function(config) {
  config.set({
    basePath: 'src',
    frameworks: ['jasmine', "karma-typescript"],
    files: [
      '**/*.ts',
      { pattern: '../docs/styles/reset.css', included:true, watched: false },
      { pattern: '../styles/test.css', included:true, watched: false },
    ],
    exclude: [],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [
          require("karma-typescript-es6-transform")({
            presets: [
              ["@babel/preset-env", {
                targets: {
                  chrome: "60"
                }
              }]
            ]
          })
        ]
      }
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    client: {
      clearContext: false,
    },
    concurrency: Infinity
  });
}