
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
