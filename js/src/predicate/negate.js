

var negate = function ( delta ) {

	return function ( a, b ) {
		return - delta ( a, b );
	};

};

exports.negate = negate;
