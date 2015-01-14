

/**
 * Template for the recursive implementation of quicksort.
 * This template allows to generate a specific version of the quicksort
 * algorithm for a certain partitioning algorithm.
 *
 * @param {callable} partition the implementation for the partitioning step
 */

var __quicksort__ = function ( partition ) {


	/**
	 * Sorts interval [left,right) of the array parameter according to a
	 * compare method.
	 *
	 * @param {comparator} compare the comparator function
	 * @param {array} array random access array
	 * @param {offset} left inner left bound of the interval to sort
	 * @param {offset} right outer right bound of the interval to sort
	 *
	 */

	var quicksort = function ( compare , array , left , right ) {

		var pivot ;

		// in the case where interval [left,right) contains
		// only one element we are done!

		if ( right - left < 2 ) return ;

		// otherwise we partition interval [left,right) into three disjoint
		// subintervals [left,pivot), [pivot, pivot+1) and [pivot+1,right)
		// where the pivot is the position whose element
		// is greater or equal to all elements of the first subinterval
		// and less or equal to all elements of the third subinterval

		pivot = partition( compare , array , left , right ) ;

		// and then we just need to ask the recursion fairy
		// to sort the first and third subintervals

		// the recursion fairy sorts [left,pivot)
		quicksort( compare , array , left      , pivot ) ;

		// and then [pivot+1,right)
		quicksort( compare , array , pivot + 1 , right ) ;

	}

	return quicksort ;

}

exports.__quicksort__ = __quicksort__ ;
