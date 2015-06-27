

let _binarymerge = function ( binarysearch , copy ) {

	/**
	 * Merges 2 arrays using the Hwang Lin algorithm.
	 *
	 *   /!\ aj - ai >= bj - bi
	 */

	let hwanglin = function ( compare , a , ai , aj , b , bi , bj , c , ci ) {

		const o = ci - ai - bi ;
		let t = ai ;

		const m = aj - ai ;
		const n = bj - ai ;

		// g is the size of a block

		let g = Math.pow( 2 , Math.floor( Math.log( m / n ) / Math.log( 2 ) ) ) ;

		blocks : while ( bi < bj && ( ai + g < aj || ( g = aj - ai - 1 ) ) ) {

			// for each block

			// t is the inner left bound
			t = ai ;

			// ai is the inner right bound
			ai = t + g ;

			while ( bi < bj ) {

				// we will try to insert b_i in this block

				if ( compare( b[bi] , a[ai] ) >= 0 ) {

					// b_i must be inserted to the left of this block
					// we copy the block to the output array and continue
					// with the next block
					copy( a , t , ai , c , o + t + bi ) ;
					continue blocks ;

				}

				// b_i is inside this block and smaller than a_i
				// we search its insertion position using a binary search algorithm
				let q = binarysearch( compare , a , t , ai , b[bi] ) ;

				// z is the insertion position
				let z = q[0] + q[1] ;

				// copy everything to the left of the insertion position
				// to the output array
				copy( a , t , z , c , o + t + bi ) ;

				// copy b_i to its insertion position in the output array
				c[o + bi + z] = b[bi] ;

				// update the inner left bound of the block
				t = z ;

				// go to the next b_i
				++bi ;

			}

		}

		// remaining elements are copied to the output array
		copy( a ,  t , aj , c , o +  t + bi ) ;
		copy( b , bi , bj , c , o + aj + bi ) ;

	} ;

	return hwanglin ;

} ;

exports._binarymerge = _binarymerge ;
