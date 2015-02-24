( function () {
	'use strict';

	function Layout ( $timeout, config, logger ) {
		var self   = this;
		self.title = config.appTitle;

		function activate () {
			logger.success( config.appTitle + ' loaded!', null );
		}

		activate();
	}

	angular
		.module( 'app.layout' )
		.controller( 'Layout', Layout );

	Layout.$inject = [ '$timeout', 'config', 'logger' ];

} )( );
