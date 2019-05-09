
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../screeps/creeps/bodies/dropperBodyPartsStrategy");

describe("/screeps/creeps/bodies/dropperBodyPartsStrategy", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("getBodyPartsObject()", function() {
		
		it("should return 100 for 200 to 249", function() {

			var capacities = [249, 201, 200];
			
			for (capacity of capacities) {

				var bodyPartsObject = strategy.getBodyPartsObject(capacity);

				assert.notStrictEqual(bodyPartsObject, undefined);
				assert.strictEqual(bodyPartsObject.move, 1);
				assert.strictEqual(bodyPartsObject.work, 1);
				assert.strictEqual(bodyPartsObject.carry, undefined);
			}
		});

		it("should return 200 for 250 to 299", function() {

			var capacities = [299, 251, 250];
			
			for (capacity of capacities) {

				var bodyPartsObject = strategy.getBodyPartsObject(capacity);

				assert.notStrictEqual(bodyPartsObject, undefined);
				assert.strictEqual(bodyPartsObject.move, 1);
				assert.strictEqual(bodyPartsObject.work, 2);
				assert.strictEqual(bodyPartsObject.carry, undefined);
			}
		});
	});
});