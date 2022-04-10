// Karma configuration
// Generated on Mon Apr 04 2022 20:17:35 GMT+0500 (Yekaterinburg Standard Time)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', "karma-typescript"],
    files: [
      'src/**/*.spec.ts',
    ],
    exclude: [],
    preprocessors: {
      "src/**/*.spec.ts": ['karma-typescript'],
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
    concurrency: Infinity
  })
}
