/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factorialln = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array factorialln', function tests() {

	it( 'should export a function', function test() {
		expect( factorialln ).to.be.a( 'function' );
	});

	it( 'should evaluate the natural logartihm factorial', function test() {
		var data, actual, expected, i;

		data = [
			0,
			1,
			2,
			3,
			10,
			20,
			30,
			100
		];
		actual = new Array( data.length );

		actual = factorialln( actual, data );

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
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( factorialln( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = factorialln( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
