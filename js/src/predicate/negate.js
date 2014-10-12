

var negate = function ( predicate ) {

	return function ( a, b ) {
		return ! predicate ( a, b );
	};

};

exports.negate = negate;
