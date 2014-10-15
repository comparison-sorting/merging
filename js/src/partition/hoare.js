

/**
 * HYP : i < j
 */

var hoare = function ( predicate, a, i, j ) {

	var x, t, o;

	o = i;
	x = a[o];

	while ( true ) {

		while ( true ) {

			--j;

			if ( i >= j ) {
				t    = a[o];
				a[o] = a[j];
				a[j] = t;
				return j;
			}

			if ( predicate( a[j], x ) ) {
				break;
			}
		}

		while ( true ) {

			++i;

			if ( i >= j ) {
				t    = a[o];
				a[o] = a[j];
				a[j] = t;
				return j;
			}

			if ( predicate( x, a[i] ) ) {
				break;
			}
		}


		// invariant i < j

		t    = a[i];
		a[i] = a[j];
		a[j] = t;

	}

};

exports.hoare = hoare;
exports.partition = hoare;
