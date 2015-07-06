'use strict';

// MODULES //

var gamma = require( 'gamma' ),
	isInteger = require( 'validate.io-integer' );

// VARIABLES //

var FACTORIALS = require( './factorials.json' );


// NATURAL LOGARITHM FACTORIAL //

/**
* FUNCTION: factorialln( n )
*	Computes the natural logarithm factorial of n.
*
* @param {Number} n - input value
* @returns {Number} natural logarithm factorial of n
*/
function factorialln( n ) {
	if ( isInteger( n ) ) {
		return factorialln.integer( n );
	} else {
		return factorialln.general( n );
	}
} // end FUNCTION factorialln()


/**
* METHOD: general( n )
*	Computes the natural logarithm factorial of n for real numbers.
*
* @param {Number} n - input value
* @returns {Number} natural logarithm factorial of n
*/
factorialln.general = function( n ) {
	return gamma.log( n + 1 );
}; // end METHOD general()

/**
* METHOD: integer( n )
*	Computes the natural logarithm factorial of n for non-negative integers.
*
* @param {Number} n - input value
* @returns {Number} natural logarithm factorial of n
*/
factorialln.integer = function( n ) {
	if ( n < 0 ) {
		return NaN;
	}
	if  ( n <= 256 ) {
		return FACTORIALS[ n ];
	} else {
		var x = n + 1;
		return (x - 0.5) * Math.log(x) - x + 0.5 * Math.log( 2 * Math.PI ) + 1 / ( 12 * x );
	}
}; // end METHOD integer()

// EXPORTS //

module.exports = factorialln;
