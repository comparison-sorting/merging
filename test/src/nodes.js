import test from 'ava';
import * as merging from '../../src';

import sll from "@aureooms/js-sll" ;
import compare from "@aureooms/js-compare" ;
import itertools from "@aureooms/js-itertools" ;
import functools from "@aureooms/js-functools" ;

var w = sll.list ;
var r = functools.compose( [ itertools.list , sll.iter ] ) ;

var t = function ( compare , A , B , expected , text ) {

	t.deepEqual(
		r( merging.nodes( compare , w(A) , A.length , w(B) , B.length ) ) ,
		expected ,
		text
	) ;
} ;

test( "iterables" , t => {

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
