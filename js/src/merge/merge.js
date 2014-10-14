

var __merge__ = function ( index, copy ) {

	var merge = function ( a, i, j, b, k, l, c, m ) {

		var o, q, t;

		o = m - i - k;
		t = i;

		for (; k < l; ++k ) {

			q = index( a, i, j, b[k] );
			i = q[0] + q[1];

			copy( a, t, i, c, o + t + k );

			c[o + i + k] = b[k];
			t = i;
		}

		copy( a, t, j, c, o + t + k );
	};

	return merge;

};

exports.__merge__ = __merge__;
