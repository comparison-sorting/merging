var util, array, search, random, operator, functools;

util = require( "util" );
array = require( "aureooms-js-array" );
search = require( "aureooms-js-search" );
random = require( "aureooms-js-random" );
operator = require( "aureooms-js-operator" );
functools = require( "aureooms-js-functools" );

var check = function(ctor, n, diff) {
	var name = util.format("multiselect (new %s(%d), %s)", ctor.name, n, diff);
	console.log(name);
	test(name, function (assert) {

		// SETUP RANDOM
		var randint = random.randint;
		var sample = random.__sample__( randint );
		var shuffle = random.__shuffle__( sample );
		var iota = array.iota;
		var copy = array.copy;

		// SETUP INDEX SEARCH
		var index_diff = sort.increasing;
		var binarysearch = search.binarysearch;

		// SETUP SORT
		var partition = sort.partition;
		var quicksort = sort.__quicksort__( partition );

		// SETUP SELECT
		var index = functools.partial ( binarysearch, [index_diff] );
		var multiselect = sort.__multiselect__( partition, index );

		// SETUP REF ARRAY
		var ref = new ctor(n);
		iota(ref, 0, n, 0);
		shuffle(ref, 0, n);
		quicksort( diff, ref, 0, n );

		// SETUP TEST ARRAY
		var a = new ctor(n);
		copy( ref, 0, n, a, 0 );

		// TEST PREDICATE <-- ??? be more explicit
		var i = a.length;

		var len = randint( 0, i + 1 );
		sample( len, a, 0, n );
		var k = new ctor( len );
		copy( a, 0, len, k, 0 );
		quicksort( index_diff, k, 0, len );

		shuffle(a, 0, n);
		multiselect( diff, a, 0, n, k, 0, len);

		while( len-- ){
			deepEqual(a[k[len]], ref[k[len]], "select #" + k[len]);
		}

		deepEqual( a.length, n, "check length" );
	});
};

var DIFF = [
	sort.increasing,
	sort.decreasing
];

var N = [0, 1, 2, 10, 63, 64, 65];

var CTOR = [
	Array,
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array
];

for (var k = 0; k < CTOR.length; k++) {
	for (var j = 0; j < N.length; j++) {
		if(CTOR[k].BYTES_PER_ELEMENT &&
			N[j] > Math.pow(2, CTOR[k].BYTES_PER_ELEMENT * 8)){
				continue;
		}
		for (var i = 0; i < DIFF.length; ++i) {
			check(CTOR[k], N[j], DIFF[i]);
		}
	}
}

