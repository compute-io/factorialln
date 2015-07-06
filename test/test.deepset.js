/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factorialln = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset factorialln', function tests() {

	it( 'should export a function', function test() {
		expect( factorialln ).to.be.a( 'function' );
	});

	it( 'should compute the natural logarithm factorial and deep set', function test() {
		var data, expected, i;

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

		data = factorialln( data, 'x' );

		// Evaluated in R:
		expected = [
			{'x':0},
			{'x':0},
			{'x':0.6931472},
			{'x':1.7917595},
			{'x':15.1044126},
			{'x':42.3356165},
			{'x':74.6582363},
			{'x':363.7393756}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-7 );
		}

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]},
			{'x':[9,10]},
			{'x':[9,20]},
			{'x':[9,30]},
			{'x':[9,100]}
		];

		data = factorialln( data, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,0.6931472]},
			{'x':[9,1.7917595]},
			{'x':[9,15.1044126]},
			{'x':[9,42.3356165]},
			{'x':[9,74.6582363]},
			{'x':[9,363.7393756]}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7, 'custom separator' );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( factorialln( [], 'x' ), [] );
		assert.deepEqual( factorialln( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = factorialln( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
