
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../screeps/rules/calculatedSpawnRules/storageTransferRule");

describe("/screeps/rules/calculatedSpawnRules/storageTransferRule", function() {

	describe("addCalculatedSpawnRule()", function() {

		it("should return ", function() {

			var roomTools = require("../../../../screeps/tools/roomTools");
			var storageStats = {
				W8N9: {
					hasStorage: true,
					percentageStoredEnergy: 70,
				},
				W8N8: {
					hasStorage: true,
					percentageStoredEnergy: 40,
				},
				W8N7: {
					hasStorage: true,
					percentageStoredEnergy: 90,
				},
			}

			simple.mock(roomTools, "getStorageStats").callFn(roomName => storageStats[roomName]);

			var adjacentRooms = {
				W8N7: ["W8N8"],
				W8N8: ["W8N9", "W8N7"],
				W8N9: ["W8N8"]
			}

			simple.mock(roomTools, "getAdjacentRoomNames").callFn(roomName => adjacentRooms[roomName]);

			global.Game = {
				rooms: {
					W8N9: {},
					W8N8: {},
					W8N7: {},
				}
			};

			var creepsSpawnRules = [
				{
					roomName: "W8N9",
					spawnOrderMaxSpawnedCounts: [],
					remoteRooms: [],
				},
				{
					roomName: "W8N8",
					spawnOrderMaxSpawnedCounts: [],
					remoteRooms: [],
				},
				{
					roomName: "W8N7",
					spawnOrderMaxSpawnedCounts: [],
					remoteRooms: [],
				},
			]

			strategy(creepsSpawnRules);

		});
	});
});