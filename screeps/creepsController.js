
var debug = require("./debug");
var creepsStore = require("./creepsStore");
var harvester = require("./creeps/harvester");
var { creepsSpawnRules } = require("./creepsRules");

var creepsController = {};

creepsController.tick = function() {

	var creepsStatistics = {
		harvesters: {
			energy: {
				spawn: 0,
				controller: 0
			}
		}
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (creep.ticksToLive === 0) {

			creepsStore.remove(creep);

		} else {

			// debug(creep.name, ": ", creep.memory);

			switch (creep.memory.type) {

				case "harvester":
					harvester.act(creep);
					creepsStatistics.harvesters[creep.memory.resourceType][creep.memory.targetStucture]++;
					break;
			}
		}
	}

	if (!global.spawn.spawning && global.spawn.energy >= global.spawn.energyCapacity) {

		spawnHarvesters(creepsStatistics.harvesters, creepsSpawnRules.harvesters);
	}
}

function spawnHarvesters(harvestersStatistics, harvestersSpawnRules) {

	for (var resourceTypeName in harvestersSpawnRules) {

		var resourceTypes = harvestersSpawnRules[resourceTypeName];

		for (var targetStuctureName in resourceTypes) {

			var harvesterCount = resourceTypes[targetStuctureName];

			if (harvestersStatistics[resourceTypeName][targetStuctureName] < harvesterCount) {

				var id = creepsStore.getNextCreepId();

				harvester.spawn(id, resourceTypeName, targetStuctureName);
			}
		}
	}
}


module.exports = creepsController;