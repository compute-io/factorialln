/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factorialln = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor factorialln', function tests() {

	it( 'should export a function', function test() {
		expect( factorialln ).to.be.a( 'function' );
	});

	it( 'should evaluate the natural logarithm factorial using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':10},
			{'x':20},
			{'x':30},
			{'x':100}
		];
		actual = new Array( data.length );

		actual = factorialln( actual, data, getValue );

		// Evaluated in R:
		expected = [
			0,
			0,
			0.6931472,
			1.7917595,
			15.1044126,
			42.3356165,
			74.6582363,
			363.7393756
		];

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d.x;
		}

		data = [
			[1,1e-306],
			[2,0.8],
			[3,1.6],
			[4,3.2],
			[5,6.4],
			[6,12.8],
		];

		// Evaluated in R:
		expected = [
			0.00000000,
			-0.07108387,
			0.35741186,
			2.04855564,
			7.34040498,
			22.03306840
		];

		actual = new Array( data.length );
		actual = factorialln( actual, data, getValue2 );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
		function getValue2( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( factorialln( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = factorialln( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
