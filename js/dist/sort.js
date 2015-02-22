(function(exports, undefined){

	'use strict';


/* js/src/merge */
/* js/src/merge/binarymerge.js */


/**
 * Merges 2 arrays using the Hwang Lin algorithm.
 *
 *   /!\ aj - ai >= bj - bi
 */

var __binarymerge__ = function ( binarysearch, copy ) {

	var hwanglin = function ( compare, a, ai, aj, b, bi, bj, c, ci ) {

		var o, t, x, y, q, d, z;

		o = ci - ai - bi;
		t = ai;

		x = Math.pow( 2, Math.floor( Math.log( ( aj - ai ) / ( bj - bi ) ) ) );
		y = Math.floor( ( aj - ai ) / x ) + 1;


		while ( bi < bj && ( ai + x < aj || ( x = aj - ai - 1 ) ) ) {

			t = ai;
			ai = t + x;

			while ( bi < bj ) {

				if ( compare( b[bi], a[ai] ) >= 0 ) {
					copy( a, t, ai, c, o + t + bi );
					break;
				}

				q = binarysearch( compare, a, t, ai, b[bi] );
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

/* js/src/merge/merge.js */


var __merge__ = function ( index, copy ) {

	var merge = function ( compare, a, ai, aj, b, bi, bj, c, ci ) {

		var o, q, t;

		o = ci - ai - bi;
		t = ai;

		for ( ; bi < bj ; ++bi ) {

			q = index( compare, a, ai, aj, b[bi] );
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

/* js/src/merge/tapemerge.js */


var tapemerge = function ( compare , a , ai , aj , b , bi , bj , c , ci ) {

	var cj ;

	cj = ci + aj - ai + bj - bi ;

	for ( ; ci < cj ; ++ci ) {

		if ( bi >= bj || ( ai < aj && compare( a[ai] , b[bi] ) <= 0 ) ) {

			c[ci] = a[ai] ;
			++ai ;

		}

		else {

			c[ci] = b[bi] ;
			++bi ;

		}
	}

};

exports.tapemerge = tapemerge;

/* js/src/partition */
/* js/src/partition/hoare.js */


/**
 * HYP : i < j
 */

var hoare = function ( compare , a , i , j ) {

	var x , t , o ;

	o = i ;
	x = a[o] ;

	while ( true ) {

		while ( true ) {

			--j ;

			if ( i >= j ) {
				a[o] = a[j] ;
				a[j] = x ;
				return j ;
			}

			else if ( compare( x , a[j] ) > 0 ) {
				break ;
			}
		}

		while ( true ) {

			++i ;

			if ( i >= j ) {
				a[o] = a[j] ;
				a[j] = x ;
				return j ;
			}

			else if ( compare( x , a[i] ) < 0 ) {
				break ;
			}
		}


		// invariant i < j

		t    = a[i] ;
		a[i] = a[j] ;
		a[j] =    t ;

	}

} ;

exports.hoare = hoare ;
exports.partition = hoare ;

/* js/src/partition/lomuto.js */


var lomuto = function ( compare, a, i, j ) {

	var t, k, p;

	p = a[i];
	k = i + 1;

	--j;

	while ( k <= j ) {

		if ( compare( p, a[k] ) <= 0 ) {

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

var yaroslavskiy = function ( compare, a, i, j ) {

	var p, q, g, k, l;

	--j;

	// Choose outermost elements as pivots
	if ( compare( a[i], a[j] ) > 0 ) {
		swap(a, i, j);
	}

	p = a[i];
	q = a[j];

	// Partition a according to invariant below
	l = i + 1;
	g = j - 1;
	k = l;

	while ( k <= g ) {

		if ( compare( p, a[k] ) > 0 ) {

			swap( a, k, l );
			++l;

		}

		else if ( compare( q , a[k] ) <= 0 ) {

			while ( compare ( a[g], q ) > 0 && k < g ) {
				--g;
			}

			swap( a, k, g );
			--g;

			if ( compare( p, a[k] ) > 0 ) {

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

/* js/src/select */
/* js/src/select/multiselect.js */


var __multiselect__ = function ( partition, index ) {

	/**
	 * As long as partition and index are O(n) multiselect is O( n log n )
	 * on average.
	 */

	var multiselect = function ( compare, a, ai, aj, b, bi, bj ) {

		var p, q;

		if ( aj - ai < 2 || bj - bi === 0 ) {
			return;
		}

		p = partition( compare, a, ai, aj );
		q = index( b, bi, bj, p );

		multiselect( compare, a,    ai,  p,  b,          bi, q[1] );
		multiselect( compare, a, p + 1, aj,  b, q[0] + q[1],   bj );
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

	var quickselect = function ( compare, a, i, j, k ) {

		var p;

		if (j - i < 2) {
			return;
		}

		p = partition( compare, a, i, j );

		if (k < p) {
			quickselect( compare, a, i, p, k );
		}
		else if (k > p) {
			quickselect( compare, a, p + 1, j, k );
		}
	};

	return quickselect;

};

exports.__quickselect__ = __quickselect__;

/* js/src/sort */
/* js/src/sort/bubblesort.js */



var bubblesort = function ( compare, a, i, j ) {

	var swapped, k, s, t;

	s = j - 1;

	do {

		// we stop if the array is sorted
		// i.e. if no swap was required
		// in this step

		swapped = false;

		for ( k = i ; k < s ; ++k ) {

			if ( compare( a[k], a[k + 1] ) > 0 ) {

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

	var dualpivotquicksort = function ( compare, a, i, j ) {

		var p, g, l;

		if (j - i < 2) {
			return;
		}

		p = partition( compare, a, i, j );
		l = p[0];
		g = p[1];

		dualpivotquicksort( compare, a,   i  , l );
		dualpivotquicksort( compare, a, l + 1, g );
		dualpivotquicksort( compare, a, g + 1, j );
	};

	return dualpivotquicksort;

};

exports.__dualpivotquicksort__ = __dualpivotquicksort__;

/* js/src/sort/heapsort.js */


/**
 * Template for a raw implementation of heapsort.
 *
 *
 */

var __heapsort__ = function ( arity ) {

	/**
	 * Note that here we reverse the order of the
	 * comparison operator since when we extract
	 * values from the heap they can only be stored
	 * at the end of the array. We thus build a max-heap
	 * and then pop elements from it until it is empty.
	 */

	var heapsort = function ( compare, a, i, j ) {

		var k, y, t, current, parent, candidate, tmp;

		// construct the max-heap

		for ( k = i + 1 ; k < j ; ++k ) {

			current = k - i;

			// while we are not the root

			while ( current !== 0 ) {

				// address of the parent in a zero-based
				// d-ary heap

				parent = i + ( ( current - 1 ) / arity | 0 );
				current += i;

				// if current value is smaller than its parent
				// then we are done

				if ( compare( a[current], a[parent] ) <= 0 ) {
					break;
				}

				// otherwise
				// swap with parent

				tmp = a[current];
				a[current] = a[parent];
				a[parent] = tmp;

				current = parent - i;

			}

		}

		// exhaust the max-heap

		for ( --k ; k > i ; --k ) {

			// put max element at the end of the array
			// and percolate new max element down
			// the heap

			tmp = a[k];
			a[k] = a[i];
			a[i] = tmp;

			current = 0;

			while ( true ) {

				// address of the first child in a zero-based
				// d-ary heap

				candidate = i + arity * current + 1;

				// if current node has no children
				// then we are done

				if ( candidate >= k ) {
					break;
				}

				// search for greatest child

				t = Math.min( candidate + arity, k );

				y = candidate;

				for ( ++y ; y < t ; ++y ) {

					if ( compare( a[y], a[candidate] ) > 0 ) {
						candidate = y;
					}

				}

				// if current value is greater than its greatest
				// child then we are done

				current += i;

				if ( compare( a[current], a[candidate] ) >= 0 ) {
					break;
				}

				// otherwise
				// swap with greatest child

				tmp = a[current];
				a[current] = a[candidate];
				a[candidate] = tmp;

				current = candidate - i;

			}

		}

	};

	return heapsort;

};

exports.__heapsort__ = __heapsort__;

/* js/src/sort/insertionsort.js */



var insertionsort = function ( compare, a, i, j ) {

	var o, k, t;

	for ( k = i + 1 ; k < j ; ++k ) {

		t = k;
		o = a[t];

		while ( t --> i && compare( a[t], o ) > 0 ) {
			a[t + 1] = a[t];
		}

		a[t + 1] = o;
	}
};

exports.insertionsort = insertionsort;

/* js/src/sort/iterativemergesort.js */


var iterativemergesort = function ( merge , copy ) {

	/**
	 * Always makes at most A001855(n) comparisons.
	 *
	 */

	var mergesort = function ( compare , a , ai , aj , b , bi ) {

		var whole , left , center , right , mask , half ;
		var i , j , k ;
		var t , u , v , w , p ;
		var q , r , s ;
		var c ;

		whole = aj - ai ;

		left = 0 ;
		center = 2 ;
		right = 0 ;

		mask = 1 ;
		half = 1 ;

		while ( half < whole ) {

			// assert  left < center
			// assert right < center

			if ( left === 0 ) {

				// assert right = 0

				t = u = v = w = p = 0 ;

				j = whole ;
				i = left = j & mask ;

				q = ai ;
				r = q + left ;
				s = bi ;

			}

			else {

				if ( right === 0 ) {

					t = ai ;
					u = ai + left ;
					v = u ;
					w = u + half ;
					p = bi ;

					left += half ;
					i = left ;

					right = ( whole - left ) & mask ;
					j = whole - right ;

					r = aj ;

				}

				else {

					t = ai ;
					u = ai + left ;
					v = aj - right ;
					w = aj ;
					p = bi ;

					i = left ;
					left += right ;

					j = whole - right ;
					r = ai + j ;
					right = ( whole - left ) & mask ;
					j -= right ;

				}

				q = ai + j ;
				s = bi + whole - right ;

			}

			merge( compare , a , t , u , a , v , w , b , p ) ;

			copy( a , q , r , b , s ) ;

			for ( k = i ; k < j ; k += center ) {

				t = ai + k ;
				u = t + half ;
				v = t + center ;

				merge( compare , a , t , u , a , u , v , b , bi + left + k - i ) ;

			}

			c = a ;
			a = b ;
			b = c ;

			aj = bi + whole ;
			bi = ai ;
			ai = aj - whole ;

			mask |= center ;
			half <<= 1 ;
			center <<= 1 ;

		}

		return a ;

	} ;

	return mergesort ;

} ;

exports.iterativemergesort = iterativemergesort ;

/* js/src/sort/mergesort.js */


var __mergesort__ = function ( merge ) {

	/**
	 * if n = 2^k then
	 *    input is in a if k is odd
	 *    input is in b if k is even
	 * otherwise input is in both a and b
	 * output is in b
	 */

	var mergesort = function ( compare , a , ai , aj , b , bi , bj ) {

		var p ;

		if ( aj - ai < 2 ) {
			return ;
		}

		p = Math.floor( ( ai + aj ) / 2 ) ;

		mergesort( compare , b , bi , bi + p - ai , a , ai , p ) ;
		mergesort( compare , b , bi + p - ai , bj , a , p , aj ) ;

		merge( compare , a , ai , p , a , p , aj , b , bi ) ;

	} ;

	return mergesort ;

} ;

exports.__mergesort__ = __mergesort__ ;

/* js/src/sort/quicksort.js */


/**
 * Template for the recursive implementation of quicksort.
 * This template allows to generate a specific version of the quicksort
 * algorithm for a certain partitioning algorithm.
 *
 * @param {callable} partition the implementation for the partitioning step
 */

var __quicksort__ = function ( partition ) {


	/**
	 * Sorts interval [left,right) of the array parameter according to a
	 * compare method.
	 *
	 * @param {comparator} compare the comparator function
	 * @param {array} array random access array
	 * @param {offset} left inner left bound of the interval to sort
	 * @param {offset} right outer right bound of the interval to sort
	 *
	 */

	var quicksort = function ( compare , array , left , right ) {

		var pivot ;

		// in the case where interval [left,right) contains
		// only one element we are done!

		if ( right - left < 2 ) return ;

		// otherwise we partition interval [left,right) into three disjoint
		// subintervals [left,pivot), [pivot, pivot+1) and [pivot+1,right)
		// where the pivot is the position whose element
		// is greater or equal to all elements of the first subinterval
		// and less or equal to all elements of the third subinterval

		pivot = partition( compare , array , left , right ) ;

		// and then we just need to ask the recursion fairy
		// to sort the first and third subintervals

		// the recursion fairy sorts [left,pivot)
		quicksort( compare , array , left      , pivot ) ;

		// and then [pivot+1,right)
		quicksort( compare , array , pivot + 1 , right ) ;

	}

	return quicksort ;

}

exports.__quicksort__ = __quicksort__ ;

/* js/src/sort/selectionsort.js */


var selectionsort = function ( compare, a, i, j ) {

	var o, t, k;

	for ( ; i < j ; ++i ) {

		t = k = i;
		o = a[t];

		while ( ++t < j ) {

			if ( compare( o, a[t] ) > 0 ) {
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
/* js/src/utils/issorted.js */

/**
 * Checks whether range [left,right[ of array is sorted. Returns k <= right
 * such that [left,k[ is sorted.
 */

var issorted = function ( compare , array , left , right ) {

	while ( ++left < right ) {

		if ( compare( array[left-1] , array[left] ) > 0 ) {

			break ;

		}

	}

	return left ;

} ;

exports.issorted = issorted ;

/* js/src/utils/swap.js */

var swap = function ( a, i, j ) {

	var t;

	t    = a[i];
	a[i] = a[j];
	a[j] = t;

};

exports.swap = swap;

/* js/src/utils/whole.js */


var whole = function ( sort ) {

	return function ( compare, array ) {

		sort( compare, array, 0, array.length );

	};

};

exports.whole = whole;

})(typeof exports === 'undefined' ? this['sort'] = {} : exports);
