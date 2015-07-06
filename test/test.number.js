/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factorialln = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number factorialln', function tests() {

	it( 'should export a function', function test() {
		expect( factorialln ).to.be.a( 'function' );
	});

	it( 'should evaluate the natural logarithm factorial', function test() {
		assert.closeTo( factorialln( 0 ), 0, 1e-4 );
		assert.closeTo( factorialln( 1.2 ), 0.09694747, 1e-4 );
		assert.closeTo( factorialln( 5 ), 4.78749174, 1e-4 );
		assert.closeTo( factorialln( 100 ), 363.73937556, 1e-4 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = factorialln( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return NaN if provided a negative number', function test() {

		// integer
		var val = factorialln( -3 );
		assert.isNumber( val );
		assert.ok( val !== val );

		// non-integer
		var val = factorialln( -2.7 );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( factorialln( 1 ) );
	});

});
