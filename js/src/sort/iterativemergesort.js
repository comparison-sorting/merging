

var iterativemergesort = function ( merge , copy ) {

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
