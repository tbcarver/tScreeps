
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../screeps/rules/calculatedSpawnRules/storageTransferRule");

describe("/screeps/rules/calculatedSpawnRules/storageTransferRule", function() {

	describe("addCalculatedSpawnRule()", function() {

		it("should return ", function() {

			var tools = require("../../../../screeps/tools/tools");
			tools.roomTools = {};
			var storageStats = {
				W8N9: {
					hasStorage: true,
					storedEnergy: 200,
					percentageStoredEnergy: 90,
				},
				W8N8: {
					hasStorage: true,
					storedEnergy: 200,
					percentageStoredEnergy: 10,
				}
			}

			simple.mock(tools.roomTools, "getStorageStats").callFn(roomName => storageStats[roomName]);

			var adjacentRooms = {
				W8N8: ["W8N9"],
				W8N9: ["W8N8"]
			}

			simple.mock(tools.roomTools, "getAdjacentRoomNames").callFn(roomName => adjacentRooms[roomName]);

			global.Game = {
				rooms: {
					W8N9: {},
					W8N8: {},
				}
			};

			var creepsSpawnRules = [
				{
					roomName: "W8N9",
					spawnOrderMaxSpawnedCounts: [],
				},
				{
					roomName: "W8N8",
					spawnOrderMaxSpawnedCounts: [],
				},
			]

			strategy(creepsSpawnRules);

		});
	});
});