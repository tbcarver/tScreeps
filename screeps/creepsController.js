
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
		repairers: 0,
		spawnEnergizers: 0,
		wallRepairers: 0
	};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		// debug.temp(`creep act: type: ${creep.memory.type} ticks: ${creep.ticksToLive}`);

		// NOTE: A poor man's type of polymorphism is used here because of CPU cycle performance consideration.
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

			case "repairer":

				// debug.temp("creep:", creep)
				// debug.temp("creep memory:", creep.memory)
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

	debug.muted(`creeps:`, Object.keys(Game.creeps).length, creepsStatistics);

	if (!global.spawn.spawning && global.room.energyAvailable >= 250) {

		debug.primary("spawn chance", global.room.energyAvailable);
		// debug.temp("creep stats:", creepsStatistics, creepsSpawnRules)

		var spawnResult = {
			waitForSpawn: false,
			spawned: false
		};

		// NOTE: Order here is prioritized by creep type
		spawnResult = spawn(spawnResult, repairer, creepsStatistics.repairers, creepsSpawnRules.repairers);
		spawnResult = spawn(spawnResult, defender, creepsStatistics.defenders, creepsSpawnRules.defenders);
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

function cleanUpTheDead() {

	for (var name in Memory.creeps) {

		if (Game.creeps[name] === undefined) {

			delete Memory.creeps[name];
		}
	}
}


module.exports = creepsController;