var all, util, array, search, random, operator, functools, itertools, sample, shuffle;

util = require( "util" );
array = require( "aureooms-js-array" );
search = require( "aureooms-js-search" );
random = require( "aureooms-js-random" );
operator = require( "aureooms-js-operator" );
functools = require( "aureooms-js-functools" );
itertools = require( "aureooms-js-itertools" );

sample = random.__sample__( random.randint );
shuffle = random.__shuffle__( sample );

all = function ( partitionname, partition, diffname, diff, n, type ) {

	var title;

	title = util.format( "multiselect %s (new %s(%d), %s)", partitionname, type.name, n, diffname );

	console.log( title );

	test( title, function () {

		var index, multiselect, ref, a, i, len, k;

		// SETUP SELECT
		index = functools.partial ( search.binarysearch, [sort.increasing] );
		multiselect = sort.__multiselect__( partition, index );

		// SETUP REF ARRAY
		ref = new type( n );
		array.iota( ref, 0, n, 0 );
		shuffle( ref, 0, n );
		array.sort( diff, ref );

		// SETUP TEST ARRAY
		a = new type( n );
		array.copy( ref, 0, n, a, 0 );

		// SELECT A SAMPLE OF THE INDEXES IN *a*
		i = a.length;

		len = random.randint( 0, i + 1 );
		sample( len, a, 0, n );
		k = new type( len );
		array.copy( a, 0, len, k, 0 );
		array.sort( sort.increasing, k );

		shuffle( a, 0, n );
		multiselect( diff, a, 0, n, k, 0, len );

		while ( len-- ) {
			deepEqual( a[k[len]], ref[k[len]], "select #" + k[len] );
		}

		deepEqual( a.length, n, "check length" );
	});
};

itertools.product( [

[
	[ "hoare", sort.hoare ],
	[ "lomuto", sort.lomuto ]
],

[
	[ "increasing", sort.increasing ],
	[ "decreasing", sort.decreasing ]
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

		function ( partitionname, partition, diffname, diff, n, type ) {

			if ( type.BYTES_PER_ELEMENT && n > Math.pow( 2, type.BYTES_PER_ELEMENT * 8 ) ) {
				return;
			}

			all( partitionname, partition, diffname, diff, n, type );
		}
	)

);

