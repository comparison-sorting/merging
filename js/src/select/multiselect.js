

var __multiselect__ = function ( partition, index ) {

	/**
	 * As long as partition and index are O(n) multiselect is O( n log n )
	 * on average.
	 */

	var multiselect = function ( diff, a, ai, aj, b, bi, bj ) {

		var p, q;

		if ( aj - ai < 2 || bj - bi === 0 ) {
			return;
		}

		p = partition( diff, a, ai, aj );
		q = index( b, bi, bj, p );

		multiselect( diff, a,    ai,  p,  b,          bi, q[1] );
		multiselect( diff, a, p + 1, aj,  b, q[0] + q[1],   bj );
	};

	return multiselect;

};

exports.__multiselect__ = __multiselect__;
