
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../screeps/creeps/bodies/bodyPartsTools");

describe("/screeps/creeps/bodies/bodyPartsTools", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 2 move, 1 100s, 2 50s for 300 to 349", function() {

			var capacities = [300, 349];
			
			for (capacity of capacities) {

				var result = strategy.balance50100MoveParts(null, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf100s, 1);
				assert.strictEqual(result.numberOf50s, 2);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 2 move, 1 100s, 3 50s for 350 to 449", function() {

			var capacities = [350, 399, 400, 449];
			
			for (capacity of capacities) {

				var result = strategy.balance50100MoveParts(null, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf100s, 1);
				assert.strictEqual(result.numberOf50s, 3);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 3 move, 1 100s, 5 50s for 500 to 549", function() {

			var capacities = [500, 549];
			
			for (capacity of capacities) {

				var result = strategy.balance50100MoveParts(null, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 3);
				assert.strictEqual(result.numberOf100s, 1);
				assert.strictEqual(result.numberOf50s, 5);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 2 move, 0 100s, 4 50s for 300 to 349 and max 100s of 0", function() {

			var capacities = [300, 349];
			
			for (capacity of capacities) {

				var result = {
					maxNumberOf100s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf100s, 0);
				assert.strictEqual(result.numberOf50s, 4);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 4 move, 0 100s, 7 50s for 550 to 599 and max 100s of 0", function() {

			var capacities = [550, 599];
			
			for (capacity of capacities) {

				var result = {
					maxNumberOf100s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 4);
				assert.strictEqual(result.numberOf100s, 0);
				assert.strictEqual(result.numberOf50s, 7);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 3 move, 1 100s, 5 50s for 550 to 599 and max 100s of 1", function() {

			var capacities = [550, 599];
			
			for (capacity of capacities) {

				var result = {
					maxNumberOf100s: 1
				}

				var result = strategy.balance50100MoveParts(result, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 3);
				assert.strictEqual(result.numberOf100s, 1);
				assert.strictEqual(result.numberOf50s, 5);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 1 move, 2 100s, 0 50s for 300 to 349 and max 50s of 0", function() {

			var capacities = [300, 349];
			
			for (capacity of capacities) {

				var result = {
					maxNumberOf50s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 1);
				assert.strictEqual(result.numberOf100s, 2);
				assert.strictEqual(result.numberOf50s, 0);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 2 move, 4 100s, 0 50s for 550 to 599 and max 50s of 0", function() {

			var capacities = [550, 599];
			
			for (capacity of capacities) {

				var result = {
					maxNumberOf50s: 0
				}

				var result = strategy.balance50100MoveParts(result, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 2);
				assert.strictEqual(result.numberOf100s, 4);
				assert.strictEqual(result.numberOf50s, 0);
			}
		});
	});

	describe("balance50100MoveParts()", function() {
		
		// NOTE: This could only balance between 2 to -1 unused
		it("should return 3 move, 4 100s, 1 50s for 550 to 599 and max 50s of 1", function() {

			var capacities = [550, 599];
			
			for (capacity of capacities) {

				var result = {
					maxNumberOf50s: 1
				}

				var result = strategy.balance50100MoveParts(result, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 3);
				assert.strictEqual(result.numberOf100s, 4);
				assert.strictEqual(result.numberOf50s, 1);
			}
		});
	});
});