var util = require("util");
var array = require("aureooms-js-array");
var random = require("aureooms-js-random");

var check = function(tmpl, ctor, n, pred) {
	var name = util.format("%s (new %s(%d), %s)", tmpl[0], ctor.name, n, pred);
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
		shuffle(a, 0, n);
		sort(a, 0, n, pred);

		// TEST PREDICATE
		var i = a.length;
		var sorted = true;
		if(i > 1){
			while (--i) {
				if ( !pred(a[i-1], a[i]) ) {
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
	['quicksort (lotumo)', sort.__quicksort__(sort.lotumo)],
	['insertionsort', sort.insertionsort],
	['selectionsort', sort.selectionsort],
	['bubblesort', sort.bubblesort],
];

var PRED = [
	function(a, b){ return a <= b; },
	function(a, b){ return a >= b; }
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

			for (var i = 0; i < PRED.length; ++i) {
				check(TMPL[t], CTOR[k], N[j], PRED[i]);
			}
		}
	}
}

