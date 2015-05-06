// Karma configuration
// Generated on Tue May 05 2015 21:35:05 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'scripts/angular.min.js',
      'scripts/*.js',
      'app/*.js',
      'app/services/*.js',
      'test/*Spec.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
  });
};
