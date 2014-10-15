

var util, increasing, decreasing, increasing2, decreasing2, one;

util = require( "util" );

increasing = sort.increasing;
decreasing = sort.decreasing;
increasing2 = sort.negate( decreasing );
decreasing2 = sort.negate( increasing );

one = function ( a, b ) {

	var i, d, i2, d2, ri, rd, ri2, rd2;

	i = increasing( a, b );
	d = decreasing( a, b );
	i2 = increasing2( a, b );
	d2 = decreasing2( a, b );
	ri = increasing( b, a );
	rd = decreasing( b, a );
	ri2 = increasing2( b, a );
	rd2 = decreasing2( b, a );

	deepEqual( i, i2, util.format( "i i2 ( %f, %f)", a, b ) );
	deepEqual( -i, ri, util.format( "-i ri ( %f, %f)", a, b ) );
	deepEqual( -i, ri2, util.format( "-i ri2 ( %f, %f)", a, b ) );
	deepEqual( -i, d, util.format( "-i d ( %f, %f)", a, b ) );
	deepEqual( -i, d2, util.format( "-i d2 ( %f, %f)", a, b ) );
	deepEqual( i, rd, util.format( "i rd ( %f, %f)", a, b ) );
	deepEqual( i, rd2, util.format( "i rd2 ( %f, %f)", a, b ) );

};


test( "negate", function () {

	var n;

	n = 100;

	while ( n-- ) {
		one( Math.random(), Math.random() );
	}

});
