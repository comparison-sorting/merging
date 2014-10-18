
/**
 * HYP : i < j
 *
 * http://cs.stackexchange.com/a/24099/20711
 */

var yaroslavskiy = function ( diff, a, i, j ) {

	var p, q, g, k, l;

	--j;

	// Choose outermost elements as pivots
	if ( diff( a[i], a[j] ) > 0 ) {
		swap(a, i, j);
	}

	p = a[i];
	q = a[j];

	// Partition a according to invariant below
	l = i + 1;
	g = j - 1;
	k = l;

	while ( k <= g ) {

		if ( diff( p, a[k] ) > 0 ) {

			swap( a, k, l );
			++l;

		}

		else if ( diff( q , a[k] ) <= 0 ) {

			while ( diff ( a[g], q ) > 0 && k < g ) {
				--g;
			}

			swap( a, k, g );
			--g;

			if ( diff( p, a[k] ) > 0 ) {

				swap( a, k, l );
				++l;

			}

		}

		++k;
	}

	--l;
	++g;

	// Swap pivots to final place
	swap( a, i, l );
	swap( a, j, g );

	return [l, g];

};

exports.yaroslavskiy = yaroslavskiy;
