

/**
 * Template for the recursive implementation of quicksort.
 *
 *
 */

var __quicksort__ = function ( partition ) {

	var quicksort = function ( compare, a, i, j ) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition( compare, a, i, j );

		quicksort( compare, a, i, p );
		quicksort( compare, a, p + 1, j );
	};

	return quicksort;

};

exports.__quicksort__ = __quicksort__;
