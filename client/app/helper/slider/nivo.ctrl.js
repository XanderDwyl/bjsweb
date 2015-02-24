( function () {
	'use strict';

	function Nivo ( $timeout, config, logger ) {
		var self   = this;
		self.title = config.appTitle;

		function activate () {
			logger.success( config.appTitle + ' loaded!', null );
		}

		activate();
	}

	angular
		.module( 'helper.nivo' )
		.controller( 'Nivo', Nivo );

	Nivo.$inject = [ '$timeout', 'config', 'logger' ];

} )( );
