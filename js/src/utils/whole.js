

var whole = function ( sort ) {

	return function ( compare, array ) {

		sort( compare, array, 0, array.length );

	};

};

exports.whole = whole;
