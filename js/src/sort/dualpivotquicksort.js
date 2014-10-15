
var __dualpivotquicksort__ = function ( partition ) {

	var dualpivotquicksort = function ( predicate, a, i, j ) {

		var p, q, g, k, l;

		if (j - i < 2) {
			return;
		}

		p = partition( predicate, a, i, j );
		l = p[0];
		g = p[1];

		dualpivotquicksort(a,   i  , l);
		dualpivotquicksort(a, l + 1, g);
		dualpivotquicksort(a, g + 1, j);
	};

	return dualpivotquicksort;

};

exports.__dualpivotquicksort__ = __dualpivotquicksort__;
