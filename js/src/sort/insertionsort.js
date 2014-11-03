


var insertionsort = function ( compare, a, i, j ) {

	var o, k, t;

	for ( k = i + 1 ; k < j ; ++k ) {

		t = k;
		o = a[t];

		while ( t --> i && compare( a[t], o ) > 0 ) {
			a[t + 1] = a[t];
		}

		a[t + 1] = o;
	}
};

exports.insertionsort = insertionsort;
