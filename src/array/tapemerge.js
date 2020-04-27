

export function tapemerge ( compare , a , ai , aj , b , bi , bj , c , ci ) {

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

}

