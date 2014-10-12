
/**
 * Template for the recursive implementation of quickselect.
 *
 */

var __quickselect__ = function (partition) {

	var quickselect = function (k, a, i, j, pred) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition(a, i, j, pred);

		if (k < p) {
			quickselect(k, a, i, p, pred);
		}
		else if (k > p) {
			quickselect(k, a, p + 1, j, pred);
		}
	};

	return quickselect;

};

exports.__quickselect__ = __quickselect__;
