
var assert = require("chai").assert;
var simple = require("simple-mock");

var strategy = require("../../../../screeps/creeps/bodies/bodyPartsTools");

describe("/screeps/creeps/bodies/bodyPartsTools", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("balance50100MoveParts()", function() {

		it("should return at any size with no maxes.", function() {

			var capacities = [200, 250, 300, 350, 400, 550, 599, 600, 649, 700, 800, 900, 1000, 1500, 2000];
			var partsPerMoves = [1, 2];

			for (capacity of capacities) {
				for (partsPerMove of partsPerMoves) {

					var result = strategy.balance50100MoveParts(null, capacity, partsPerMove);
					var cost = calculateCost(result);

					assert.notStrictEqual(result, undefined);
					assert.isAtMost(cost, capacity);
				}
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return at any size with max 50s.", function() {

			var capacities = [200, 250, 300, 350, 400, 550, 599, 600, 649, 700, 800, 900, 1000, 1500, 2000];
			var partsPerMoves = [1, 2];

			for (capacity of capacities) {
				for (partsPerMove of partsPerMoves) {

					var result = {
						maxNumberOf50s: 1
					}

					var result = strategy.balance50100MoveParts(result, capacity, partsPerMove);
					var cost = calculateCost(result);

					assert.notStrictEqual(result, undefined);
					assert.isAtMost(cost, capacity);
				}
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return at any size with max 100s.", function() {

			var capacities = [200, 250, 300, 350, 400, 550, 599, 600, 649, 700, 800, 900, 1000, 1500, 2000];
			var partsPerMoves = [1, 2];

			for (capacity of capacities) {
				for (partsPerMove of partsPerMoves) {

					var result = {
						maxNumberOf100s: 1
					}

					var result = strategy.balance50100MoveParts(result, capacity, partsPerMove);
					var cost = calculateCost(result);

					assert.notStrictEqual(result, undefined);
					assert.isAtMost(cost, capacity);
				}
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return at any size with max 50s and 100s.", function() {

			var capacities = [200, 250, 300, 350, 400, 550, 599, 600, 649, 700, 800, 900, 1000, 1500, 2000];
			var partsPerMoves = [1, 2];

			for (capacity of capacities) {
				for (partsPerMove of partsPerMoves) {

					var result = {
						maxNumberOf50s: 10,
						maxNumberOf100s: 5
					}

					var result = strategy.balance50100MoveParts(result, capacity, partsPerMove);
					var cost = calculateCost(result);

					assert.notStrictEqual(result, undefined);
					assert.isAtMost(cost, capacity);
				}
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 2 moves, 2 50s, 1 100s for 300 to 349", function() {

			var capacities = [300, 349];

			for (capacity of capacities) {

				var result = strategy.balance50100MoveParts(null, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf50s, 2);
				assert.strictEqual(result.numberOf100s, 1);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 2 moves, 3 50s, 1 100s for 350 to 449", function() {

			var capacities = [350, 399, 400, 449];

			for (capacity of capacities) {

				var result = strategy.balance50100MoveParts(null, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf50s, 3);
				assert.strictEqual(result.numberOf100s, 1);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 3 moves, 5 50s, 1 100s for 500 to 549", function() {

			var capacities = [500, 549];

			for (capacity of capacities) {

				var result = strategy.balance50100MoveParts(null, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 3);
				assert.strictEqual(result.numberOf50s, 5);
				assert.strictEqual(result.numberOf100s, 1);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 1 moves, 0 50s, 2 100s for 300 to 349 and max 50s of 0", function() {

			var capacities = [300, 349];

			for (capacity of capacities) {

				var result = {
					maxNumberOf50s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 1);
				assert.strictEqual(result.numberOf50s, 0);
				assert.strictEqual(result.numberOf100s, 2);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 2 moves, 0 50s, 4 100s for 550 to 599 and max 50s of 0", function() {

			var capacities = [550, 599];

			for (capacity of capacities) {

				var result = {
					maxNumberOf50s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf50s, 0);
				assert.strictEqual(result.numberOf100s, 4);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		// NOTE: This could only balance between 2 to -1 unused
		it("should return 3 moves, 1 50s, 3 100s for 550 to 599 and max 50s of 1", function() {

			var capacities = [550, 599];

			for (capacity of capacities) {

				var result = {
					maxNumberOf50s: 1
				}

				var result = strategy.balance50100MoveParts(result, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 3);
				assert.strictEqual(result.numberOf50s, 1);
				assert.strictEqual(result.numberOf100s, 3);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		// NOTE: This could only balance between 2 to -1 unused
		it("should return 2 moves, 1 50s, 2 100s for 550 to 599 and max 50s of 1 and max 100s of 2", function() {

			var capacities = [550, 599, 600, 649, 700, 800];

			for (capacity of capacities) {

				var result = {
					maxNumberOf50s: 1,
					maxNumberOf100s: 2
				}

				var result = strategy.balance50100MoveParts(result, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf50s, 1);
				assert.strictEqual(result.numberOf100s, 2);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 2 moves, 4 50s, 0 100s for 300 to 349 and max 100s of 0", function() {

			var capacities = [300, 349];

			for (capacity of capacities) {

				var result = {
					maxNumberOf100s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf50s, 4);
				assert.strictEqual(result.numberOf100s, 0);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 4 moves, 7 50s, 0 100s for 550 to 599 and max 100s of 0", function() {

			var capacities = [550, 599];

			for (capacity of capacities) {

				var result = {
					maxNumberOf100s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 4);
				assert.strictEqual(result.numberOf50s, 7);
				assert.strictEqual(result.numberOf100s, 0);
			}
		});
	});

	describe("balance50100MoveParts()", function() {

		it("should return 3 moves, 5 50s, 1 100s for 550 to 599 and max 100s of 1", function() {

			var capacities = [550, 599];

			for (capacity of capacities) {

				var result = {
					maxNumberOf100s: 1
				}

				var result = strategy.balance50100MoveParts(result, capacity, 2);
				var cost = calculateCost(result);

				assert.notStrictEqual(result, undefined);
				assert.isAtMost(cost, capacity);
				assert.strictEqual(result.numberOfMoves, 3);
				assert.strictEqual(result.numberOf50s, 5);
				assert.strictEqual(result.numberOf100s, 1);
			}
		});
	});

	// describe("balance50100MoveParts()", function() {

	// 	it("should return 3 moves, 5 50s, 1 100s for 550 to 599 and max 100s of 1", function() {

	// 		var capacities = [500];

	// 		for (capacity of capacities) {

	// 			var result = {
	// 				maxNumberOf100s: 1
	// 			}

	// 			var result = strategy.balance50100MoveParts(result, capacity, 1);
	// 			var cost = calculateCost(result);

	// 			assert.notStrictEqual(result, undefined);
	// 			assert.isAtMost(cost, capacity);
	// 			assert.strictEqual(result.numberOfMoves, 3);
	// 			assert.strictEqual(result.numberOf50s, 5);
	// 			assert.strictEqual(result.numberOf100s, 1);
	// 		}
	// 	});
	// });
});

function calculateCost(result) {

	return (result.numberOf100s * 100) + (result.numberOf50s * 50) + (result.numberOfMoves * 50);
}