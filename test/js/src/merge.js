var all, util, array, search, random, compare, functools, itertools;

util = require( "util" );
array = require( "aureooms-js-array" );
search = require( "aureooms-js-search" );
random = require( "aureooms-js-random" );
compare = require( "aureooms-js-compare" );
functools = require( "aureooms-js-functools" );
itertools = require( "aureooms-js-itertools" );

all = function ( comparename, compare, mergename, merge, m, n, type ) {

	var title;

	title = util.format( "%s (new %s(%d, %d), %s)", mergename, type.name, m, n, comparename );

	console.log( title );

	test( title, function () {

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

		deepEqual( sort.issorted( compare , d , 0 , n + m ) , n + m , "check sorted" );
		deepEqual( a.length, m, "check length a" );
		deepEqual( b.length, n, "check length b" );
		deepEqual( d.length, n + m, "check length d" );
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
	[ "merge" , sort.__merge__( search.binarysearch, array.copy ) ],
	[ "binarymerge" , sort.__binarymerge__( search.binarysearch, array.copy ) ],
	[ "tapemerge" , sort.tapemerge ]
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
