'use strict';

// FUNCTIONS //

var FACTORIALLN = require( './number.js' );


// NATURAL LOGARITHM FACTORIAL //

/**
* FUNCTION: factorialln( out, arr )
*	Computes an element-wise natural logarithm factorial for an array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function factorialln( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = FACTORIALLN( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION factorialln()


// EXPORTS //

module.exports = factorialln;
