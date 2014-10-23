

/**
 * Merges 2 arrays using the Hwang Lin algorithm.
 *
 *   /!\ aj - ai >= bj - bi
 */

var __binarymerge__ = function ( binarysearch, copy ) {

	var hwanglin = function ( diff, a, ai, aj, b, bi, bj, c, ci ) {

		var o, t, x, y, q, d, z;

		o = ci - ai - bi;
		t = ai;

		x = Math.pow( 2, Math.floor( Math.log( ( aj - ai ) / ( bj - bi ) ) ) );
		y = Math.floor( ( aj - ai ) / x ) + 1;


		while ( bi < bj && ( ai + x < aj || ( x = aj - ai ) ) ) {

			t = ai;
			ai = t + x;

			while ( bi < bj ) {

				if ( diff( b[bi], a[ai] ) >= 0 ) {
					copy( a, t, ai, c, o + t + bi );
					break;
				}

				q = binarysearch( diff, a, t, ai, b[bi] );
				z = q[0] + q[1];

				copy( a, t, z, c, o + t + bi );
				c[o + z + bi] = b[bi];
				t = z;
				++bi;
			}
		}

		copy( a, t, aj, c, o + t + bi );
		copy( b, bi, bj, c, o + aj + bi );

	};

	return hwanglin;

};

exports.__binarymerge__ = __binarymerge__;
