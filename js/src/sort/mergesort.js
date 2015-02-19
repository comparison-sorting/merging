

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
