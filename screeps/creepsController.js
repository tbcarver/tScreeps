
var debug = require("./debug");
var creepsStore = require("./creepsStore");
var builder = require("./creeps/builder");
var energizer = require("./creeps/energizer");
var harvester = require("./creeps/harvester");
var repairer = require("./creeps/repairer");
var { creepsSpawnRules } = require("./creepsRules");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {
		builders: 0,
		energizers: {
			[STRUCTURE_SPAWN]: 0,
			[STRUCTURE_CONTROLLER]: 0
		},
		harvesters: {
			[RESOURCE_ENERGY]: {
				[STRUCTURE_EXTENSION]: 0,
				[STRUCTURE_CONTAINER]: 0,
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

			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);

			switch (creep.memory.type) {

				case "builder":

					builder.act(creep);
					creepsStatistics.builders++;
					break;

				case "energizer":

					energizer.act(creep);
					creepsStatistics.energizers[creep.memory.structureType]++;
					break;

				case "harvester":

					harvester.act(creep);
					creepsStatistics.harvesters[creep.memory.resourceType][creep.memory.structureType]++;
					break;

				case "repairer":

					// debug.temp("repairer:", creep)
					// debug.temp("repairer memory:", creep.memory)
					repairer.act(creep);
					creepsStatistics.repairers++;
					break;
			}
		}
	}

	debug.muted(`creep tick:`, creepsStatistics);

	if (!global.spawn.spawning && global.room.energyAvailable >= 250) {

		debug.primary("spawn chance", global.room.energyAvailable);
		// debug.temp("creep stats:", creepsStatistics, creepsSpawnRules)

		// NOTE: Order here is prioritized by creep type
		// spawnHarvesters(creepsStatistics.harvesters, creepsSpawnRules.harvesters);
		spawnEnergizers(creepsStatistics.energizers, creepsSpawnRules.energizers);
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

function spawnEnergizers(energizersStatistics, energizersSpawnRules) {

	for (var structureType in energizersSpawnRules) {

		var energizersCount = energizersSpawnRules[structureType];

		if (energizersStatistics[structureType] < energizersCount) {

			var id = creepsStore.getNextCreepId();

			var spawned = energizer.spawn(id, structureType);

			if (spawned) {
				break;
			}
		}
	}
}

function spawnHarvesters(harvestersStatistics, harvestersSpawnRules) {

	for (var resourceType in harvestersSpawnRules) {

		var structureTypes = harvestersSpawnRules[resourceType];

		for (var structureType in structureTypes) {

			var harvestersCount = harvestersSpawnRules[resourceType][structureType];

			if (harvestersStatistics[resourceType][structureType] < harvestersCount) {

				var id = creepsStore.getNextCreepId();

				var spawned = harvester.spawn(id, resourceType, structureType);

				if (spawned) {
					break;
				}
			}
		}

		if (spawned) {
			break;
		}
	}
}

function spawnRepairers(repairersCount, repairersSpawnRulesCount) {

	if (repairersCount < repairersSpawnRulesCount) {

		var id = creepsStore.getNextCreepId();

		repairer.spawn(id);
	}
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;