( function () {
	'use strict';

	function getRoutes () {
		return [
			{
				'url' : '/',

				'config' : {
					'templateUrl'  : '/templates/homepage/homepage.html',
					'controller'   : 'Homepage',
					'controllerAs' : 'vm',
					'title'        : 'homepage',

					'settings' : {
						'nav'     : 1,
						'content' : '<span class="icon-layout"></span> Homepage'
					}
				}
			}
		];
	}

	/* @ngInject */
	function appRun ( routehelper ) {
		routehelper.configureRoutes( getRoutes() );
	}

	angular
		.module( 'app.homepage' )
		.run( appRun );

} )( );
