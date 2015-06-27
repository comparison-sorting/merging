"use strict";

(function () {

	"use strict";

	var definition = function definition(exports, undefined) {

		/* js/src/_binarymerge.js */

		var _binarymerge = function _binarymerge(binarysearch, copy) {

			/**
    * Merges 2 arrays using the Hwang Lin algorithm.
    *
    *   /!\ aj - ai >= bj - bi
    */

			var hwanglin = function hwanglin(compare, a, ai, aj, b, bi, bj, c, ci) {

				var o = ci - ai - bi;
				var t = ai;

				var m = aj - ai;
				var n = bj - ai;

				// g is the size of a block

				var g = Math.pow(2, Math.floor(Math.log(m / n) / Math.log(2)));

				blocks: while (bi < bj && (ai + g < aj || (g = aj - ai - 1))) {

					// for each block

					// t is the inner left bound
					t = ai;

					// ai is the inner right bound
					ai = t + g;

					while (bi < bj) {

						// we will try to insert b_i in this block

						if (compare(b[bi], a[ai]) >= 0) {

							// b_i must be inserted to the left of this block
							// we copy the block to the output array and continue
							// with the next block
							copy(a, t, ai, c, o + t + bi);
							continue blocks;
						}

						// b_i is inside this block and smaller than a_i
						// we search its insertion position using a binary search algorithm
						var q = binarysearch(compare, a, t, ai, b[bi]);

						// z is the insertion position
						var z = q[0] + q[1];

						// copy everything to the left of the insertion position
						// to the output array
						copy(a, t, z, c, o + t + bi);

						// copy b_i to its insertion position in the output array
						c[o + bi + z] = b[bi];

						// update the inner left bound of the block
						t = z;

						// go to the next b_i
						++bi;
					}
				}

				// remaining elements are copied to the output array
				copy(a, t, aj, c, o + t + bi);
				copy(b, bi, bj, c, o + aj + bi);
			};

			return hwanglin;
		};

		exports._binarymerge = _binarymerge;

		/* js/src/_merge.js */

		var _merge = function _merge(index, copy) {

			var merge = function merge(compare, a, ai, aj, b, bi, bj, c, ci) {

				var o = ci - ai - bi;
				var t = ai;

				for (; bi < bj; ++bi) {

					var q = index(compare, a, ai, aj, b[bi]);
					ai = q[0] + q[1];

					copy(a, t, ai, c, o + t + bi);

					c[o + ai + bi] = b[bi];
					t = ai;
				}

				copy(a, t, aj, c, o + t + bi);
			};

			return merge;
		};

		exports._merge = _merge;

		/* js/src/tapemerge.js */

		var tapemerge = function tapemerge(compare, a, ai, aj, b, bi, bj, c, ci) {

			var cj;

			cj = ci + aj - ai + bj - bi;

			for (; ci < cj; ++ci) {

				if (bi >= bj || ai < aj && compare(a[ai], b[bi]) <= 0) {

					c[ci] = a[ai];
					++ai;
				} else {

					c[ci] = b[bi];
					++bi;
				}
			}
		};

		exports.tapemerge = tapemerge;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-merging", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["merging"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-merging");
})();