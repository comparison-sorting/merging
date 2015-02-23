
var compare , increasing , decreasing , t ;

compare = require( "aureooms-js-compare" ) ;

t = function ( array , left , right , k1 , k2 ) {

	var n ;

	n = array.length ;

	ok( sort.issorted( compare.increasing , array , left , right ) === k1 ) ;
	ok( sort.issorted( compare.decreasing , array , left , right ) === k2 ) ;

	deepEqual( array.length , n ) ;

} ;

test( "issorted" , function ( ) {

	t( [ ] , 0 , 0 , 0 , 0 ) ;

	t( [ 0 , 1 , 2 ] , 1 , 1 , 1 , 1 ) ;

	t( [ 1 , 1 , 1 ] , 0 , 3 , 3 , 3 ) ;

	t( [ 1 , 2 , 3 ] , 0 , 3 , 3 , 1 ) ;

	t( [ 1 , 2 , 4 , 3 ] , 0 , 4 , 3 , 1 ) ;

	t( [ 1 , 0 , 1 , 1 , 2 , 3 , 1 , 0 , 1 ] , 3 , 6 , 6 , 4 ) ;

	t( [ 1 , 0 , 1 , 1 , 2 , 3 , 1 , 0 , 1 ] , 0 , 9 , 1 , 2 ) ;

} ) ;
