
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../screeps/creeps/bodies/energizerBodyPartsStrategy");

describe("/screeps/creeps/bodies/energizerBodyPartsStrategy", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("getBodyPartsObject()", function() {
		it("should return default for 299 or lower", function() {

			var creep = {
				memory: {
					type: "builder",
					state: {}
				}
			}

			var capacities = [299, 251, 250, 249, 200, 1, 0];
			
			for (capacity of capacities) {

				var bodyPartsObject = strategy.getBodyPartsObject(capacity);

				assert.notStrictEqual(bodyPartsObject, undefined);
				assert.strictEqual(bodyPartsObject.move, 1);
				assert.strictEqual(bodyPartsObject.work, 1);
				assert.strictEqual(bodyPartsObject.carry, 1);
			}
		});
	});
});