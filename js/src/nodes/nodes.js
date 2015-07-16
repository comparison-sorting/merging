
const nodes = function ( compare , A , m , B , n ) {

	if ( m <= 0 ) return B ;
	if ( n <= 0 ) return A ;

	if ( compare( A.value , B.value ) <= 0 ) {

		A.next = nodes( compare , A.next , --m , B , n ) ;

		return A ;

	}

	else {

		B.next = nodes( compare , A , m , B.next , --n ) ;

		return B ;
	}

} ;

exports.nodes = nodes ;
