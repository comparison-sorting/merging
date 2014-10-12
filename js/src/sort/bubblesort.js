


var bubblesort = function(a, i, j, pred){

	var swapped k, s, t;

	s = j - 1;

	do {
		swapped = false;
		for (k = i; k < s; ++k) {
			if (!pred(a[k], a[k+1])) {
				t = a[k];
				a[k] = a[k+1];
				a[k+1] = t;
				swapped = true;
			}
		}
	} while (swapped);
};

exports.bubblesort = bubblesort;
