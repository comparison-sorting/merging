

var negate = function ( diff ) {

	return function ( a, b ) {
		return diff ( b, a );
	};

};

exports.negate = negate;
