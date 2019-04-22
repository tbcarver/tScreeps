
var debug = require("./debug");
var creepsStore = require("./creepsStore");
var harvester = require("./creeps/harvester");
var pather = require("./creeps/pather");
var { creepsSpawnRules } = require("./creepsRules");

var creepsController = {};

creepsController.tick = function() {

	cleanTheDead();

	var creepsStatistics = {
		harvesters: {
			energy: {
				spawn: 0,
				controller: 0
			}
		},
		pathers: {
			spawn: {
				controller: 0
			}
		}
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (creep.ticksToLive === 0) {

			creepsStore.remove(creep);

			debug.yellow(`creep died: ${creep.id} type: ${creep.memory.type}`);

		} else {

			switch (creep.memory.type) {

				case "harvester":
					harvester.act(creep);
					creepsStatistics.harvesters[creep.memory.resourceType][creep.memory.targetStucture]++;
					break;

				case "pather":
					pather.act(creep);
					creepsStatistics.pathers[creep.memory.sourceName][creep.memory.targetName]++;
					break;
			}
		}
	}

	if (!global.spawn.spawning && global.spawn.energy >= global.spawn.energyCapacity) {

		spawnPathers(creepsStatistics.pathers, creepsSpawnRules.pathers);
		spawnHarvesters(creepsStatistics.harvesters, creepsSpawnRules.harvesters);
	}
}

function spawnPathers(pathersStatistics, pathersSpawnRules) {

	for (var sourceName in pathersSpawnRules) {

		var targets = pathersSpawnRules[sourceName];

		for (var targetName in targets) {

			var pathersCount = targets[targetName];

			if (pathersStatistics[sourceName][targetName] < pathersCount) {

				var id = creepsStore.getNextCreepId();

				pather.spawn(id, sourceName, targetName);
			}
		}
	}
}

function spawnHarvesters(harvestersStatistics, harvestersSpawnRules) {

	for (var resourceTypeName in harvestersSpawnRules) {

		var resourceTypes = harvestersSpawnRules[resourceTypeName];

		for (var targetStuctureName in resourceTypes) {

			var harvestersCount = resourceTypes[targetStuctureName];

			if (harvestersStatistics[resourceTypeName][targetStuctureName] < harvestersCount) {

				var id = creepsStore.getNextCreepId();

				harvester.spawn(id, resourceTypeName, targetStuctureName);
			}
		}
	}
}

function cleanTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;