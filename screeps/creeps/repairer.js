
var debug = require("../debug");
var spawnTools = require("../tools/spawnTools");
var findTools = require("../tools/findTools");

var repairer = {};

repairer.spawn = function(id, spawnResult) {

	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var repairerMemory = {
		type: "repairer"
	}

	var spawnCapacity = spawnTools.calculateSpawnCapacity();

	if (spawnCapacity >= 400) {
		bodyParts = [WORK, WORK, CARRY, MOVE, MOVE];
	}

	if (spawnCapacity >= 600) {
		bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
	}

	const targets = global.room.find(FIND_STRUCTURES, {
		filter: structure => structure.hits < structure.hitsMax &&
			structure.structureType !== STRUCTURE_WALL
	});

	if (targets.length >= 6) {

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: repairerMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			spawnResult.spawned = true;
			debug.highlight(`repairer spawning: ${id} memory: `, repairerMemory);

		} else if (ERR_NOT_ENOUGH_ENERGY) {

			spawnResult.waitForSpawn = true;

		} else {

			debug.warning(`repairer did not spawn: ${result}`);
		}
	}

	return spawnResult;
}

repairer.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var resource = findTools.findClosestEnergy(creep.pos);

		if (resource) {

			if (resource.structureType) {

				if (creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(resource);
				}

			} else {

				if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {
					creep.moveTo(resource);
				}
			}
		} else {

			debug.warning("repairer resource not found");
		}
	}

	if (creep.memory.state === "repairing" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

		if (creep.memory.state !== "repairing") {

			creep.memory.state = "repairing";
		}

		const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => structure.hits < structure.hitsMax &&
				structure.structureType !== STRUCTURE_WALL
		});

		if (target) {

			if (creep.repair(target) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}

		} else {

			debug.warning("repairer cannot find any damaged structures");

			if (creep.carry[RESOURCE_ENERGY] / creep.carryCapacity < .30) {

				creep.memory.state = "harvesting";
			}
		}
	}
}


module.exports = repairer