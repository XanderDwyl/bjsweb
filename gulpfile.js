'use strict';

var gulp          = require( 'gulp' );
var karma         = require( 'karma' ).server;
var rename        = require( 'gulp-rename' );
var concat        = require( 'gulp-concat' );
var uglify        = require( 'gulp-uglify' );
var clean         = require( 'gulp-clean' );
var less          = require( 'gulp-less' );
var image         = require( 'gulp-image' );
var minifyCSS     = require( 'gulp-minify-css' );
var concatCSS     = require( 'gulp-concat-css' );
var annotate      = require( 'gulp-ng-annotate' );
var templateCache = require( 'gulp-angular-templatecache' );
var path          = require( 'path' );

var distDir = 'build';

/**
 * JS concatination and uglification
 */
gulp.task( 'js', function () {
	return gulp.src( [
		/**
		 * Vendor
		 */
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/jquery/dist/jquery.js',
		'bower_components/bootstrap/dist/js/bootstrap.js',

		/**
		 * App
		 */
		'client/app/*.module.js',
		'client/app/**/*.module.js',
		'client/app/**/*.js'
	] )
		.pipe( annotate() )
		.pipe( concat( 'main.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( path.join( __dirname, distDir + '/js' ) ) );
} );

/**
 * Template Builds
 */
gulp.task( 'template', function () {
	return gulp.src( [ 'client/app/**/*.html', 'client/app/**/partials/*.js' ] )
		.pipe( templateCache( 'templates.min.js', {
			'root' : '/templates'
		} ) )
		.pipe( uglify() )
		.pipe( gulp.dest( path.join( __dirname, distDir + '/js' ) ) );
} );

/**
 * CSS Build
 */
gulp.task( 'css:less', function () {
	return gulp.src( 'client/less/style.less' )
		.pipe( less() )
		.pipe( rename( 'style.tmp.css' ) )
		.pipe( gulp.dest( path.join( __dirname, '/client/less' ) ) );
} );

gulp.task( 'css:concat', [ 'css:less' ], function () {
	return gulp.src( [
		'bower_components/bootstrap/dist/css/bootstrap.css',
		'client/less/style.tmp.css'
	] )
		.pipe( concatCSS( 'style.min.css' ) )
		.pipe( minifyCSS() )
		.pipe( gulp.dest( path.join( __dirname, distDir + '/css' ) ) );
} );

gulp.task( 'css', [ 'css:concat' ], function () {
	gulp.src( 'client/less/*.css' )
		.pipe( clean( {
			'force' : true
		} ) );
} );

gulp.task( 'fonts', function () {
	gulp.src( 'client/fonts/**' )
		.pipe( gulp.dest( path.join( __dirname, distDir + '/fonts' ) ) );
} );

gulp.task( 'images', function () {
	gulp.src('client/images/**')
		.pipe(image())
		.pipe( gulp.dest( path.join( __dirname, distDir + '/images' ) ) );
} );

/**
 * Run test once and exit
 */
gulp.task( 'test', function ( done ) {
	karma.start( {
		'configFile' : path.join( __dirname, '/karma.conf.js' ),
		'singleRun'  : true
	}, done );
} );

/**
 * Watch and run test on file change
 */
gulp.task( 'test:dev', function ( done ) {
	karma.start( {
		'configFile' : path.join( __dirname, '/karma.conf.js' )
	}, done );
} );

gulp.task( 'build', [ 'js', 'template', 'css', 'fonts', 'images' ], function () {
	return gulp.src( 'client/dist.html' )
		.pipe( rename( 'index.html' ) )
		.pipe( gulp.dest( path.resolve( distDir ) ) );
} );

gulp.task( 'default', [ 'build', 'test' ] );
