
export function iterables* ( compare , A , B ) {

	A = A[Symbol.iterator]( ) ;
	B = B[Symbol.iterator]( ) ;

	let _a = A.next( ) ;

	if ( _a.done ) { yield* B ; return ; }

	let a = _a.value ;

	let _b = B.next( ) ;

	if ( _b.done ) { yield a ; yield* A ; return ; }

	let b = _b.value ;

	while ( true ) {

		// <= makes merge stable
		if ( compare( a , b ) <= 0 ) {

			yield a ;

			_a = A.next( ) ;

			if ( _a.done ) {

				yield b ;
				yield* B ;
				return ;

			}

			a = _a.value ;

		}

		else {

			yield b ;

			_b = B.next( ) ;

			if ( _b.done ) {

				yield a ;
				yield* A ;
				return ;

			}

			b = _b.value ;

		}

	}

}

