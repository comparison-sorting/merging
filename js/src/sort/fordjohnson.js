
var _fordjohnson = function ( binarysearch ) {

	var fordjohnson = function ( compare , swap , a , i , j ) {

		var m , k , t , y , p , q , r , x , l , w , s , pairswap ;

		if ( j - i < 2 ) return ;

		k = m = ( j - i ) / 2 | 0 ;

		// compare pairs of elements and put largest elements at the front of the
		// array

		while ( k-- ) {

			if ( compare( a[i+k] , a[i+m+k] ) < 0 ) {

				swap( a , i + k , i + m + k ) ;

			}

		}

		// sort the largest elements at the front recursively

		pairswap = function ( a , i , j ) {
			swap( a , i , j ) ;
			swap( a , i + m , j + m ) ;
		} ;

		fordjohnson( compare , pairswap , a , i , i + m ) ;

		// merge the rest of the array into the front, one item at a time

		p = y = t = 1 ;

		q = 0 ;

		while ( i + m + t <= j ) {

			r = t ;

			while ( r --> q ) {

				w = a[i+m+t-1] ;

				x = binarysearch( compare , a , i , i + m + q , w ) ;
				l = x[0] + x[1] ;

				s = i + m + t ;

				while ( --s > l ) {

					swap( a , s , s - 1 ) ;

				}

			}

			q = t ;

			p *= 2 ;
			y = p - 2 * t ;
			t += y ;

		}

		r = j - i - m ;

		while ( r --> q ) {

			w = a[j-1] ;

			x = binarysearch( compare , a , i , i + m + q , w ) ;
			l = x[0] + x[1] ;

			s = j ;

			while ( --s > l ) {

				swap( a , s , s - 1 ) ;

			}


		}

	} ;

	return fordjohnson ;

} ;

exports._fordjohnson = _fordjohnson ;
