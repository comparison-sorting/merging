
/**
 * Generates a binary lexicographical comparator
 * from a binary delta operator.
 *
 * Delta should always return
 *   - a negative value if a < b
 *   - a positive value if a > b
 *   - zero if a === b
 */

var lexicographical = function ( delta ) {

	/**
	 * Compares 2 arrays a and b lexicographically.
	 */

	return function ( a, b ) {

		var i, m, n, len, d;

		m = a.length;
		n = b.length;

		len = Math.min( m, n );

		for ( i = 0 ; i < len ; ++i ) {

			d = delta( a[i], b[i] );

			if ( d < 0 || d > 0 ) {
				return d;
			}

		}

		return m - n;

	};

};

exports.lexicographical = lexicographical;
