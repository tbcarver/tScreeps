
var { maxWaitingDefenders } = require("../../creepsRules");
var spawnTools = require("../../tools/spawnTools");
var findTools = require("../../tools/findTools");

var defender = {};

defender.spawn = function(id, creepsCurrentCount, spawnResult) {

	const targets = global.room.find(FIND_HOSTILE_CREEPS);

	if (targets.length > 0 || creepsCurrentCount < maxWaitingDefenders) {

		var bodyParts = [RANGED_ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH];
		var defenderMemory = {
			type: "defender"
		}

		var spawnCapacity = spawnTools.calculateSpawnCapacity();

		if (spawnCapacity >= 400) {
			bodyParts.push(...[TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH]);
		}

		if (spawnCapacity >= 600) {
			bodyParts.push(...[RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,]);
		}

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: defenderMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			spawnResult.spawned = true;
			debug.highlight(`defender spawning: ${id} memory: `, defenderMemory);

		} else if (ERR_NOT_ENOUGH_ENERGY) {

			spawnResult.waitForSpawn = true;
			debug.highlight(`defender did not spawn waiting for energy`,
				spawnTools.calculateBodyCost(bodyParts));

		} else {

			debug.warning(`defender did not spawn: ${result}`);
		}
	}

	return spawnResult;
}

defender.act = function(creep) {

	target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

	if (target) {

		if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
			creep.moveTo(target);
		}
	} else {

		creep.moveTo(Game.flags["barracks"].pos);
	}
}


module.exports = defender