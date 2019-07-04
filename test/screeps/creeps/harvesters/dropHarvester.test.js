
var assert = require("assert");
var simple = require("simple-mock");

var strategy = require("../../../../screeps/creeps/harvesters/dropHarvester");

describe("/screeps/creeps/harvesters/dropHarvester", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("initializeSpawnCreepMemory()", function() {

		it("should return ", function() {

			strategy.initializeSpawnCreepMemory(room, spawn);

		});
	});
});

function configureRoom(resourceOneCountHarvestPositions, resourceTwoCountHarvestPositions,
	 resourceOneCountHarvesters, resourceTwoCountHarvesters) {

	var tools = require("../../../../screeps/tools/tools");
	tools.roomTools = {};

	var resources = {
		"1": resourceOneCountHarvestPositions,
		"2": resourceTwoCountHarvestPositions,
	};

	simple.mock(tools.roomTools, "getCountResourceHarvestPositions").callFn(resourceId => resources[resourceId]);

	var room = {
		name: 1,
	};

	var spawn = {
		room: room,
	};

	var sources = [{
		id: 1,
	},
	{
		id: 2
	}]

	simple.mock(room, "find").returnWith(sources);

	Game.creeps = {};
	Memory.creeps = {};

	for (var count = 0; count < resourceOneCountHarvesters; count++) {

		Game.creeps[count + "One"] = {
			ticksToLive: 100
		};

		Memory.creeps[count + "One"] = {
			type: "dropHarvester",
			resourceId: 1
		};
	}

	for (var count = 0; count < resourceTwoCountHarvesters; count++) {

		Game.creeps[count + "Two"] = {
			ticksToLive: 100
		};

		Memory.creeps[count + "Two"] = {
			type: "dropHarvester",
			resourceId: 1
		};
	}
}