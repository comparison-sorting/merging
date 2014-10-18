
var __dualpivotquicksort__ = function ( partition ) {

	var dualpivotquicksort = function ( diff, a, i, j ) {

		var p, g, l;

		if (j - i < 2) {
			return;
		}

		p = partition( diff, a, i, j );
		l = p[0];
		g = p[1];

		dualpivotquicksort( diff, a,   i  , l );
		dualpivotquicksort( diff, a, l + 1, g );
		dualpivotquicksort( diff, a, g + 1, j );
	};

	return dualpivotquicksort;

};

exports.__dualpivotquicksort__ = __dualpivotquicksort__;
