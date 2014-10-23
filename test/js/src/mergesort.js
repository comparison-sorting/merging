var all, util, array, random, operator, functools, itertools, shuffle;

util = require( "util" );
array = require( "aureooms-js-array" );
random = require( "aureooms-js-random" );
operator = require( "aureooms-js-operator" );
functools = require( "aureooms-js-functools" );
itertools = require( "aureooms-js-itertools" );

shuffle = random.__shuffle__( random.__sample__( random.randint ) );

all = function( diffname, diff, mergesortname, mergesort, n, type ) {

	var title;

	title = util.format( "%s (new %s(%d), %s)", mergesortname, type.name, n, diffname );

	console.log( title );

	test( title, function () {

		var a, d, i, sorted;

		// SETUP ARRAY, DEST
		a = new type( n );
		d = new type( n );
		array.iota( a, 0, n, 0 );

		// SORT ARRAY
		shuffle( a, 0, n );
		mergesort( diff, a, 0, n, d, 0, n );

		// TEST PREDICATE
		i = d.length;
		sorted = true;

		if ( i > 1 ) {

			while (--i) {

				if ( diff( d[i-1], d[i] ) > 0 ) {
					sorted = false;
					break;
				}

			}

		}

		ok( sorted, "check sorted" );
		deepEqual( a.length, n, "check length a" );
		deepEqual( d.length, n, "check length d" );

	});
};

itertools.product( [

[
	[ "increasing", sort.increasing ],
	[ "decreasing", sort.decreasing ]
],

[
	[ "mergesort", sort.__mergesort__( sort.tapemerge, array.copy ) ]
],

[0, 1, 2, 10, 63, 64, 65],

[
	Array,
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array
]

], 1, [] ).forEach(

	functools.partial( functools.star,

		function ( diffname, diff, mergesortname, mergesort, n, type ) {

			if ( type.BYTES_PER_ELEMENT && n > Math.pow( 2, type.BYTES_PER_ELEMENT * 8 ) ) {
				return;
			}

			all( diffname, diff, mergesortname, mergesort, n, type );
		}
	)

);
