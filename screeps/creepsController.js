
var debug = require("./debug");
var creepBase = require("./creeps/creepBase");
var builder = require("./creeps/builder");
var defender = require("./creeps/defender");
var energizer = require("./creeps/energizer");
var harvester = require("./creeps/harvester");
var repairer = require("./creeps/repairer");
var wallRepairer = require("./creeps/wallRepairer");
var { creepsSpawnRules } = require("./creepsRules");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {
		builders: 0,
		defenders: 0,
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
		repairers: 0,
		wallsRepairer: 0
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (creep.ticksToLive === 0) {

			delete Memory.creeps[creep.name];

			debug.highlight(`creep died: ${creep.id} type: ${creep.memory.type}`);

		} else {

			// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);

			switch (creep.memory.type) {

				case "builder":

					builder.act(creep);
					creepsStatistics.builders++;
					break;

				case "defender":

					defender.act(creep);
					creepsStatistics.defenders++;
					break;

				case "energizer":

					energizer.act(creep);
					creepsStatistics.energizers[creep.memory.structureType]++;
					break;

				case "harvester":

					// debug.temp("creep:", creep)
					// debug.temp("creep memory:", creep.memory)
					harvester.act(creep);
					creepsStatistics.harvesters[creep.memory.resourceType][creep.memory.structureType]++;
					break;

				case "repairer":

					repairer.act(creep);
					creepsStatistics.repairers++;
					break;

				case "wallRepairer":

					wallRepairer.act(creep);
					creepsStatistics.wallsRepairer++;
					break;
			}
		}
	}

	debug.muted(`creep tick:`, creepsStatistics);

	if (!global.spawn.spawning && global.room.energyAvailable >= 250) {

		debug.primary("spawn chance", global.room.energyAvailable);
		// debug.temp("creep stats:", creepsStatistics, creepsSpawnRules)

		// NOTE: Order here is prioritized by creep type
		var waitForSpawn = false;

		waitForSpawn = spawn(waitForSpawn, spawnDefenders, creepsStatistics.defenders, creepsSpawnRules.defenders);
		waitForSpawn = spawn(waitForSpawn, spawnRepairers, creepsStatistics.repairers, creepsSpawnRules.repairers);
		waitForSpawn = spawn(waitForSpawn, spawnBuilders, creepsStatistics.builders, creepsSpawnRules.builders);
		waitForSpawn = spawn(waitForSpawn, spawnHarvesters, creepsStatistics.harvesters, creepsSpawnRules.harvesters);
		waitForSpawn = spawn(waitForSpawn, spawnEnergizers, creepsStatistics.energizers, creepsSpawnRules.energizers);
		waitForSpawn = spawn(waitForSpawn, spawnWallRepairers, creepsStatistics.wallsRepairer, creepsSpawnRules.wallsRepairer);
	}
}

function spawn(waitForSpawn, spawner, creepsStatistics, creepsSpawnRules) {

	var resultWaitForSpawn = false;

	if (!waitForSpawn && spawner) {

		resultWaitForSpawn = spawner(creepsStatistics, creepsSpawnRules);
	}

	return resultWaitForSpawn;
}

function spawnBuilders(buildersCount, buildersSpawnRulesCount) {

	if (buildersCount < buildersSpawnRulesCount) {

		creepBase.spawn(builder);
	}

	return false;
}

function spawnDefenders(defendersCount, defendersSpawnRulesCount) {

	var waitForSpawn = false;

	if (defendersCount < defendersSpawnRulesCount) {

		waitForSpawn = creepBase.spawn(defender);
	}

	return waitForSpawn;
}

function spawnEnergizers(energizersStatistics, energizersSpawnRules) {

	for (var structureType in energizersSpawnRules) {

		var energizersCount = energizersSpawnRules[structureType];

		if (energizersStatistics[structureType] < energizersCount) {

			var spawned = creepBase.spawn(energizer, structureType);

			if (spawned) {
				break;
			}
		}
	}

	return false;
}

function spawnHarvesters(harvestersStatistics, harvestersSpawnRules) {

	for (var resourceType in harvestersSpawnRules) {

		var structureTypes = harvestersSpawnRules[resourceType];

		for (var structureType in structureTypes) {

			var harvestersCount = harvestersSpawnRules[resourceType][structureType];

			if (harvestersStatistics[resourceType][structureType] < harvestersCount) {

				var spawned = creepBase.spawn(harvester, resourceType, structureType);

				if (spawned) {
					break;
				}
			}
		}

		if (spawned) {
			break;
		}
	}

	return false;
}

function spawnRepairers(repairersCount, repairersSpawnRulesCount) {

	var waitForSpawn = false;

	if (repairersCount < repairersSpawnRulesCount) {

		waitForSpawn = creepBase.spawn(repairer);
	}

	return waitForSpawn;
}

function spawnWallRepairers(wallRepairersCount, wallRepairersSpawnRulesCount) {

	if (wallRepairersCount < wallRepairersSpawnRulesCount) {

		creepBase.spawn(wallRepairer);
	}

	return false;
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;