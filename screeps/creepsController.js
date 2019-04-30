
var debug = require("./debug");
var creepBase = require("./creeps/creepBase");
var builder = require("./creeps/builder");
var containerEnergizer = require("./creeps/energizers/containerEnergizer");
var controllerEnergizer = require("./creeps/energizers/controllerEnergizer");
var defender = require("./creeps/defender");
var extensionEnergizer = require("./creeps/energizers/extensionEnergizer");
var harvester = require("./creeps/harvester");
var repairer = require("./creeps/repairer");
var spawnEnergizer = require("./creeps/energizers/spawnEnergizer");
var wallRepairer = require("./creeps/wallRepairer");
var { creepsSpawnRules } = require("./creepsRules");

var creepsController = {};

creepsController.tick = function() {

	cleanUpTheDead();

	var creepsStatistics = {
		builders: 0,
		containerEnergizers: 0,
		controllerEnergizers: 0,
		defenders: 0,
		extensionEnergizers: 0,
		harvesters: {
			[RESOURCE_ENERGY]: {
				[STRUCTURE_EXTENSION]: 0,
				[STRUCTURE_CONTAINER]: 0,
			}
		},
		repairers: 0,
		spawnEnergizers: 0,
		wallRepairers: 0
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);

		switch (creep.memory.type) {

			case "builder":

				creepBase.act(builder, creep);
				creepsStatistics.builders++;
				break;

			case "containerEnergizer":

				creepBase.act(containerEnergizer, creep);
				creepsStatistics.containerEnergizers++;
				break;

			case "controllerEnergizer":

				creepBase.act(controllerEnergizer, creep);
				creepsStatistics.controllerEnergizers++;
				break;

			case "defender":

				creepBase.act(defender, creep);
				creepsStatistics.defenders++;
				break;

			case "extensionEnergizer":

				creepBase.act(extensionEnergizer, creep);
				creepsStatistics.extensionEnergizers++;
				break;

			case "harvester":

				// debug.temp("creep:", creep)
				// debug.temp("creep memory:", creep.memory)
				creepBase.act(harvester, creep);
				creepsStatistics.harvesters[creep.memory.resourceType][creep.memory.structureType]++;
				break;

			case "repairer":

				creepBase.act(repairer, creep);
				creepsStatistics.repairers++;
				break;

			case "spawnEnergizer":

				creepBase.act(spawnEnergizer, creep);
				creepsStatistics.spawnEnergizers++;
				break;

			case "wallRepairer":

				creepBase.act(wallRepairer, creep);
				creepsStatistics.wallRepairers++;
				break;
		}
	}

	debug.muted(`creep tick:`, Object.keys(Game.creeps).length, creepsStatistics);

	if (!global.spawn.spawning && global.room.energyAvailable >= 250) {

		debug.primary("spawn chance", global.room.energyAvailable);
		// debug.temp("creep stats:", creepsStatistics, creepsSpawnRules)

		// NOTE: Order here is prioritized by creep type
		var spawnResult = {
			waitForSpawn: false,
			spawned: false
		};

		spawnResult = spawn(spawnResult, repairer, creepsStatistics.repairers, creepsSpawnRules.repairers);
		spawnResult = spawn(spawnResult, defender, creepsStatistics.defenders, creepsSpawnRules.defenders);
		spawnResult = spawnTemp(spawnResult, spawnHarvesters, creepsStatistics.harvesters, creepsSpawnRules.harvesters);
		spawnResult = spawn(spawnResult, spawnEnergizer, creepsStatistics.spawnEnergizers, creepsSpawnRules.spawnEnergizers);
		spawnResult = spawn(spawnResult, extensionEnergizer, creepsStatistics.extensionEnergizers, creepsSpawnRules.extensionEnergizers);
		spawnResult = spawn(spawnResult, containerEnergizer, creepsStatistics.containerEnergizers, creepsSpawnRules.containerEnergizers);
		spawnResult = spawn(spawnResult, controllerEnergizer, creepsStatistics.controllerEnergizers, creepsSpawnRules.containerEnergizers);
		spawnResult = spawn(spawnResult, builder, creepsStatistics.builders, creepsSpawnRules.builders);
		spawnResult = spawn(spawnResult, wallRepairer, creepsStatistics.wallRepairers, creepsSpawnRules.wallRepairers);
	}
}

function spawn(previousSpawnResult, inheritedCreep, creepsCurrentCount, creepsSpawnRulesCount) {

	if (!previousSpawnResult.waitForSpawn && !previousSpawnResult.spawned) {

		if (creepsCurrentCount < creepsSpawnRulesCount) {

			var spawnResult = creepBase.spawn(inheritedCreep);

			if (spawnResult && spawnResult.waitForSpawn) {
				previousSpawnResult.waitForSpawn = spawnResult.waitForSpawn;
			}

			if (spawnResult && spawnResult.spawned) {
				previousSpawnResult.spawned = spawnResult.spawned;
			}
		}
	}

	return previousSpawnResult;
}

function spawnTemp(previousSpawnResult, spawner, creepsStatistics, creepsSpawnRules) {

	if (!previousSpawnResult.spawned && !previousSpawnResult.waitForSpawn) {

		var spawnResult = spawner(creepsStatistics, creepsSpawnRules);

		if (spawnResult && spawnResult.waitForSpawn) {
			previousSpawnResult.spawned = spawnResult.waitForSpawn;
		}

		if (spawnResult && spawnResult.spawned) {
			previousSpawnResult.spawned = spawnResult.spawned;
		}
	}

	return previousSpawnResult;
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
}

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;