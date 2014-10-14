

/**
 * Template for the recursive implementation of quicksort.
 *
 *
 */

var __quicksort__ = function ( partition ) {

	var quicksort = function ( predicate, a, i, j ) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition( predicate, a, i, j );

		quicksort( predicate, a, i, p );
		quicksort( predicate, a, p + 1, j );
	};

	return quicksort;

};

exports.__quicksort__ = __quicksort__;
