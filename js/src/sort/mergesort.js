

var __mergesort__ = function (merge) {

	var mergesort = function (a, i, j, d, l, r, pred) {

		var p, t;

		if(j - i < 2) return;

		p = Math.floor((i + j) / 2);

		mergesort(a, i, p, d, l, l + p - i, pred);
		mergesort(a, p, j, d, l + p - i, r, pred);

		merge(a, i, p, a, p, j, d, l, pred);

		for(t = 0; t < j - i; ++t) {
			a[i + t] = d[l + t];
		}
	};

	return mergesort;

};

exports.__mergesort__ = __mergesort__;
