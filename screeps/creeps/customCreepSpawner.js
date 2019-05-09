
var findTools = require("../tools/findTools");
var { creepsSpawnRules } = require("../creepsRules");
var bodyPartsFactory = require("./bodies/bodyPartsFactory");

var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarverster");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var Repairer = require("./energyWorkers/repairer");
var SpawnEnergizer = require("./energizers/spawnEnergizer");
var WallRepairer = require("./energyWorkers/wallRepairer");

var customCreepSpawner = {};

customCreepSpawner.spawnCreep = function(creepsStatistics) {

	if (!global.spawn.spawning && global.room.energyAvailable >= 250) {

		debug.primary("spawn chance", global.room.energyAvailable);
		// debug.temp("creep stats:", creepsStatistics, creepsSpawnRules)

		var spawnResult = {
			waitForSpawn: false,
			spawned: false
		};

		// NOTE: Order here is prioritized by creep type
		spawnResult = trySpawn(spawnResult, Repairer, creepsStatistics.repairers, creepsSpawnRules.repairers);
		spawnResult = trySpawn(spawnResult, SpawnEnergizer, creepsStatistics.spawnEnergizers, creepsSpawnRules.spawnEnergizers);
		// spawnResult = trySpawn(spawnResult, Defender, creepsStatistics.defenders, creepsSpawnRules.defenders);
		spawnResult = trySpawn(spawnResult, ContainerHarvester, creepsStatistics.containerHarvesters, creepsSpawnRules.containerHarvesters);
		spawnResult = trySpawn(spawnResult, ExtensionEnergizer, creepsStatistics.extensionEnergizers, creepsSpawnRules.extensionEnergizers);
		spawnResult = trySpawn(spawnResult, Builder, creepsStatistics.builders, creepsSpawnRules.builders);
		spawnResult = trySpawn(spawnResult, ControllerEnergizer, creepsStatistics.controllerEnergizers, creepsSpawnRules.controllerEnergizers);
		spawnResult = trySpawn(spawnResult, WallRepairer, creepsStatistics.wallRepairers, creepsSpawnRules.wallRepairers);
	}
}

function trySpawn(previousSpawnResult, customCreep, creepsCurrentCount, creepsSpawnRulesCount) {

	if (!previousSpawnResult.waitForSpawn && !previousSpawnResult.spawned) {

		if (creepsCurrentCount < creepsSpawnRulesCount) {

			var creepMemory = customCreep.initializeSpawnCreepMemory(creepsCurrentCount);
			var spawnResult = spawn(creepMemory);

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

function spawn(creepMemory) {

	var spawnResult = {
		waitForSpawn: false,
		spawned: false
	};

	if (creepMemory) {

		var id = getNextCreepId();
		var bodyParts = bodyPartsFactory.getBodyParts(creepMemory.bodyPartsType);
	
		var result = global.spawn.spawnCreep(bodyParts, id, {
			memory: creepMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});
	
		if (result === OK) {
	
			spawnResult.spawned = true;
			debug.highlight(`${creepMemory.type} spawning: ${id} memory: `, creepMemory);
	
		} else if (ERR_NOT_ENOUGH_ENERGY && creepMemory.waitForSpawn) {
	
			spawnResult.waitForSpawn = true;
	
		} else {
	
			debug.warning(`${creepMemory.type} did not spawn: ${result}`);
		}

	}
	
	return spawnResult;
}

function getNextCreepId() {

	if (!Memory.state.nextCreepId) {

		Memory.state.nextCreepId = 1;
	}

	var nextCreepId = parseInt(Memory.state.nextCreepId);
	nextCreepId++

	Memory.state.nextCreepId = nextCreepId;

	return nextCreepId;
}


module.exports = customCreepSpawner;