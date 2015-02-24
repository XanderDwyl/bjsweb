/**
 * Static file server
 */
'use strict';

var Hapi   = require( 'hapi' );
var server = new Hapi.Server();

server.connection( { 'port' : 8080 } );

var route =  [
	{
		'method' : 'GET',
		'path'   : '/{param*}',

		'handler' : {
			'directory' : {
				'path' : 'client'
			}
		}
	},
	{
		'method' : 'GET',
		'path'   : '/templates/{param*}',

		'handler' : {
			'directory' : {
				'path' : 'client/app'
			}
		}
	},
	{
		'method' : 'GET',
		'path'   : '/bower_components/{param*}',

		'handler' : {
			'directory' : {
				'path' : 'bower_components'
			}
		}
	}
];

if ( process.env.NODE_ENV === 'production' ) {
	// override route when NODE_ENV is set to production
	// this is for testing dist build only
	route = {
		'method' : 'GET',
		'path'   : '/{param*}',

		'handler' : {
			'directory' : {
				'path' : 'build'
			}
		}
	};
}

server.route( route );

server.start( function ( err ) {
	if ( !err ) {
		console.log( 'server running on port 8080' );
	}
} );
