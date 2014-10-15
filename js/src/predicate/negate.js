

var negate = function ( delta ) {

	return function ( a, b ) {
		return delta ( b, a );
	};

};

exports.negate = negate;
