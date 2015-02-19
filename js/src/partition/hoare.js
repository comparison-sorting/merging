

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

			else if ( compare( a[j] , x ) <= 0 ) {
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

			else if ( compare( x , a[i] ) <= 0 ) {
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
