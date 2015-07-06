factorialln
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise natural log factorial.

 Computes the natural logarithm of the factorial, i.e.

<div class="equation" align="center" data-raw-text="f(n)=\ln (n!)" data-equation="eq:factorialln_equation">
	<img src="https://cdn.rawgit.com/compute-io/factorialln/08d90469eae895608c4e2a3f14265dafb1c20083/docs/img/eqn.svg" alt="Equation of the natural logarithm of the factorial.">
	<br>
</div>

This function is provided since the factorial `n!`, can overflow for large input arguments, and therefore the function call `factorialln( n )` is should be preferred to `log( factorial( n ) )` as the latter might not return correct results.

## Installation

``` bash
$ npm install compute-factorialln
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var factorialln = require( 'compute-factorialln' );
```

#### factorialln( n[, opts] )

Evaluates the natural logarithm of the factorial (element-wise). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). The function accepts any positive real number as its input. For non-integer `n`, the function returns
`ln( n! ) = ln( Γ(n+1) )`, where `Γ` is the [gamma function](https://en.wikipedia.org/wiki/Gamma_function). For `n < 0`, `NaN` is returned.


``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

// Returns logarithm of factorial for positive integers:
out = factorialln( 3 );
// returns ~1.792

// Generalized for real numbers:
out = factorialln( 2.4 );
// returns 1.092

// Not defined for negative numbers:
out = factorialln( -1 );
// returns NaN

out = factorialln( [ 5, 10, 20, 50, 100 ] );
// returns [ ~4.787, ~15.104, ~42.336, ~148.478, ~363.739 ]

data = [ 1, 2, 3 ];
out = factorialln( data );
// returns [ 0, ~0.693, ~1.792 ]

data = new Int8Array( data );
out = factorialln( data );
// returns Float64Array( [ 1, 2, 3 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  1
	  2  3
	  4  5 ]
*/

out = factorialln( mat );
/*	returns approximately
	[ 0     0
      0.693 1.792
      3.178 4.787 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 0],
	['boop', 1],
	['bip', 2],
	['bap', 3],
	['baz', 4]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = factorialln( data, {
	'accessor': getValue
});
// returns [ 0, 0, ~0.693, ~1.791, ~3.178 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,1]},
	{'x':[2,2]},
	{'x':[3,3]},
	{'x':[4,4]}
];

var out = factorialln( data, 'x|1', '|' );
/*
	[
		{'x':[0,0]},
		{'x':[1,0]},
		{'x':[2,~0.693]},
		{'x':[3,~1.791]},
		{'x':[4,~3.178]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Float32Array( [2,3,4] );

out = factorialln( data, {
	'dtype': 'int16'
});
// returns Int16Array( [0,1,3] )

// Works for plain arrays, as well...
out = factorialln( [ 2, 3, 4 ], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,1,3] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

daa = factorialln( [ 5, 10, 20, 50, 100 ] );

var out = factorialln( data, {
	'copy': false
});
// returns [ ~4.787, ~15.104, ~42.336, ~148.478, ~363.739 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  1
	  2  3
	  4  5 ]
*/

out = factorialln( mat, {
	'copy': false
});
/*	returns approximately
	[ 0     0
      0.693 1.792
      3.178 4.787 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = factorialln( null );
	// returns NaN

	out = factorialln( true );
	// returns NaN

	out = factorialln( {'a':'b'} );
	// returns NaN

	out = factorialln( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = factorialln( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = factorialln( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = factorialln( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

## Implementation

For non-integer input arguments, the function computes the natural logarithm of the factorial of `n` by evaluating the logarithm of the gamma function at `n+1`, i.e. `ln( Γ(n+1) )`. When `n` is an integer and smaller than 256, the result is looked up in a table, and for n > 256, the following approximation is used:

```
(x – 1/2) log(x) – x + (1/2) log(2 π) + 1/(12 x)
```

## References

See [John D. Cook's blog post](http://www.johndcook.com/blog/2010/08/16/how-to-compute-log-factorial/) for a discussion of the approach to calculate the log factorial when `n` is an integer and his [code snippet in C#] (http://www.johndcook.com/blog/csharp_log_factorial/), which we translated to JavaScript for this module.

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	factorialln = require( 'compute-factorialln' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
out = factorialln( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = factorialln( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = factorialln( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 100 );
}
tmp = factorialln( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = factorialln( mat );
console.log( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = factorialln( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-factorialln.svg
[npm-url]: https://npmjs.org/package/compute-factorialln

[travis-image]: http://img.shields.io/travis/compute-io/factorialln/master.svg
[travis-url]: https://travis-ci.org/compute-io/factorialln

[coveralls-image]: https://img.shields.io/coveralls/compute-io/factorialln/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/factorialln?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/factorialln.svg
[dependencies-url]: https://david-dm.org/compute-io/factorialln

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/factorialln.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/factorialln

[github-issues-image]: http://img.shields.io/github/issues/compute-io/factorialln.svg
[github-issues-url]: https://github.com/compute-io/factorialln/issues
