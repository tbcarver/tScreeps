
var debug = require("./debug");
var creepsStore = require("./creepsStore");
var builder = require("./creeps/builder");
var harvester = require("./creeps/harvester");
var repairer = require("./creeps/repairer");
var { creepsSpawnRules } = require("./creepsRules");

var creepsController = {};

creepsController.tick = function() {

	cleanTheDead();

	var creepsStatistics = {
		builders: 0,
		harvesters: {
			energy: {
				spawn: 0,
				controller: 0
			}
		},
		repairers: 0
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (creep.ticksToLive === 0) {

			creepsStore.remove(creep);

			debug.highlight(`creep died: ${creep.id} type: ${creep.memory.type}`);

		} else {

			debug.primary(`creep act: ${creep.id} type: ${creep.memory.type}`);

			switch (creep.memory.type) {

				case "builder":
					builder.act(creep);
					creepsStatistics.builders++;
					break;

				case "harvester":
					harvester.act(creep);
					creepsStatistics.harvesters[creep.memory.resourceType][creep.memory.targetStructure]++;
					break;

				case "repairer":
					repairer.act(creep);
					creepsStatistics.repairers++;
					break;
			}
		}
	}

	if (!global.spawn.spawning && global.spawn.energy >= global.spawn.energyCapacity) {

		debug.highlight("spawn chance");

		// NOTE: Order here is prioritized by creep type
		spawnHarvesters(creepsStatistics.harvesters, creepsSpawnRules.harvesters);
		spawnBuilders(creepsStatistics.builders, creepsSpawnRules.builders);
		spawnRepairers(creepsStatistics.repairers, creepsSpawnRules.repairers);
	}
}

function spawnBuilders(buildersCount, buildersSpawnRulesCount) {

	if (buildersCount < buildersSpawnRulesCount) {

		var id = creepsStore.getNextCreepId();

		builder.spawn(id);
	}
}

function spawnHarvesters(harvestersStatistics, harvestersSpawnRules) {

	for (var resourceTypeName in harvestersSpawnRules) {

		var resourceTypes = harvestersSpawnRules[resourceTypeName];

		for (var targetStructureName in resourceTypes) {

			var harvestersCount = resourceTypes[targetStructureName];

			if (harvestersStatistics[resourceTypeName][targetStructureName] < harvestersCount) {

				var id = creepsStore.getNextCreepId();

				harvester.spawn(id, resourceTypeName, targetStructureName);
			}
		}
	}
}

function spawnRepairers(repairersCount, repairersSpawnRulesCount) {

	if (repairersCount < repairersSpawnRulesCount) {

		var id = creepsStore.getNextCreepId();

		repairer.spawn(id);
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