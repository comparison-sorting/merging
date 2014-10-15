
var swap = function ( a, i, j ) {

	var t;

	t    = a[i];
	a[i] = a[j];
	a[j] = t;

};

exports.swap = swap;
