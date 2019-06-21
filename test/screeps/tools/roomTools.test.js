
var assert = require("assert");

var strategy = require("../../../screeps/tools/roomTools");

describe("/screeps/tools/roomTools/getAdjacentRoomNames", function() {

	describe("getAdjacentRoomNames()", function() {

		it("should return adjacent rooms W8N10, W8N9, W8N8, W7N10, W7N8, W6N9, W6N8 for W7N9", function() {

			var adjacentRoomNames = strategy.getAdjacentRoomNames("W7N9");

			assert.strictEqual(adjacentRoomNames.length, 8);
			assert.strictEqual(adjacentRoomNames[0], "W8N10");
			assert.strictEqual(adjacentRoomNames[1], "W8N9");
			assert.strictEqual(adjacentRoomNames[2], "W8N8");
			assert.strictEqual(adjacentRoomNames[3], "W7N10");
			assert.strictEqual(adjacentRoomNames[4], "W7N8");
			assert.strictEqual(adjacentRoomNames[5], "W6N10");
			assert.strictEqual(adjacentRoomNames[6], "W6N9");
			assert.strictEqual(adjacentRoomNames[7], "W6N8");
		});
	});
});