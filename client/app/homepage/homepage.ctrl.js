( function () {
	'use strict';

	function Homepage ( $q, dataservice, logger ) {
		var self   = this;
		self.title = 'Homepage';

		function activate () {
			logger.info( 'Activated Homepage View' );
		}

		activate();
	}

	angular
		.module( 'app.homepage' )
		.controller( 'Homepage', Homepage );

	Homepage.$inject = [ '$q', 'coreservice', 'logger' ];

} )( );
