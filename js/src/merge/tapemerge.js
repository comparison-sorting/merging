

var tapemerge = function ( compare, a, i, j, b, k, l, c, m ) {

	var n;

	n = m + j - i + l - k;

	for (; m < n; ++m) {
		if ( k >= l || ( i < j && compare( a[i], b[k] ) <= 0 ) ) {
			c[m] = a[i]; ++i;
		}
		else {
			c[m] = b[k]; ++k;
		}
	}

};

exports.tapemerge = tapemerge;
