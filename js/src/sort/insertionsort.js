


var insertionsort = function( diff, a, i, j ){

	var o, k, t;

	for ( k = i + 1 ; k < j ; ++k ) {

		t = k;
		o = a[t];

		while ( t --> i && diff( a[t], o ) > 0 ) {
			a[t + 1] = a[t];
		}

		a[t + 1] = o;
	}
};

exports.insertionsort = insertionsort;
