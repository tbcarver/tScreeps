
var debug = require("../debug");
var spawnTools = require("../tools/spawnTools");
var findTools = require("../tools/findTools");

var defender = {};

defender.spawn = function(id) {

	var waitForSpawn = false;
	var bodyParts = [RANGED_ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH];
	var defenderMemory = {
		type: "defender"
	}

	var spawnCapacity = spawnTools.calculateSpawnCapacity();

	if (spawnCapacity >= 400) {
		bodyParts.push(...[MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH]);
	}

	if (spawnCapacity >= 600) {
		bodyParts.push(...[RANGED_ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH]);
	}

	const targets = global.room.find(FIND_HOSTILE_CREEPS);

	if (targets.length > 0) {

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: defenderMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			debug.highlight(`defender spawning: ${id} memory: `, defenderMemory);

		} else if (ERR_NOT_ENOUGH_ENERGY) {

			waitForSpawn = true;

		} else {

			debug.warning(`defender did not spawn: ${result}`);
		}
	}

	return waitForSpawn;
}

defender.act = function(creep) {

	target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

	if (target) {

		if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
			creep.moveTo(target);
		}
	} else {

		debug.warning("defender hostile creep not found");
	}
}


module.exports = defender