'use strict';

describe( 'app', function () {
	var bjs;

	before( function () {
		bjs = angular.module( 'app' );
	} );

	it( 'should register an `app` module successfully', function () {
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

		it( 'should have `app.core` as dependency', function () {
			expect( hasModule( 'app.core' ) ).to.equal( true );
		} );

		it( 'should have `app.layout` as dependency', function () {
			expect( hasModule( 'app.layout' ) ).to.equal( true );
		} );

		it( 'should have `app.homepage` as dependency', function () {
			expect( hasModule( 'app.homepage' ) ).to.equal( true );
		} );

		it( 'should have `app.helper` as dependency', function () {
			expect( hasModule( 'app.helper' ) ).to.equal( true );
		} );

	} );

} );
