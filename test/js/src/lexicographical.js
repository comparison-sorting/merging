

var util, increasing, decreasing, one;

util = require( "util" );

increasing = sort.lexicographical( sort.increasing );
decreasing = sort.negate( increasing );


one = function ( a, b, z ) {

	deepEqual(
		sort.sign( increasing( a, b ) ),
		z,
		util.format( "i %s %s", JSON.stringify( a ), JSON.stringify( b ) )
	);

	deepEqual(
		sort.sign( decreasing( a, b ) ),
		-z,
		util.format( "d %s %s", JSON.stringify( a ), JSON.stringify( b ) )
	);

};


test( "lexicographical", function () {


	one( [], [], 0 );
	one( [], [0], -1 );
	one( [0], [], 1 );
	one( [0], [0], 0 );
	one( [0], [1], -1 );
	one( [1], [0], 1 );
	one( [9, 8, 7, 6, 0], [9, 8, 7, 6, 1], -1 );
	one( [9, 8, 7, 6, 1], [9, 8, 7, 6, 0], 1 );

});
