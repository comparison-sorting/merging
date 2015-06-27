
var compare = require( "aureooms-js-compare" ) ;
var itertools = require( "aureooms-js-itertools" ) ;


test( "iterables" , function ( ) {

	deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ 1 , 5 ] , [ 2 , 3 , 4 ] ) ) ,
		[ 1 , 2 , 3 , 4 , 5 ] ,
		" 1 2 3 4 5"
	) ;

	deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ 1 ] , [ 2 , 3 , 4 ] ) ) ,
		[ 1 , 2 , 3 , 4 ] ,
		" 1 2 3 4"
	) ;

	deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ 1 , 5 ] , [ ] ) ) ,
		[ 1 , 5 ] ,
		" 1 5 "
	) ;

	deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ ] , [ 2 , 3 , 4 ] ) ) ,
		[ 2 , 3 , 4 ] ,
		" 2 3 4 "
	) ;

} ) ;
