import test from 'ava';
import * as merging from '../../src';

import compare from "@aureooms/js-compare" ;
import itertools from "@aureooms/js-itertools" ;


test( "iterables" , t => {

	t.deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ 1 , 5 ] , [ 2 , 3 , 4 ] ) ) ,
		[ 1 , 2 , 3 , 4 , 5 ] ,
		" 1 2 3 4 5"
	) ;

	t.deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ 1 ] , [ 2 , 3 , 4 ] ) ) ,
		[ 1 , 2 , 3 , 4 ] ,
		" 1 2 3 4"
	) ;

	t.deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ 1 , 5 ] , [ ] ) ) ,
		[ 1 , 5 ] ,
		" 1 5 "
	) ;

	t.deepEqual(
		itertools.list( merging.iterables( compare.increasing , [ ] , [ 2 , 3 , 4 ] ) ) ,
		[ 2 , 3 , 4 ] ,
		" 2 3 4 "
	) ;

} ) ;
