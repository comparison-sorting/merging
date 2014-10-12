var util = require('util');

var check = function(tmpl, ctor, m, n, diff) {
	var name = util.format("%s (new %s(%d, %d), %s)", tmpl[0], ctor.name, m, n, diff);
	console.log(name);
	test(name, function (assert) {

		// SETUP RANDOM
		var randint = algo.randint;
		var sample = algo.__sample__(randint);
		var shuffle = algo.__shuffle__(sample);

		// SETUP UTILS
		var copy = algo.copy;

		// SETUP SORT
		var pred = function(a, b){ return diff(a, b) < 0; };
		var __binarysearch__ = algo._$_binarysearch_$_(algo.__pivotsearch__);
		var partition = algo.__partition__(pred);
		var quicksort = algo.__quicksort__(partition);
		var merge = tmpl[1](diff, __binarysearch__, copy, pred);

		// SETUP ARRAYS, DEST
		var a = new ctor(m), j;
		for(j = 0; j < m; ++j) a[j] = randint(0, m);
		shuffle(a, 0, m);
		quicksort(a, 0, m);

		var b = new ctor(n);
		for(j = 0; j < n; ++j) b[j] = randint(0, n);
		shuffle(b, 0, n);
		quicksort(b, 0, n);

		var d = new ctor(n + m);

		// MERGE ARRAYS
		merge(a, 0, m, b, 0, n, d, 0);

		// REF
		var c = new ctor(n + m);
		copy(a, 0, m, c, 0);
		copy(b, 0, n, c, m);
		shuffle(c, 0, n + m);
		quicksort(c, 0, n + m);

		deepEqual(d, c, 'check sorted');
		deepEqual(a.length, m, 'check length a');
		deepEqual(b.length, n, 'check length b');
		deepEqual(d.length, n + m, 'check length d');
	});
};

var DIFF = [
	function(a, b){ return a - b; },
	function(a, b){ return b - a; }
];

var TMPL = [
	['merge', function(diff, __binarysearch__, copy, pred){
		return algo.__merge__(__binarysearch__(diff), copy);
	}],
	['binarymerge', function(diff, __binarysearch__, copy, pred){
		return algo.__binarymerge__(diff, __binarysearch__, copy);
	}],
	['tapemerge', function(diff, __binarysearch__, copy, pred){
		return algo.__tapemerge__(pred);
	}],
];

var N = [0, 1, 2, 10, 63, 64, 65]; // MUST BE IN ASCENDING ORDER !!

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

for(var t = 0; t < TMPL.length; ++t){
	for (var k = 0; k < CTOR.length; ++k) {
		for (var j = 0; j < N.length; ++j) {
			for (var l = 0; l <= j; ++l) {
				if(CTOR[k].BYTES_PER_ELEMENT && N[j] > Math.pow(2, CTOR[k].BYTES_PER_ELEMENT * 8))
					continue;

				for (var i = 0; i < DIFF.length; ++i) {
					check(TMPL[t], CTOR[k], N[j], N[l], DIFF[i]);
				}
			}
		}
	}
}

