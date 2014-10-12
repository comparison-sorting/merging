


var insertionsort = function(a, i, j, pred){

	var o, k, t;

	for (k = i + 1; k < j; ++k) {

		t = k;
		o = a[t];

		while (t --> i && !pred(a[t], o)) {
			a[t + 1] = a[t];
		}

		a[t + 1] = o;
	}
};

exports.insertionsort = insertionsort;
