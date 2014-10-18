

var __mergesort__ = function ( merge, copy ) {

	var mergesort = function ( diff, a, i, j, d, l, r) {

		var p, t;

		if ( j - i < 2 ) {
			return;
		}

		p = Math.floor( ( i + j ) / 2 );

		mergesort( diff, a, i, p, d, l, l + p - i );
		mergesort( diff, a, p, j, d, l + p - i, r );

		merge( diff, a, i, p, a, p, j, d, l );

		//copy ( d, l, l + j - i, a, i );

		for(t = 0; t < j - i; ++t) {
			a[i + t] = d[l + t];
		}
	};

	return mergesort;

};

exports.__mergesort__ = __mergesort__;
