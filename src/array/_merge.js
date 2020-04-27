

export function _merge ( index, copy ) {

	let merge = function ( compare, a, ai, aj, b, bi, bj, c, ci ) {

		let o = ci - ai - bi;
		let t = ai;

		for ( ; bi < bj ; ++bi ) {

			let q = index( compare, a, ai, aj, b[bi] );
			ai = q[0] + q[1];

			copy( a, t, ai, c, o + t + bi );

			c[o + ai + bi] = b[bi];
			t = ai;
		}

		copy( a, t, aj, c, o + t + bi );
	};

	return merge;

}

