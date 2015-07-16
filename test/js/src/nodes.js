
var compare = require( "aureooms-js-compare" ) ;

var w = function ( list ) {

	if ( list.length === 0 ) return null ;

	return {
		value : list[0] ,
		next  : w( list.slice( 1 ) )
	} ;

} ;

var r = function ( head ) {

	if ( head === null ) return [ ] ;

	return [ head.value ].concat( r( head.next ) ) ;

} ;

var one = function ( compare , A , B , expected , text ) {

	deepEqual(
		r( merging.nodes( compare , w(A) , A.length , w(B) , B.length ) ) ,
		expected ,
		text
	) ;
} ;

test( "iterables" , function ( ) {

	one( compare.increasing , [ 1 , 5 ] , [ 2 , 3 , 4 ] ,
		[ 1 , 2 , 3 , 4 , 5 ] ,
		" 1 2 3 4 5"
	) ;


	one( compare.increasing , [ 1 ] , [ 2 , 3 , 4 ] ,
		[ 1 , 2 , 3 , 4 ] ,
		" 1 2 3 4"
	) ;


	one( compare.increasing , [ 1 , 5 ] , [ ] ,
		[ 1 , 5 ] ,
		" 1 5 "
	) ;


	one( compare.increasing , [ ] , [ 2 , 3 , 4 ] ,
		[ 2 , 3 , 4 ] ,
		" 2 3 4 "
	) ;

} ) ;
