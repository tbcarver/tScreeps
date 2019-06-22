
var assert = require("assert");

var strategy = require("../../../screeps/tools/enemyTools");

describe("/screeps/tools/enemyTools/getMobAttackRoomName", function() {
	before(() => {
		require("../../mocks/screepsGlobals");
	});

	// describe("getAdjacentRoomNames()", function() {

	// 	it("should return adjacent rooms W8N10, W8N9, W8N8, W7N10, W7N8, W6N9, W6N8 for W7N9", function() {

	// 		strategy.enemyStats = {
	// 			countRoomsWithEnemies: 0,
	// 			roomNameEnemyStats: {
	// 				W8N10: {
	// 					roomName: "W8N10",
	// 					enemyCount: 11,
	// 					isRoomOwned: false,
	// 					hasTower: false
	// 				},
	// 				W8N9: {
	// 					roomName: "W8N9",
	// 					enemyCount: 3,
	// 					isRoomOwned: false,
	// 					hasTower: false
	// 				},
	// 				W8N8: {
	// 					roomName: "W8N8",
	// 					enemyCount: 2,
	// 					isRoomOwned: true,
	// 					hasTower: true
	// 				},
	// 				W11N11: {
	// 					roomName: "W11N11",
	// 					enemyCount: 2,
	// 					isRoomOwned: true,
	// 					hasTower: false
	// 				}
	// 			}
	// 		}
	// 		strategy.hasEnemies = true;
	// 		strategy.mobPostsMobAttackRooms = {};

	// 		var adjacentRoomNames = strategy.getMobAttackRoomName("W7N9");

	// 		assert.strictEqual(adjacentRoomNames.length, 8);
	// 		assert.strictEqual(adjacentRoomNames[0], "W8N10");
	// 		assert.strictEqual(adjacentRoomNames[1], "W8N9");
	// 		assert.strictEqual(adjacentRoomNames[2], "W8N8");
	// 		assert.strictEqual(adjacentRoomNames[3], "W7N10");
	// 		assert.strictEqual(adjacentRoomNames[4], "W7N8");
	// 		assert.strictEqual(adjacentRoomNames[5], "W6N10");
	// 		assert.strictEqual(adjacentRoomNames[6], "W6N9");
	// 		assert.strictEqual(adjacentRoomNames[7], "W6N8");
	// 	});
	// });
});