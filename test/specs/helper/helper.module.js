'use strict';

describe( 'helper', function () {
	var bjs;

	before( function () {
		bjs = angular.module( 'app.helper' );
	} );

	it( 'should register an `helper` module successfully', function () {
		expect( bjs ).not.to.equal( null );
	} );

	describe( 'dependencies', function () {
		var deps;

		var hasModule = function ( m ) {
			return deps.indexOf( m ) >= 0;
		};

		before( function () {
			deps = bjs.value( 'appName' ).requires;
		} );

		it( 'should have `helper.nivo` as dependency', function () {

			expect( hasModule( 'helper.nivo' ) ).to.equal( true );
		} );


	} );
} );
