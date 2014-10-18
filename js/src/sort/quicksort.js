

/**
 * Template for the recursive implementation of quicksort.
 *
 *
 */

var __quicksort__ = function ( partition ) {

	var quicksort = function ( diff, a, i, j ) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition( diff, a, i, j );

		quicksort( diff, a, i, p );
		quicksort( diff, a, p + 1, j );
	};

	return quicksort;

};

exports.__quicksort__ = __quicksort__;
