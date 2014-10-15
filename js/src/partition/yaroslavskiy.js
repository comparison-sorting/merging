
/**
 * http://cs.stackexchange.com/a/24099/20711
 */

var yaroslavskiy = function ( predicate, a, i, j ) {


	// Choose outermost elements as pivots
	if ( ! predicate( a[i], a[j] ) ) {
		swap(a, i, j);
	}

	p = a[i];
	q = a[j];

	// Partition a according to invariant below
	l = i + 1;
	g = j - 1;
	k = l;

	while ( k <= g ) {

		if ( ! predicate( p, a[k] ) ) {

			swap( a, k, l );
			++l;

		}

		else if ( predicate( q , a[k] ) ) {

			while ( ! predicate ( a[g], q ) && k < g ) {
				--g;
			}

			swap( a, k, g );
			--g;

			if ( ! predicate( p, a[k] ) ) {

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
