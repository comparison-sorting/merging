

var lomuto = function ( predicate, a, i, j ) {

	var t, k, p;

	p = a[i];
	k = i + 1;

	--j;

	while ( k <= j ) {

		if ( predicate( p, a[k] ) ) {

			t    = a[k];
			a[k] = a[j];
			a[j] = t;

			--j;
		}

		else {
			++k;
		}

	}

	a[i]   = a[k-1];
	a[k-1] = p;

	return k - 1;
};

exports.lomuto = lomuto;
