
/**
 * HYP : i < j
 *
 * http://cs.stackexchange.com/a/24099/20711
 */

var yaroslavskiy = function ( compare , a , i , j ) {

	var p , q , g , k , l , t ;

	--j ;

	// Choose outermost elements as pivots
	if ( compare( a[i] , a[j] ) > 0 ) {

		t    = a[i] ;
		a[i] = a[j] ;
		a[j] =    t ;

	}

	p = a[i] ;
	q = a[j] ;

	// Partition a according to invariant below
	l = i + 1 ;
	g = j - 1 ;
	k = l ;

	while ( k <= g ) {

		if ( compare( p , a[k] ) > 0 ) {

			t    = a[k] ;
			a[k] = a[l] ;
			a[l] =    t ;

			++l ;

		}

		else if ( compare( q , a[k] ) <= 0 ) {

			while ( compare ( a[g] , q ) > 0 && k < g ) {
				--g ;
			}

			t    = a[k] ;
			a[k] = a[g] ;
			a[g] =    t ;
			--g ;

			if ( compare( p, a[k] ) > 0 ) {

				t    = a[k] ;
				a[k] = a[l] ;
				a[l] =    t ;
				++l ;

			}

		}

		++k ;
	}

	--l ;
	++g ;

	// Swap pivots to final place

	t    = a[i] ;
	a[i] = a[l] ;
	a[l] =    t ;

	t    = a[j] ;
	a[j] = a[g] ;
	a[g] =    t ;

	return [ l , g ] ;

} ;

exports.yaroslavskiy = yaroslavskiy ;
