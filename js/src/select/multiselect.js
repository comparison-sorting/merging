

var __multiselect__ = function (partition, search) {

	var multiselect = function (k, l, r, a, i, j, pred, delta) {

		var p, q;

		if (j - i < 2 || r - l === 0) {
			return;
		}

		p = partition(a, i, j, pred);
		q = search(p, k, l, r, delta);

		multiselect(k, l, q[1], a, i, p);
		multiselect(k, q[0] + q[1], r, a, p + 1, j);
	};

	return multiselect;

};

exports.__multiselect__ = __multiselect__;
