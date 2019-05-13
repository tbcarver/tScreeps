
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../screeps/creeps/bodies/bodyPartsTools");

describe("/screeps/creeps/bodies/bodyPartsTools", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("balance50100MoveParts()", function() {
		
		it("should return 2 move, 1 100s, 2 50s for 349 to 300", function() {

			var capacities = [300];
			
			for (capacity of capacities) {

				var result = strategy.balance50100MoveParts(null, capacity);

				assert.notStrictEqual(result, undefined);
				assert.strictEqual(result.numberOfMoves, 1);
				assert.strictEqual(result.numberOf100s, 1);
				assert.strictEqual(result.numberOf50s, 1);
			}
		});
	});
});