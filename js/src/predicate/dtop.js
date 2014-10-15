

/**
 * Converts a binary delta operator to a binary predicate.
 */

var dtop = function ( delta ) {

	var predicate = function ( a, b ) {

		return delta( a, b ) <= 0;

	};

	return predicate;

};

exports.dtop = dtop;
