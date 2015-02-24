// Karma configuration
// Generated on Thu Jan 29 2015 11:48:18 GMT+0800 (PHT)
'use strict';

module.exports = function ( config ) {
	config.set( {
	// base path that will be used to resolve all patterns (eg. files, exclude)
	'basePath' : './',

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	'frameworks' : [ 'mocha', 'chai', 'sinon', 'chai-sinon' ],

	// list of files / patterns to load in the browser
	'files' : [
		// libs
		'bower_components/angular/angular.min.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-mocks/angular-mocks.js',

		// apps
		'client/app/app.module.js',
		'client/app/**/*.module.js',
		'client/app/**/*.js',

			// test helpers
		'test/lib/specHelper.js',

		// load your tests here
		'test/specs/**/*.js',
		'test/specs/*.js'
	],

	// list of files to exclude
	'exclude' : [
	  '**/*.swp'
	],

	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	'preprocessors' : {
	},

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	'reporters' : [ 'mocha' ],

	// web server port
	'port' : 9876,

	// enable / disable colors in the output (reporters and logs)
	'colors' : true,

	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	'logLevel' : config.LOG_INFO,

	// enable / disable watching file and executing tests whenever any file changes
	'autoWatch' : true,

	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	'browsers' : [ 'PhantomJS' ],

	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	'singleRun' : false,

		'plugins' : [
			'karma-mocha',
			'karma-chai',
			'karma-sinon',
			'karma-chai-sinon',
			'karma-mocha-reporter',
			'karma-phantomjs-launcher'
		]
  } );
};
