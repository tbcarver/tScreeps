
var assert = require("assert");
var simple = require("simple-mock");
var spawnTools = require("../../../../screeps/tools/spawnTools");
var bodyPartsFactory = require("../../../../screeps/creeps/bodies/bodyPartsFactory");

var strategy = require("../../../../screeps/creeps/bodies/energyWorkerBodyPartsStrategy");

describe("/screeps/creeps/bodies/energyWorkerBodyPartsStrategy", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("getBodyPartsObject()", function() {
		it("should return default for 299 or lower", function() {

			var capacities = [299, 251, 250, 249, 200];
			
			for (capacity of capacities) {

				var bodyPartsObject = strategy.getBodyPartsObject(capacity);
				var bodyParts = bodyPartsFactory.toBodyParts(bodyPartsObject);
				var cost = spawnTools.calculateBodyCost(bodyParts);

				assert.notStrictEqual(bodyPartsObject, undefined);
				assert.strictEqual(bodyPartsObject.move, 1);
				assert.strictEqual(bodyPartsObject.work, 1);
				assert.strictEqual(bodyPartsObject.carry, 1);
				assert(cost <= capacity);
			}
		});
	});
});


// var tools = require("../../../screeps/tools/tools");
// var bodyPartsFactory = require("./bodyPartsFactory.tests");
// global._ = require("lodash");
// var constants = require("@screeps/common/lib/constants");

// _.forEach(constants, (value, key) => {
// 	global[key] = value;
// })

// function getBodyPartsObjectTest() {

// 	for (var count = 2; count<=8; count++) {	
		
// 		var baseCapacity = 100 * count;
		
// 		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity);
// 		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 1);
// 		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 49);
// 		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 50);
// 		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 99);
// 	}
// }

// function getBodyPartsObjectTestWithSpawnCapacity(spawnCapacity){

// 	tools.spawnTools = {
// 		calculateSpawnCapacity: function() {
// 			return spawnCapacity;
// 		},
// 		calculateBodyCost: tools.spawnTools.calculateBodyCost
// 	}
// 	var bodyPart = bodyPartsFactory.getBodyParts("worker");
// 	var bodyCost = tools.spawnTools.calculateBodyCost(bodyPart);
// 	console.log(spawnCapacity, bodyCost, JSON.stringify(bodyPart));
// }

// getBodyPartsObjectTest();