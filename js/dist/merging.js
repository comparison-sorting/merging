"use strict";

(function () {

	"use strict";

	var definition = function definition(exports, undefined) {

		/* js/src/array */
		/* js/src/array/_hlstatic.js */

		var _hlstatic = function _hlstatic(binarysearch, copy) {

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

				var alpha = Math.floor(Math.log(m / n) / Math.log(2));

				var g = Math.pow(2, alpha);

				// for each block

				blocks: while (bi < bj && (ai + g < aj || (g = aj - ai - 1))) {

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

		exports._hlstatic = _hlstatic;

		/* js/src/array/_merge.js */

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

		/* js/src/array/tapemerge.js */

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

		/* js/src/iterable */
		/* js/src/iterable/iterables.js */

		var iterables = regeneratorRuntime.mark(function iterables(compare, A, B) {
			var _a, a, _b, b;

			return regeneratorRuntime.wrap(function iterables$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:

						A = A[Symbol.iterator]();
						B = B[Symbol.iterator]();

						_a = A.next();

						if (!_a.done) {
							context$3$0.next = 6;
							break;
						}

						return context$3$0.delegateYield(B, "t0", 5);

					case 5:
						return context$3$0.abrupt("return");

					case 6:
						a = _a.value;
						_b = B.next();

						if (!_b.done) {
							context$3$0.next = 13;
							break;
						}

						context$3$0.next = 11;
						return a;

					case 11:
						return context$3$0.delegateYield(A, "t1", 12);

					case 12:
						return context$3$0.abrupt("return");

					case 13:
						b = _b.value;

					case 14:
						if (!true) {
							context$3$0.next = 38;
							break;
						}

						if (!(compare(a, b) <= 0)) {
							context$3$0.next = 27;
							break;
						}

						context$3$0.next = 18;
						return a;

					case 18:

						_a = A.next();

						if (!_a.done) {
							context$3$0.next = 24;
							break;
						}

						context$3$0.next = 22;
						return b;

					case 22:
						return context$3$0.delegateYield(B, "t2", 23);

					case 23:
						return context$3$0.abrupt("return");

					case 24:

						a = _a.value;

						context$3$0.next = 36;
						break;

					case 27:
						context$3$0.next = 29;
						return b;

					case 29:

						_b = B.next();

						if (!_b.done) {
							context$3$0.next = 35;
							break;
						}

						context$3$0.next = 33;
						return a;

					case 33:
						return context$3$0.delegateYield(A, "t3", 34);

					case 34:
						return context$3$0.abrupt("return");

					case 35:

						b = _b.value;

					case 36:
						context$3$0.next = 14;
						break;

					case 38:
					case "end":
						return context$3$0.stop();
				}
			}, iterables, this);
		});

		exports.iterables = iterables;

		/* js/src/nodes */
		/* js/src/nodes/nodes.js */

		var nodes = function nodes(compare, A, m, B, n) {

			if (m <= 0) return B;
			if (n <= 0) return A;

			if (compare(A.value, B.value) <= 0) {

				A.next = nodes(compare, A.next, --m, B, n);

				return A;
			} else {

				B.next = nodes(compare, A, m, B.next, --n);

				return B;
			}
		};

		exports.nodes = nodes;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("@aureooms/js-merging", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["merging"] = {});
	} else console.error("unable to detect type of module to define for @aureooms/js-merging");
})();

// <= makes merge stable