
// var assert = require("assert");
// var simple = require("simple-mock");

// var strategy = require("../../../../screeps/creeps/bodies/rangedAttackStrategy");

// describe("/screeps/creeps/bodies/rangedAttackStrategy", function() {

// 	describe("getBodyPartsObject()", function() {
		
// 		it("should return 1 move, 1 rangedAttack, 5 tough for 200 to 299", function() {

// 			var capacities = [200, 201, 249, 250, 251, 299];
			
// 			for (capacity of capacities) {

// 				var bodyPartsObject = strategy.getBodyPartsObject(capacity);

// 				assert.notStrictEqual(bodyPartsObject, undefined);
// 				assert.strictEqual(bodyPartsObject.move, 1);
// 				assert.strictEqual(bodyPartsObject.rangedAttack, 1);
// 				assert.strictEqual(bodyPartsObject.tough, 5);
// 			}
// 		});

// 		it("should return 1 move, 1 rangedAttack, 5 tough for 300 to 400", function() {

// 			var capacities = [300, 350, 400];
			
// 			for (capacity of capacities) {

// 				var bodyPartsObject = strategy.getBodyPartsObject(capacity);

// 				assert.notStrictEqual(bodyPartsObject, undefined);
// 				assert.strictEqual(bodyPartsObject.move, 1);
// 				assert.strictEqual(bodyPartsObject.rangedAttack, 1);
// 				assert.strictEqual(bodyPartsObject.tough, 5);
// 			}
// 		});
// 	});
// });