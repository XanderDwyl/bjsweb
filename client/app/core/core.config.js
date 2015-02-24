( function () {
	'use strict';

	// Main Title
	var mainTitle = 'BJSMotoShop';

	var config = {
		'appErrorPrefix' : '[NG-Modular Error] ', // Configure the exceptionHandler decorator
		'appTitle'       : 'BJSMotoShop',
		'version'        : '1.0.0'
	};

	/* @ngInject */
	function configure ( $logProvider, $routeProvider, $locationProvider, routehelperConfigProvider, exceptionHandlerProvider ) {
		// turn debugging off/on (no info or warn)
		if ( $logProvider.debugEnabled ) {
			$logProvider.debugEnabled( true );
		}

		// Add additional bang after the hash so url format would be http://localhost:8080/#!/
		$locationProvider
			.hashPrefix( '!' );

		routehelperConfigProvider.config.docTitle       = mainTitle;
		routehelperConfigProvider.config.$routeProvider = $routeProvider;

		var resolveAlways = { /* @ngInject */
			'ready' : function ( coreservice ) {
				return coreservice.ready();
			}
		};

		routehelperConfigProvider.config.resolveAlways = resolveAlways;

		// Configure the common exception handler
		exceptionHandlerProvider.configure( config.appErrorPrefix );
	}

	angular
		.module( 'app.core' )
		.value( 'config', config )
		.config( configure );

} )();
