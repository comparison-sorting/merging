

var negate = function ( compare ) {

	return function ( a, b ) {
		return compare ( b, a );
	};

};

exports.negate = negate;
