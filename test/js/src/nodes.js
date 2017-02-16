
var sll = require( "@aureooms/js-sll" ) ;
var compare = require( "@aureooms/js-compare" ) ;
var itertools = require( "@aureooms/js-itertools" ) ;
var functools = require( "@aureooms/js-functools" ) ;

var w = sll.list ;
var r = functools.compose( [ itertools.list , sll.iter ] ) ;

var t = function ( compare , A , B , expected , text ) {

	deepEqual(
		r( merging.nodes( compare , w(A) , A.length , w(B) , B.length ) ) ,
		expected ,
		text
	) ;
} ;

test( "iterables" , function ( ) {

	t( compare.increasing , [ 1 , 5 ] , [ 2 , 3 , 4 ] ,
		[ 1 , 2 , 3 , 4 , 5 ] ,
		" 1 2 3 4 5"
	) ;


	t( compare.increasing , [ 1 ] , [ 2 , 3 , 4 ] ,
		[ 1 , 2 , 3 , 4 ] ,
		" 1 2 3 4"
	) ;


	t( compare.increasing , [ 1 , 5 ] , [ ] ,
		[ 1 , 5 ] ,
		" 1 5 "
	) ;


	t( compare.increasing , [ ] , [ 2 , 3 , 4 ] ,
		[ 2 , 3 , 4 ] ,
		" 2 3 4 "
	) ;

} ) ;
