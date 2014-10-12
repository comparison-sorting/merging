

var selectionsort = function (a, i, j, pred) {

	var o, t, k;

	for (; i < j; ++i) {
		t = k = i;
		o = a[t];

		while (++t < j)
			if (!pred(o, a[t])) {
				o = a[t];
				k = t;
			}

		if (k > i) {
			a[k] = a[i];
			a[i] = o;
		}

	}
};

exports.selectionsort = selectionsort;
