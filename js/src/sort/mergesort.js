

var __mergesort__ = function ( merge, copy ) {

	var mergesort = function ( compare, a, i, j, d, l, r) {

		var p, t;

		if ( j - i < 2 ) {
			return;
		}

		p = Math.floor( ( i + j ) / 2 );

		mergesort( compare, a, i, p, d, l, l + p - i );
		mergesort( compare, a, p, j, d, l + p - i, r );

		merge( compare, a, i, p, a, p, j, d, l );

		//copy ( d, l, l + j - i, a, i );

		for(t = 0; t < j - i; ++t) {
			a[i + t] = d[l + t];
		}
	};

	return mergesort;

};

exports.__mergesort__ = __mergesort__;
