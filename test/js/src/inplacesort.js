
var util, array, random, operator;

util = require( "util" );
array = require( "aureooms-js-array" );
random = require( "aureooms-js-random" );
operator = require( "aureooms-js-operator" );

var check = function(tmpl, ctor, n, diff) {
	var name = util.format("%s (new %s(%d), %s)", tmpl[0], ctor.name, n, diff);
	console.log(name);
	test(name, function (assert) {

		// SETUP RANDOM
		var randint = random.randint;
		var sample = random.__sample__(randint);
		var shuffle = random.__shuffle__(sample);
		var iota = array.iota;

		// SETUP SORT
		var sort = tmpl[1];

		// SETUP ARRAY
		var a = new ctor(n);
		iota(a, 0, n, 0);

		// SORT ARRAY
		shuffle( a, 0, n );
		sort( diff, a, 0, n );

		// TEST PREDICATE
		var i = a.length;
		var sorted = true;
		if(i > 1){
			while (--i) {
				if ( diff( a[i-1], a[i] ) > 0 ) {
					sorted = false;
					break;
				}
			}
		}

		ok(sorted, 'check sorted');
		deepEqual(a.length, n, 'check length a');
	});
};


var TMPL = [
	['quicksort (hoare)', sort.__quicksort__(sort.hoare)],
	['quicksort (lomuto)', sort.__quicksort__(sort.lomuto)],
	['dualpivotquicksort (yaroslavskiy)', sort.__dualpivotquicksort__(sort.yaroslavskiy)],
	['insertionsort', sort.insertionsort],
	['selectionsort', sort.selectionsort],
	['bubblesort', sort.bubblesort],
];

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

for (var t = 0; t < TMPL.length; ++t) {
	for (var k = 0; k < CTOR.length; ++k) {
		for (var j = 0; j < N.length; ++j) {

			if(CTOR[k].BYTES_PER_ELEMENT && N[j] > Math.pow(2, CTOR[k].BYTES_PER_ELEMENT * 8))
				continue;

			for (var i = 0; i < DIFF.length; ++i) {
				check(TMPL[t], CTOR[k], N[j], DIFF[i]);
			}
		}
	}
}

