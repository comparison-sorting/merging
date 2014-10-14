

var selectionsort = function ( predicate, a, i, j ) {

	var o, t, k;

	for ( ; i < j ; ++i ) {

		t = k = i;
		o = a[t];

		while ( ++t < j ) {

			if ( ! predicate( o, a[t] ) ) {
				o = a[t];
				k = t;
			}

		}

		if ( k > i ) {
			a[k] = a[i];
			a[i] = o;
		}

	}
};

exports.selectionsort = selectionsort;
