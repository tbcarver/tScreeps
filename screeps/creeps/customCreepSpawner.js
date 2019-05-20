
var findTools = require("../tools/findTools");
var spawnTools = require("../tools/spawnTools");
var { creepConstructors } = require("./creepTypes");
var { creepsSpawnRules } = require("../creepsRules");
var bodyPartsFactory = require("./bodies/bodyPartsFactory");

var customCreepSpawner = {};

// NOTE: Order here is prioritized by creep type
var creepTypesSpawnOrder = [
	"repairer",
	"spawnEnergizer",
	// "defender",
	"dropContainerHarvester",
	"remoteHarvester",
	"containerHarvester",
	"extensionEnergizer",
	"builder",
	"controllerEnergizer",
	"wallRepairer"
];

customCreepSpawner.spawnCreep = function(creepsStatistics) {

	if (!spawn.spawning && room.energyAvailable >= 300) {

		debug.primary("spawn chance", room.energyAvailable);
		// debug.temp("creep stats:", creepsStatistics, creepsSpawnRules)

		var spawnResult = {
			waitForSpawn: false,
			spawned: false
		};

		for (creepType of creepTypesSpawnOrder) {
			spawnResult = trySpawnCreep(spawnResult, creepConstructors[creepType], creepsStatistics[creepType],
				creepsSpawnRules[creepType]);
		}
	}
}

function trySpawnCreep(previousSpawnResult, customCreep, creepsCurrentCount, creepsSpawnRulesCount) {

	if (!previousSpawnResult.waitForSpawn && !previousSpawnResult.spawned) {

		if (creepsCurrentCount < creepsSpawnRulesCount) {

			var creepMemory = customCreep.initializeSpawnCreepMemory(creepsCurrentCount);
			var spawnResult = spawnCreep(creepMemory);

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

function spawnCreep(creepMemory) {

	var spawnResult = {
		waitForSpawn: false,
		spawned: false
	};

	if (creepMemory) {

		var id = getNextCreepId();
		var bodyParts = bodyPartsFactory.getBodyParts(creepMemory.bodyPartsType);

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: creepMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			spawnResult.spawned = true;
			debug.highlight(`${creepMemory.type} spawning: ${id} cost: ${spawnTools.calculateBodyCost(bodyParts)}
				memory:`, creepMemory);

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