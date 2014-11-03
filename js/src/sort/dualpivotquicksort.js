
var __dualpivotquicksort__ = function ( partition ) {

	var dualpivotquicksort = function ( compare, a, i, j ) {

		var p, g, l;

		if (j - i < 2) {
			return;
		}

		p = partition( compare, a, i, j );
		l = p[0];
		g = p[1];

		dualpivotquicksort( compare, a,   i  , l );
		dualpivotquicksort( compare, a, l + 1, g );
		dualpivotquicksort( compare, a, g + 1, j );
	};

	return dualpivotquicksort;

};

exports.__dualpivotquicksort__ = __dualpivotquicksort__;
