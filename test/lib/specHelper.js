'use strict';
/*jshint -W079 */
/*globals sinon, inject*/
var specHelper;

specHelper = ( function ( ) {
	function fakeLogger ( $provide ) {
		$provide.value( 'logger', sinon.stub( {
			'info'    : function ( ) {},
			'error'   : function ( ) {},
			'warning' : function ( ) {},
			'success' : function ( ) {}
		} ) );
	}

	function fakeRouteProvider ( $provide ) {
		/**
		 * Stub out the $routeProvider so we avoid
		 * all routing calls, including the default route
		 * which runs on every test otherwise.
		 * Make sure this goes before the inject in the spec.
		 */
		$provide.provider( '$route', function ( ) {
			/* jshint validthis:true */
			this.when      = sinon.stub( );
			this.otherwise = sinon.stub( );

			this.$get = function ( ) {
				return {
				};
			};
		} );
	}

	/**
	 * Inspired by Angular; that's how they get the parms for injection
	 */
	function getFnParams ( fn ) {
		var fnText;
		var argDecl;

		var FN_ARGS        = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
		var FN_ARG_SPLIT   = /,/;
		var FN_ARG         = /^\s*(_?)(\S+?)\1\s*$/;
		var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		var params         = [ ];

		if ( fn.length ) {
			fnText	= fn.toString( ).replace( STRIP_COMMENTS, '' );
			argDecl = fnText.match( FN_ARGS );

			angular.forEach( argDecl[ 1 ].split( FN_ARG_SPLIT ), function ( arg ) {
				arg.replace( FN_ARG, function ( all, underscore, name ) {
					params.push( name );
				} );
			} );
		}
		return params;
	}

	function injector ( ) {
		var annotation;
		var params;

		var body         = '';
		var cleanupBody  = '';
		var mustAnnotate = false;

		if ( typeof arguments[ 0 ] === 'function' ) {
			params = getFnParams( arguments[ 0 ] );
		} else if ( angular.isArray( arguments[ 0 ] ) ) {
			params = arguments[ 0 ];
		} else {
			params = Array.prototype.slice.call( arguments );
		}

		annotation = params.join( '\',\'' ); // might need to annotate

		angular.forEach( params, function ( name, ix ) {
			var named;

			var pathName = name.split( '.' );
			var pathLen  = pathName.length;

			if ( pathLen > 1 ) {
				// name is a path like 'block.foo'. Can't use as identifier
				// assume last segment should be identifier name, e.g. 'foo'
				name         = pathName[ pathLen - 1 ];
				mustAnnotate = true;
			}

			named        = '_' + name + '_';
			params[ ix ] = named;
			body        += name + ' = ' + named + ';';
			cleanupBody += 'delete window.' + name + ';';

			// todo: tolerate component names that are invalid JS identifiers, e.g. 'burning man'
		} );

		var fn = 'function ( ' + params.join( ',' ) + ' ){ ' + body + ' }';

		if ( mustAnnotate ) {
			fn = '[\'' + annotation + '\',' + fn + ']';
		}

		var exp = 'inject( ' + fn + ' );' +
					'afterEach(function ( ){ ' + cleanupBody + ' } );'; // remove from window.

		/* jshint evil:true */
		/* eslint no-new-func:0 */
		new Function( exp )( );
	}

	function verifyNoOutstandingHttpRequests ( ) {
		afterEach( inject( function ( $httpBackend ) {
			$httpBackend.verifyNoOutstandingExpectation( );
			$httpBackend.verifyNoOutstandingRequest( );
		} ) );
	}

	var service = {
		'fakeLogger'                      : fakeLogger,
		'fakeRouteProvider'               : fakeRouteProvider,
		'injector'                        : injector,
		'verifyNoOutstandingHttpRequests' : verifyNoOutstandingHttpRequests
	};

	return service;

} )( );
