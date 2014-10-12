

/**
 * Converts a binary predicate to a binary delta operator.
 */

var ptod = function ( predicate ) {

	var delta = function ( a, b ) {

		return predicate( a, b ) ? -1 : 1;

	};

	return delta;

};

exports.ptod = ptod;
