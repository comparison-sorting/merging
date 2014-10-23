

var __merge__ = function ( index, copy ) {

	var merge = function ( a, ai, aj, b, bi, bj, c, ci ) {

		var o, q, t;

		o = ci - ai - bi;
		t = ai;

		for ( ; bi < bj ; ++bi ) {

			q = index( a, ai, aj, b[bi] );
			ai = q[0] + q[1];

			copy( a, t, ai, c, o + t + bi );

			c[o + ai + bi] = b[bi];
			t = ai;
		}

		copy( a, t, aj, c, o + t + bi );
	};

	return merge;

};

exports.__merge__ = __merge__;
