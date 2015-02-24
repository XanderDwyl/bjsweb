( function () {
	'use strict';

	/* @ngInject */
	function coreservice ( $http, $location, $q, exception, logger ) {
		var isPrimed = false;
		var primePromise;

		function prime () {

			function success () {
				isPrimed = true;
				logger.info( 'Primed data' );
			}

			// This function can only be called once.
			if ( primePromise ) {
				return primePromise;
			}

			primePromise = $q.when( true ).then( success );
			return primePromise;

		}

		function ready ( nextPromises ) {
			var readyPromise = primePromise || prime();

			return readyPromise
				.then( function () {
					return $q.all( nextPromises );
				} )
				.catch( exception.catcher( '`ready` function failed' ) );
		}

		var service = {
			'ready' : ready
		};

		return service;
	}

	angular
	.module( 'app.core' )
	.factory( 'coreservice', coreservice );

} )( );
