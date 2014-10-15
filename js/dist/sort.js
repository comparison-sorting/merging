(function(exports, undefined){

	'use strict';


/* js/src/merge */
/* js/src/merge/binarymerge.js */


/**
 * Merges 2 arrays using the Hwang Lin algorithm.
 *
 *   /!\ j - i >= l - k
 */

var __binarymerge__ = function ( binarysearch, delta, copy ) {

	var hwanglin = function ( a, i, j, b, k, l, c, m ) {

		var o, t, x, y, q, d, z;

		o = m - i - k;
		t = i;

		x = Math.pow(2, Math.floor(Math.log((j-i)/(l-k))));
		y = Math.floor((j-i) / x) + 1;


		while (k < l && (i + x < j || (x = j - i))) {
			t = i;
			i = t + x;
			while (k < l) {
				if (delta(b[k], a[i]) >= 0) {
					copy(a, t, i, c, o + t + k);
					break;
				}
				q = binarysearch( delta, a, t, i, b[k] );
				z = q[0] + q[1];
				copy(a, t, z, c, o + t + k);
				c[o + z + k] = b[k];
				t = z;
				++k;
			}
		}

		copy(a, t, j, c, o + t + k);
		copy(b, k, l, c, o + j + k);

	};

	return hwanglin;

};

exports.__binarymerge__ = __binarymerge__;

/* js/src/merge/merge.js */


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

/* js/src/merge/tapemerge.js */


var tapemerge = function ( pred, a, i, j, b, k, l, c, m ) {

	var n;

	n = m + j - i + l - k;

	for (; m < n; ++m) {
		if (k >= l || (i < j && pred(a[i], b[k]))) {
			c[m] = a[i]; ++i;
		}
		else {
			c[m] = b[k]; ++k;
		}
	}

};

exports.tapemerge = tapemerge;

/* js/src/partition */
/* js/src/partition/hoare.js */


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

			else if ( predicate( a[j], x ) ) {
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

			else if ( predicate( x, a[i] ) ) {
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

/* js/src/partition/lomuto.js */


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

/* js/src/partition/yaroslavskiy.js */

/**
 * HYP : i < j
 *
 * http://cs.stackexchange.com/a/24099/20711
 */

var yaroslavskiy = function ( predicate, a, i, j ) {

	var p, q, g, k, l;

	--j;

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

/* js/src/predicate */
/* js/src/predicate/decreasing.js */

var decreasing = function ( a, b ) {
	return b - a;
};

exports.decreasing = decreasing;

/* js/src/predicate/dtop.js */


/**
 * Converts a binary delta operator to a binary predicate.
 */

var dtop = function ( delta ) {

	var predicate = function ( a, b ) {

		return delta( a, b ) <= 0;

	};

	return predicate;

};

exports.dtop = dtop;

/* js/src/predicate/eqz.js */


var eqz = function ( v ) {
	return v === 0;
};

exports.eqz = eqz;

/* js/src/predicate/gez.js */


var gez = function ( v ) {
	return v >= 0;
};

exports.gez = gez;

/* js/src/predicate/gtz.js */


var gtz = function ( v ) {
	return v > 0;
};

exports.gtz = gtz;

/* js/src/predicate/increasing.js */

var increasing = function ( a, b ) {
	return a - b;
};

exports.increasing = increasing;

/* js/src/predicate/lexicographical.js */

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

/* js/src/predicate/lez.js */


var lez = function ( v ) {
	return v <= 0;
};

exports.lez = lez;

/* js/src/predicate/ltz.js */


var ltz = function ( v ) {
	return v < 0;
};

exports.ltz = ltz;

/* js/src/predicate/negate.js */


var negate = function ( delta ) {

	return function ( a, b ) {
		return delta ( b, a );
	};

};

exports.negate = negate;

/* js/src/predicate/nez.js */


var nez = function ( v ) {
	return v !== 0;
};

exports.nez = nez;

/* js/src/predicate/ptod.js */


/**
 * Converts a binary predicate to a binary delta operator.
 */

var ptod = function ( predicate ) {

	var delta = function ( a, b ) {

		return predicate( a, b ) ? -1 : 1;

	};

	return delta;

};

exports.ptod = ptod;

/* js/src/predicate/sign.js */

var sign = function ( v ) {

	return v < 0 ? -1 : v > 0 ? 1 : 0;

};

exports.sign = sign;

/* js/src/select */
/* js/src/select/multiselect.js */


var __multiselect__ = function ( partition, index ) {

	/**
	 * As long as partition and index are O(n) multiselect is O( n log n )
	 * on average.
	 */

	var multiselect = function ( pred, a, ai, aj, b, bi, bj ) {

		var p, q;

		if ( aj - ai < 2 || bj - bi === 0 ) {
			return;
		}

		p = partition( pred, a, ai, aj );
		q = index( b, bi, bj, p );

		multiselect( pred, a,    ai,  p,  b,          bi, q[1] );
		multiselect( pred, a, p + 1, aj,  b, q[0] + q[1],   bj );
	};

	return multiselect;

};

exports.__multiselect__ = __multiselect__;

/* js/src/select/quickselect.js */

/**
 * Template for the recursive implementation of quickselect.
 *
 */

var __quickselect__ = function ( partition ) {

	var quickselect = function ( predicate, a, i, j, k ) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition( predicate, a, i, j );

		if (k < p) {
			quickselect( predicate, a, i, p, k );
		}
		else if (k > p) {
			quickselect( predicate, a, p + 1, j, k );
		}
	};

	return quickselect;

};

exports.__quickselect__ = __quickselect__;

/* js/src/sort */
/* js/src/sort/bubblesort.js */



var bubblesort = function ( pred, a, i, j ) {

	var swapped, k, s, t;

	s = j - 1;

	do {

		// we stop if the array is sorted
		// i.e. if no swap was required
		// in this step

		swapped = false;

		for ( k = i ; k < s ; ++k ) {

			if ( !pred( a[k], a[k + 1] ) ) {

				// swap boxes

				t = a[k];
				a[k] = a[k + 1];
				a[k + 1] = t;

				swapped = true;

			}

		}

	} while ( swapped );
};

exports.bubblesort = bubblesort;

/* js/src/sort/dualpivotquicksort.js */

var __dualpivotquicksort__ = function ( partition ) {

	var dualpivotquicksort = function ( predicate, a, i, j ) {

		var p, g, l;

		if (j - i < 2) {
			return;
		}

		p = partition( predicate, a, i, j );
		l = p[0];
		g = p[1];

		dualpivotquicksort( predicate, a,   i  , l );
		dualpivotquicksort( predicate, a, l + 1, g );
		dualpivotquicksort( predicate, a, g + 1, j );
	};

	return dualpivotquicksort;

};

exports.__dualpivotquicksort__ = __dualpivotquicksort__;

/* js/src/sort/insertionsort.js */



var insertionsort = function( pred, a, i, j ){

	var o, k, t;

	for (k = i + 1; k < j; ++k) {

		t = k;
		o = a[t];

		while (t --> i && !pred(a[t], o)) {
			a[t + 1] = a[t];
		}

		a[t + 1] = o;
	}
};

exports.insertionsort = insertionsort;

/* js/src/sort/mergesort.js */


var __mergesort__ = function ( merge, copy ) {

	var mergesort = function ( predicate, a, i, j, d, l, r) {

		var p, t;

		if ( j - i < 2 ) {
			return;
		}

		p = Math.floor( ( i + j ) / 2 );

		mergesort( predicate, a, i, p, d, l, l + p - i );
		mergesort( predicate, a, p, j, d, l + p - i, r );

		merge( predicate, a, i, p, a, p, j, d, l );

		//copy ( d, l, l + j - i, a, i );

		for(t = 0; t < j - i; ++t) {
			a[i + t] = d[l + t];
		}
	};

	return mergesort;

};

exports.__mergesort__ = __mergesort__;

/* js/src/sort/quicksort.js */


/**
 * Template for the recursive implementation of quicksort.
 *
 *
 */

var __quicksort__ = function ( partition ) {

	var quicksort = function ( predicate, a, i, j ) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition( predicate, a, i, j );

		quicksort( predicate, a, i, p );
		quicksort( predicate, a, p + 1, j );
	};

	return quicksort;

};

exports.__quicksort__ = __quicksort__;

/* js/src/sort/selectionsort.js */


var selectionsort = function ( predicate, a, i, j ) {

	var o, t, k;

	for ( ; i < j ; ++i ) {

		t = k = i;
		o = a[t];

		while ( ++t < j ) {

			if ( ! predicate( o, a[t] ) ) {
				o = a[t];
				k = t;
			}

		}

		if ( k > i ) {
			a[k] = a[i];
			a[i] = o;
		}

	}
};

exports.selectionsort = selectionsort;

/* js/src/utils */
/* js/src/utils/swap.js */

var swap = function ( a, i, j ) {

	var t;

	t    = a[i];
	a[i] = a[j];
	a[j] = t;

};

exports.swap = swap;

})(typeof exports === 'undefined' ? this['sort'] = {} : exports);
