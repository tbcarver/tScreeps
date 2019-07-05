
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../../screeps/rules/calculatedSpawnRules/roomStrategiesRule/roomStrategiesRule");

describe("/screeps/rules/calculatedSpawnRules/roomStrategiesRule/roomStrategiesRule", function() {
	before(() => {
		require("../../../../mocks/screepsGlobals");
	});

	describe("addCalculatedSpawnRule()", function() {

		it("should return ", function() {

			Game.time = 601;
			Game.rooms = {
				W8N9: {},
				W8N8: {},
				W8N7: {},
			};

			Memory.state.calculatedSpawnRulesCoolOffs = {
				harvestToDropPoint: 300
			};

			var resources = {
				1: 1,
				2: 2,
			}

			simple.mock(global.Game.rooms.W8N8, "find").returnWith([{ id: 1 }, { id: 2 }]);

			var roomTools = require("../../../../../screeps/tools/roomTools");
			simple.mock(roomTools, "getCountResourceHarvestPositions").callFn(resourceId => resources[resourceId]);

			var creepsSpawnRules = [
				{
					roomName: "W8N9",
					spawnOrderMaxSpawnedCounts: [],
					remoteRooms: [
						{
							roomName: "W8N8",
							roomStrategy: "harvestToDropPoint",
						},
					],
				},
			]

			strategy(creepsSpawnRules);

			var creepsSpawnRules = [
				{
					roomName: "W8N9",
					spawnOrderMaxSpawnedCounts: [],
					remoteRooms: [
						{
							roomName: "W8N8",
							roomStrategy: "harvestToDropPoint",
						},
					],
				},
			]
			
			strategy(creepsSpawnRules);
		});
	});
});