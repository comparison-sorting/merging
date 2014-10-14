
/**
 * Template for the recursive implementation of quickselect.
 *
 */

var __quickselect__ = function ( partition ) {

	var quickselect = function ( predicate, a, i, j, k ) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition( predicate, a, i, j );

		if (k < p) {
			quickselect( predicate, a, i, p, k );
		}
		else if (k > p) {
			quickselect( predicate, a, p + 1, j, k );
		}
	};

	return quickselect;

};

exports.__quickselect__ = __quickselect__;
