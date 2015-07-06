'use strict';

// MODULES //

var FACTORIALLN = require( './number.js' );


// NATURAL LOGARITHM FACTORIAL  //

/**
* FUNCTION: factorialln( out, matrix )
*	Computes the natural logarithm factorial for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function factorialln( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'factorialln()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = FACTORIALLN( x.data[ i ] );
	}
	return y;
} // end FUNCTION factorialln()


// EXPORTS //

module.exports = factorialln;
