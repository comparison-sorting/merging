import test from 'ava';
import * as merging from '../../src';

import util from "util" ;
import * as sort from "@aureooms/js-sort" ;
import * as array from "@aureooms/js-array" ;
import search from "@aureooms/js-search" ;
import * as random from "@aureooms/js-random" ;
import * as compare from "@aureooms/js-compare" ;
import functools from "@aureooms/js-functools" ;
import * as itertools from "@aureooms/js-itertools" ;

function all ( comparename, compare, mergename, merge, m, n, type ) {

	const title = util.format( "%s (new %s(%d, %d), %s)", mergename, type.name, m, n, comparename );

test( title, t => {

		var a, b, d, j;

		a = new type( m );

		for ( j = 0 ; j < m ; ++j ) {
			a[j] = random.randint( 0, m );
		}

		array.sort( compare, a );

		b = new type(n);
		for ( j = 0 ; j < n ; ++j ) {
			b[j] = random.randint( 0, n );
		}
		array.sort( compare, b );

		d = new type( n + m );

		// MERGE ARRAYS
		merge( compare, a, 0, m, b, 0, n, d, 0 );

		t.deepEqual( sort.issorted( compare , d , 0 , n + m ) , n + m , "check sorted" );
		t.deepEqual( a.length, m, "check length a" );
		t.deepEqual( b.length, n, "check length b" );
		t.deepEqual( d.length, n + m, "check length d" );
	});
};

itertools.exhaust( itertools.map(

functools.chain( [ itertools.chain , itertools.list , functools.partial( functools.star,

	[ function ( comparename, compare, mergename, merge, m, n, type ) {

		if ( type.BYTES_PER_ELEMENT && m > Math.pow( 2, type.BYTES_PER_ELEMENT * 8 ) ) {
			return;
		}

		if ( m < n ) {
			return;
		}

		all( comparename, compare, mergename, merge, m, n, type );

	} ]
) ] ),

itertools.product([

[
	[ "increasing", compare.increasing ],
	[ "decreasing", compare.decreasing ]
],

[
	[ "merge" , merging._merge( search.binarysearch, array.copy ) ],
	[ "static hwang-lin" , merging._hlstatic( search.binarysearch, array.copy ) ],
	[ "tapemerge" , merging.tapemerge ]
],

[[0], [1], [2], [10], [63], [64], [65]],
[[0], [1], [2], [10], [63], [64], [65]],

[
	[ Array ],
	[ Int8Array ],
	[ Uint8Array ],
	[ Int16Array ],
	[ Uint16Array ],
	[ Int32Array ],
	[ Uint32Array ],
	[ Float32Array ],
	[ Float64Array ]
]

], 1 ) ) ) ;
