( function () {
	'use strict';

	function Nav ( $route, routehelper ) {
		/*jshint validthis: true */
		var self     = this;
		var routes = routehelper.getRoutes();

		function getNavRoutes () {
			self.navRoutes = routes.filter( function ( r ) {
				return r.settings && r.settings.nav;
			} ).sort( function ( r1, r2 ) {
				return r1.settings.nav - r2.settings.nav;
			} );
		}

		function activate () {
			getNavRoutes();
		}

		function isCurrent ( route ) {
			if ( !route.title || !$route.current || !$route.current.title ) {
				return '';
			}

			var classDef = '';
			var menuName = route.title;

			if ( $route.current.title.substr( 0, menuName.length ) === menuName ) {
				classDef = 'active';
			}

			return classDef;
		}

		self.isCurrent = isCurrent;

		activate();
	}

	angular
		.module( 'app.layout' )
		.controller( 'Nav', Nav );

	Nav.$inject = [ '$route', 'routehelper' ];

} )( );
