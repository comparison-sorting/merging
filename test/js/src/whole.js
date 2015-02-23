var util, array, random, compare, itertools, functools;

util = require( "util" );
array = require( "aureooms-js-array" );
random = require( "aureooms-js-random" );
compare = require( "aureooms-js-compare" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

var check = function ( sortname, arraysort, ctor, n, comparename, compare ) {

	var title;

	arraysort = sort.whole( arraysort );

	title = util.format("whole %s (new %s(%d), %s)", sortname, ctor.name, n, comparename);

	console.log( title );

	test( title, function () {

		var randint, sample, shuffle, a;

		// SETUP RANDOM
		randint = random.randint;
		sample = random.__sample__( randint );
		shuffle = random.__shuffle__( sample );

		// SETUP ARRAY
		a = new ctor(n);
		array.iota( a, 0, n, 0 );

		// SORT ARRAY
		shuffle( a, 0, n );
		arraysort( compare, a );

		deepEqual( sort.issorted( compare , a , 0 , n ) , n , "check sorted" );
		deepEqual( a.length, n, "check length a" );
	} );
};

itertools.product( [

[
	[ "heapsort (unary)", sort.__heapsort__( 1 ) ],
	[ "heapsort (binary)", sort.__heapsort__( 2 ) ],
	[ "heapsort (ternary)", sort.__heapsort__( 3 ) ],
	[ "heapsort (4-ary)", sort.__heapsort__( 4 ) ],
	[ "heapsort (5-ary)", sort.__heapsort__( 5 ) ],
	[ "quicksort (hoare)", sort.__quicksort__( sort.hoare ) ],
	[ "quicksort (lomuto)", sort.__quicksort__( sort.lomuto ) ],
	[ "dualpivotquicksort (yaroslavskiy)", sort.__dualpivotquicksort__( sort.yaroslavskiy ) ],
	[ "insertionsort", sort.insertionsort ],
	[ "selectionsort", sort.selectionsort ],
	[ "bubblesort", sort.bubblesort ]
],

[
	[ "increasing", compare.increasing ],
	[ "decreasing", compare.decreasing ]
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

], 1, [] ).forEach( function ( args ) {

	functools.star( function ( sortname, arraysort, comparename, compare, size, type ) {

		if ( type.BYTES_PER_ELEMENT && size > Math.pow( 2, type.BYTES_PER_ELEMENT * 8 ) ) {
			return;
		}

		check( sortname, arraysort, type, size, comparename, compare );

	}, args );

} );
