

var tapemerge = function ( pred, a, i, j, b, k, l, c, m ) {

	var n;

	n = m + j - i + l - k;

	for (; m < n; ++m) {
		if (k >= l || (i < j && pred(a[i], b[k]))) {
			c[m] = a[i]; ++i;
		}
		else {
			c[m] = b[k]; ++k;
		}
	}

};

exports.tapemerge = tapemerge;
