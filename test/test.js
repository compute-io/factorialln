/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	factorialln = require( './../lib' ),

	// Error function:
	FACTORIALLN = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-factorialln', function tests() {

	it( 'should export a function', function test() {
		expect( factorialln ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				factorialln( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				factorialln( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				factorialln( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				factorialln( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( factorialln( values[ i ] ) ) );
		}
	});

	it( 'should compute the natural logarithm factorial when provided a number', function test() {
		// Evaluated on Wolfram Alpha
		assert.closeTo( factorialln( 100000 ), 1.05129922189912186512927810820611085524934452314e6, 1e-7 );
		assert.closeTo( factorialln( 10000 ), 82108.927836814353455385030063512406082638806527035176, 1e-7 );

		assert.isTrue( isnan( factorialln( NaN ) ) );
	});

	it( 'should evaluate the natural logarithm factorial when provided a plain array', function test() {
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

		actual = factorialln( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate...
		actual = factorialln( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the natural logarithm factorial when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Int32Array([
			0,
			1,
			2,
			3,
			10,
			20,
			30,
			100
		]);

		expected = new Float64Array([
			0,
			0,
			0.6931472,
			1.7917595,
			15.1044126,
			42.3356165,
			74.6582363,
			363.7393756
		]);

		actual = factorialln( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = factorialln( data, {
			'copy': false
		});
		expected = new Int32Array( [ 0, 0, 0, 1, 15, 42, 74, 363 ] );
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the natural logarithm factorial element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

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

		expected = new Int32Array( [ 0, 0, 0, 1, 15, 42, 74, 363 ] );

		actual = factorialln( data, {
			'dtype': 'int32'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 4 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the natural logarithm factorial element-wise using an accessor', function test() {
		var data, actual, expected, i;

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

		actual = factorialln( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = factorialln( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the natural logarithm factorial element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[0,0]},
			{'x':[1,1]},
			{'x':[2,2]},
			{'x':[3,3]},
			{'x':[4,10]},
			{'x':[5,20]},
			{'x':[6,30]},
			{'x':[7,100]}
		];

		expected = [
			{'x':[0,0]},
			{'x':[1,0]},
			{'x':[2,0.6931472]},
			{'x':[3,1.7917595]},
			{'x':[4,15.1044126]},
			{'x':[5,42.3356165]},
			{'x':[6,74.6582363]},
			{'x':[7,363.7393756]}
		];

		actual = factorialln( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[0,0]},
			{'x':[1,1]},
			{'x':[2,2]},
			{'x':[3,3]},
			{'x':[4,10]},
			{'x':[5,20]},
			{'x':[6,30]},
			{'x':[7,100]}
		];
		actual = factorialln( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}
	});

	it( 'should evaluate the natural logarithm factorial element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = FACTORIALLN( i );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = factorialln( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = factorialln( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the natural logarithm factorial element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = FACTORIALLN( i );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = factorialln( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( factorialln( [] ), [] );
		assert.deepEqual( factorialln( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( factorialln( new Int8Array() ), new Float64Array() );
	});

});
