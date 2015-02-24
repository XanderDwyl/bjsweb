( function () {
	'use strict';

	angular.module( 'app.core', [
		/*
		 * Angular modules
		 */
		'ngAnimate', 'ngRoute', 'ngSanitize', 'templates',
		/*
		 * Reusable cross app code modules
		 */
		'blocks.exception', 'blocks.logger', 'blocks.router'
	] );
} )();
