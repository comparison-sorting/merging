

/**
 * Template for the recursive implementation of quicksort.
 *
 *
 */

var __quicksort__ = function (partition) {

	var quicksort = function (a, i, j, pred) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition(a, i, j, pred);

		quicksort(a, i, p, pred);
		quicksort(a, p + 1, j, pred);
	};

	return quicksort;

};

exports.__quicksort__ = __quicksort__;
